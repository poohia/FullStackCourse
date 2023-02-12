// https://www.electronjs.org/docs/latest/
const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  shell,
  nativeTheme,
  Notification,
} = require("electron");
const path = require("path");
const fs = require("fs");
const { execFile } = require("node:child_process");
const pngquant = require("pngquant-bin");

// app.getPath("temp") Allow to have path to temp folder of device
const targetFolder = path.normalize(`${app.getPath("temp")}/compressed-files`);

// Create folder if not exist
function accessOrCreateFolder(folderPath, mode = fs.constants.W_OK) {
  return new Promise((resolve, reject) => {
    const normalizePath = path.normalize(folderPath);
    fs.access(normalizePath, mode, (err) => {
      // err is null if normalizePath dosn't exist
      if (err) {
        // then create it
        fs.mkdir(normalizePath, (err) => {
          if (err) {
            reject();
            return;
          }
          resolve();
        });
        return;
      }
      resolve();
    });
  });
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // listen event ping from front and reply pong
  ipcMain.on("ping", (event) => {
    console.log("ping\n\n");
    event.reply("pong");
  });

  ipcMain.on("openFile", () => {
    let progress = 0;
    mainWindow.setProgressBar(progress);
    // dialog.showOpenDialog Open a dialog to select a file
    // In this example only files with extension ".png"
    dialog
      .showOpenDialog(mainWindow, {
        filters: [{ name: "Images", extensions: [".png"] }],
        properties: ["openFile", "multiSelections"],
      })
      .then((result) => {
        accessOrCreateFolder(targetFolder).then(() => {
          // Transform all file path to Promise and then is all promise are resolved continue script
          // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
          Promise.all(
            // Map transform array to other one
            // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map
            result.filePaths.map(
              (filePath, i) =>
                new Promise((resolve) => {
                  const fileName = path.basename(filePath);
                  // compress image
                  execFile(
                    // pngquant is software to compress image
                    pngquant,
                    [
                      "--quality=90-100",
                      "-o",
                      `${targetFolder}/${fileName}`,
                      filePath,
                    ],
                    () => {
                      // add progress and resolve promess i * 1000 timeout
                      setTimeout(() => {
                        progress += 100 / result.filePaths.length / 100;
                        mainWindow.setProgressBar(progress);
                        resolve();
                      }, i * 1000);
                    },
                    () => {
                      // in error case just resolve promess
                      resolve();
                    }
                  );
                })
            )
            // Then all promesse are resolved
          ).then(() => {
            // Show notification
            new Notification({
              title: "Compresseur PNG",
              body: "Compression finit",
            }).show();
            // Open temp folder
            shell.openPath(targetFolder);
            // Reset progress bar
            mainWindow.setProgressBar(-1);
          });
        });
      });
  });

  mainWindow.loadFile("index.html");
  // active darkmode
  nativeTheme.themeSource = "dark";
  // active maximize size window
  mainWindow.maximize();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  // darwin is Mac OS
  if (process.platform !== "darwin") app.quit();
});

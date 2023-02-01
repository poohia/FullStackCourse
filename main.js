// https://www.electronjs.org/docs/latest/
const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
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
      if (err) {
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
    console.log("ping\n\n\n");
    event.reply("pong");
  });

  ipcMain.on("openFile", () => {
    // dialog.showOpenDialog Open a dialog to select a file
    // In this example only files with extension ".png"
    dialog
      .showOpenDialog(mainWindow, {
        filters: [{ name: "Images", extensions: [".png"] }],
        properties: ["openFile", "multiSelections"],
      })
      .then((result) => {
        accessOrCreateFolder(targetFolder).then(() => {
          result.filePaths.forEach((filePath) => {
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
              () => {}
            );
          });
          // open folder from path
          shell.openPath(targetFolder);
        });
      });
  });

  mainWindow.loadFile("index.html");
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

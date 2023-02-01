window.addEventListener("DOMContentLoaded", () => {
  // electronAPI give access to functions from preload.js
  const { electronAPI } = window;
  electronAPI.ping();
  electronAPI.onPong(() => {
    console.log("pong");
  });
  document.getElementById("btn-open-image").addEventListener("click", () => {
    electronAPI.openFile();
  });
});

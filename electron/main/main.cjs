const { app, BrowserWindow } = require("electron");

const createWindow = require("./window.cjs");

// Register IPC handlers
require("../ipc/index.cjs");

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
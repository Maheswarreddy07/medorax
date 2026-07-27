const { ipcMain } = require("electron");

ipcMain.handle("app:get-version", () => {
  return {
    version: "1.0.0",
  };
});

ipcMain.handle("app:get-name", () => {
  return "MEDORAX ERP";
});
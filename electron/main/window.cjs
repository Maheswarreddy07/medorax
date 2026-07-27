const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
  width: 1600,
  height: 900,

  icon: path.join(__dirname, "../assets/icon.ico"),

  autoHideMenuBar: true,

  webPreferences: {
    preload: path.join(__dirname, "preload.cjs"),
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: false,
  },
});

  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../../dist/index.html"));
  }

  win.once("ready-to-show", () => {
    win.show();
  });

  return win;
}

module.exports = createWindow;
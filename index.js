const { BrowserWindow, app, ipcMain } = require("electron");
const electronWindowState = require("electron-window-state");
const path = require("path");
const readitem = require("./readitem");
const menu = require("./menu");
let mainwindow = null;
let partwindow = null;

// Listeners IPC
ipcMain.on("new-item", (e, url) => {
  console.log("recieved-main", url);

  readitem(url, (item) => {
    console.log(url);
    e.sender.send("new-item-succes", item);
  });
});
ipcMain.on("create-new-window", (e, item) => {
  createWindow2(item);
});
ipcMain.on("send-delete-id", (e, id) => {
  mainwindow.webContents.send("delete-id", id);
});

const createWindow = () => {
  let mainwindowstate = electronWindowState({
    defaultHeight: 1000,
    defaultWidth: 800,
  });

  mainwindow = new BrowserWindow({
    height: mainwindowstate.height,
    width: mainwindowstate.width,
    x: mainwindowstate.x,
    y: mainwindowstate.y,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "renderer/preload.js"),
      //   offscreen: true,
    },
  });
  mainwindowstate.manage(mainwindow);
  mainwindow.loadFile("./renderer/index.html");

  mainwindow.webContents.toggleDevTools();
  menu(mainwindow.webContents);
};

const createWindow2 = ({ url, id }) => {
  partwindow = new BrowserWindow({
    parent: mainwindow,
    webPreferences: {
      preload: path.join(__dirname, "renderer/preload.js"),
    },
  });
  partwindow.loadURL(url);
  partwindow.webContents.openDevTools();
  const webcontent = partwindow.webContents;
  webcontent.executeJavaScript(`
  const button = document.createElement("button");
  button.innerText = "Close";
  button.style.backgroundColor = "red";
  button.style.border = "none";
  button.style.borderRadius = "10px";
  button.style.padding = "10px 20px";
  button.style.color = "white";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.zIndex = "999999";
  button.onclick = e=>{
    console.log(window.compipe.closewindow(${id}))
    window.close()
  }
  document.body.append(button);
  
  `);
};

app.whenReady().then(createWindow);

const { contextBridge, ipcRenderer, shell } = require("electron");

contextBridge.exposeInMainWorld("compipe", {
  sendURL: (value) => {
    ipcRenderer.send("new-item", value);
  },
  receiveItem: (callback) => {
    ipcRenderer.on("new-item-succes", callback);
  },
  createNewWindow: (item) => {
    ipcRenderer.send("create-new-window", item);
  },
  closewindow: (id) => {
    ipcRenderer.send("send-delete-id", id);
  },
  deleteId: (callback) => {
    ipcRenderer.on("delete-id", callback);
  },
  addNew: (callback) => {
    ipcRenderer.on("menu-show-add", callback);
  },
  readNew: (callback) => {
    ipcRenderer.on("menu-show-read", callback);
  },
  deleteItem: (callback) => {
    ipcRenderer.on("menu-show-delete", callback);
  },
  openInBrowser: (url) => {
    ipcRenderer.on("menu-show-browser", () => {
      shell.openExternal(url);
    });
  },
});

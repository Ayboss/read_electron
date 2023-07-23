const { BrowserWindow } = require("electron");

module.exports = (URL, callback) => {
  const offScreenWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      offscreen: true,
    },
  });

  offScreenWindow.loadURL(URL);

  offScreenWindow.webContents.on("did-finish-load", () => {
    let title = offScreenWindow.getTitle();
    offScreenWindow.webContents.capturePage().then((image) => {
      let screenshot = image.toDataURL();

      callback({
        title,
        screenshot,
        URL,
      });

      offScreenWindow.close();
      offScreenWindow = null;
    });
  });
};

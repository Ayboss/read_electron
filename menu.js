const { Menu, shell } = require("electron");

module.exports = (webapp) => {
  const template = [
    {
      label: "Items",
      submenu: [
        {
          label: "Add new",
          accelerator: "CmdOrCtrl+O",
          click: () => {
            webapp.send("menu-show-add");
          },
        },
        {
          label: "Read Item",
          accelerator: "CmdOrCtrl+Enter",
          click: () => {
            webapp.send("menu-show-read");
          },
        },
        {
          label: "Delete Item",
          accelerator: "CmdOrCtrl+Backspace",
          click: () => {
            webapp.send("menu-show-delete");
          },
        },
        {
          label: "Open in Browser",
          accelerator: "CmdOrCtrl+Shift+Enter",
          click: () => {
            webapp.send("menu-show-browser");
          },
        },
      ],
    },
    {
      role: "windowMenu",
    },
    {
      role: "editMenu",
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn more",
          click: () => {
            shell.openExternal("http://google.com");
          },
        },
      ],
    },
  ];

  if (process.platform == "darwin") {
    template.unshift({ role: "appMenu" });
  }
  const menutemplate = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menutemplate);
};

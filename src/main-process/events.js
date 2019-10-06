const { BrowserWindow, ipcMain, dialog, globalShortcut } = require('electron');
const settings = require('electron-settings');
const url = require('url');
const read = require('read-yaml');
const constants = require('../common/constants');

ipcMain.on(constants.EVENT_INSTRUCTOR_OPEN_FILE, event => {
  const filePath = dialog.showOpenDialogSync({
    title: 'Select Instructor File',
    defaultLabel: 'Open',
    filters: [
      { name: 'yaml', extensions: ['yaml'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (filePath && filePath.length === 1) {
    read(filePath[0], (err, data) => {
      if (err) {
        // TODO: error logging
        event.returnValue = {};
      } else {
        event.returnValue = data;
      }
    });
  } else {
    event.returnValue = {};
  }
});

ipcMain.on(constants.EVENT_INSTRUCTOR_OPEN_VIEW, (event, initData) => {
  if (!global.instructorWindow) {
    const bounds = settings.get('instructorBounds');

    let instructorWindow = new BrowserWindow({
      show: false,
      width: 350,
      minWidth: 280,
      height: 200,
      frame: false,
      alwaysOnTop: true,
      transparent: true,
      webPreferences: {
        nodeIntegration: true
      }
    });

    if (bounds) {
      instructorWindow.setBounds(bounds);
    }

    instructorWindow.loadURL(
      process.env.ELECTRON_START_URL ||
        url.format({
          pathname: path.join(__dirname, '/../public/index.html'),
          protocol: 'file:',
          slashes: true
        })
    );

    instructorWindow.once('ready-to-show', () => {
      instructorWindow.show();
      instructorWindow.webContents.send(
        constants.EVENT_INSTRUCTOR_UPDATE_VIEW,
        initData
      );
    });

    instructorWindow.on('close', () => {
      settings.set('instructorBounds', instructorWindow.getBounds());
    });

    instructorWindow.on('closed', () => {
      instructorWindow = null;
    });

    globalShortcut.register('Alt+8', () => {
      instructorWindow.webContents.openDevTools({ mode: 'detach' });
    });

    global.instructorWindow = instructorWindow;
  }
});

ipcMain.on(constants.EVENT_INSTRUCTOR_CLOSE_VIEW, () => {
  global.instructorWindow.close();
  global.instructorWindow = null;
});

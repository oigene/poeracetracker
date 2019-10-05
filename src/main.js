const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const url = require('url');
const settings = require('electron-settings');
const FileParser = require('./main-process/fileparser');
const constants = require('./common/constants');
const initGlobalShortcuts = require('./main-process/shortcuts');
const Database = require('./persistence/Database');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 280,
    minWidth: 280,
    height: 217,
    frame: true,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true
      })
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function initApp() {
  let clientLogPath = settings.get('clientlogpath');
  // expose db to global to use it in renderer process
  global.db = new Database(constants.COLLECTION_RACEEVENTS);

  if (!clientLogPath) {
    dialog.showMessageBoxSync({
      title: 'Welcome to poeracetracker',
      message: 'Select Client.txt file',
      detail:
        'In order to parse your current race progression you need to select your Client.txt file located in your Path of Exile installation folder. \nThe regular filepath is C:/Program Files (x86)/Grinding Gear Games/Path of Exile/logs/Client.txt'
    });

    clientLogPath = dialog.showOpenDialogSync({
      title: 'Select Client.txt file',
      defaultPath: path.win32.normalize(
        'C:/Program Files (x86)/Grinding Gear Games/Path of Exile/logs/Client.txt'
      ),
      defaultLabel: 'Confirm',
      filters: [
        { name: 'Text', extensions: ['txt'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    // set up fileparser
    // TODO: make it global and call everytime a race starts
    if (clientLogPath.length > 0) {
      const fileParser = new FileParser(clientLogPath[0]);
      fileParser.on('data', data => {
        mainWindow.webContents.send(constants.EVENT_NEW_DATA, data);
      });
      // TODO: on error
      // TODO: client.txt too big

      settings.set('clientlogpath', clientLogPath[0]);
    }
  }

  createWindow();
  initGlobalShortcuts(mainWindow);
}

app.on('ready', () => {
  initApp();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    initApp();
  }
});

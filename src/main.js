const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const url = require('url');
const settings = require('electron-settings');
const FileParser = require('./main-process/fileparser');
const clientEvents = require('./main-process/clientEvents');
const mocker = require('./main-process/mocker');
const constants = require('./common/constants');
const initGlobalShortcuts = require('./main-process/shortcuts');
const Database = require('./persistence/Database');

let mainWindow;

function createWindow() {
  const bounds = settings.get('bounds');

  mainWindow = new BrowserWindow({
    show: false,
    width: 280,
    minWidth: 280,
    height: 217,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (bounds) {
    mainWindow.setBounds(bounds);
  }

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true
      })
  );

  global.mainWindow = mainWindow;

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('close', () => {
    settings.set('bounds', mainWindow.getBounds());
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// TODO: init on race start
function initFileparser(logpath) {
  const fileParser = new FileParser(logpath);

  fileParser.on('data', data => {
    mainWindow.webContents.send(constants.EVENT_NEW_DATA, data);
  });
  // TODO: on error
  // TODO: client.txt too big
}

function initApp() {
  const clientLogPath = settings.get('clientlogpath');
  // expose db to global to use it in renderer process
  global.db = new Database(constants.COLLECTION_RACEEVENTS);

  if (!clientLogPath) {
    dialog.showMessageBoxSync({
      title: 'Welcome to poeracetracker',
      message: 'Select Client.txt file',
      detail:
        'In order to parse your current race progression you need to select your Client.txt file located in your Path of Exile installation folder. \nThe regular filepath is C:/Program Files (x86)/Grinding Gear Games/Path of Exile/logs/Client.txt'
    });

    const logPath = dialog.showOpenDialogSync({
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

    if (logPath.length > 0) {
      settings.set('clientlogpath', logPath[0]);
      initFileparser(logPath[0]);
    } else {
      app.quit();
    }
  } else {
    initFileparser(clientLogPath);
    createWindow();
    initGlobalShortcuts(mainWindow);
    clientEvents.init();
    mocker.init(); // TODO: exclude on dev
  }
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

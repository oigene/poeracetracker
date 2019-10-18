const { globalShortcut } = require('electron');
const constants = require('../common/constants');

module.exports = function initGlobalShortcuts(mainWindow) {
  globalShortcut.register('Alt+1', () => {
    // mainWindow.setIgnoreMouseEvents(true);
    mainWindow.webContents.send(constants.EVENT_TRACKER_START, {});
  });
  globalShortcut.register('Alt+2', () => {
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.webContents.send(constants.EVENT_TRACKER_PAUSE, {});
  });
  globalShortcut.register('Alt+3', () => {
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.webContents.send(constants.EVENT_TRACKER_STOP, {});
  });
  globalShortcut.register('Alt+4', () => {
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.webContents.send(constants.EVENT_GLOBAL_SHORTCUT);
  });
  globalShortcut.register('Alt+9', () => {
    mainWindow.webContents.openDevTools({ mode: 'bottom' });
  });
};

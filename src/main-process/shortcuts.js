const { globalShortcut } = require('electron');
const constants = require('../common/constants');

module.exports = function initGlobalShortcuts(mainWindow) {
  globalShortcut.register('Alt+1', () => {
    // mainWindow.setIgnoreMouseEvents(true);
    mainWindow.webContents.send(constants.EVENT_START, {});
  });
  globalShortcut.register('Alt+2', () => {
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.webContents.send(constants.EVENT_PAUSE, {});
  });
  globalShortcut.register('Alt+3', () => {
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.webContents.send(constants.EVENT_STOP, {});
  });
  globalShortcut.register('Alt+4', () => {
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.webContents.send(
      constants.EVENT_GLOBAL_SHORTCUT,
      constants.ALT4
    );
  });
  globalShortcut.register('Alt+9', () => {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  });
};

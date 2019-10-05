const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

class FileParser {
  constructor(filepath) {
    this.filepath = filepath
      ? path.win32.normalize(filepath)
      : path.win32.normalize(
          'C:/Program Files (x86)/Grinding Gear Games/Path of Exile/logs/Client.txt'
        );

    this.currentLine = 0;
    this.watcher = null;
    this.dataEvent = null;

    this.init();
  }

  init() {
    this.readFile(fileData => {
      this.currentLine = fileData.split('\n').length - 1;
    });

    this.watcher = chokidar.watch(this.filepath, {
      usePolling: true,
      ignoreInitial: true
    });

    this.watcher.on('change', () => {
      this.readFile(fileData => {
        this.parseFile(fileData);
      });
    });
  }

  readFile(onSuccess, onError) {
    const stream = fs.createReadStream(this.filepath, {
      flags: 'r',
      encoding: 'utf-8',
      fd: null,
      mode: '0666',
      bufferSize: 64 * 1024
    });

    let fileData = '';

    stream.on('data', data => {
      fileData += data;
    });

    stream.on('error', err => {
      if (onError && typeof onError === 'function') {
        onError(err);
      }
      console.log('Stream error!');
    });

    stream.on('end', () => {
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(fileData);
      }
    });
  }

  parseFile(fileData) {
    const lines = fileData.split('\n');
    const newData = lines.slice(this.currentLine);

    this.currentLine = lines.length - 1;

    newData.forEach(data => {
      if (this.dataEvent) {
        this.dataEvent(data);
      }
    });
  }

  on(event, cb) {
    if (cb && typeof cb === 'function') {
      if (event === 'data') {
        this.dataEvent = cb;
      }
    } else {
      throw new Error(
        'Fileparser error: you must specify a callback to an event.'
      );
    }
  }
}

module.exports = FileParser;

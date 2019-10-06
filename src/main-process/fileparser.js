const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const os = require('os');

class FileParser {
  constructor(filepath) {
    this.os = os.type();

    if (!filepath) {
      throw new Error('Fileparser Error: No filepath provided.');
    }

    if (os.type() !== 'Darwin') {
      this.filepath = path.win32.normalize(filepath);
    } else {
      this.filepath = filepath;
    }

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
      console.log('Stream error!', err);
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

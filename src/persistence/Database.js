const Datastore = require('nedb');
const isRenderer = require('is-electron-renderer');
const { app, remote } = require('electron');
const constants = require('../common/constants');

const getCollection = collection => {
  if (collection === constants.COLLECTION_RACEEVENTS) {
    return 'prt-raceevents.db';
  }

  return 'prt.db';
};

class Database {
  constructor(collection) {
    const userData = isRenderer
      ? remote.app.getPath('userData')
      : app.getPath('userData');
    const fileName = getCollection(collection);
    const filePath = `${userData}/${fileName}`;

    this.collection = collection;
    this.db = isRenderer
      ? remote.getGlobal('db').db
      : new Datastore({ filename: filePath, autoload: true });
  }

  async getTopTime(eventType, eventName) {
    return new Promise((resolve, reject) => {
      this.db
        .find({ type: eventType, name: eventName })
        .sort({ time: 1 })
        .limit(1)
        .exec((err, docs) => {
          if (err) {
            return reject(err);
          }

          return docs.length > 0 ? resolve(docs[0].time) : resolve(0);
        });
    }).catch(err => {
      //  TODO: proper error logging
      console.error(err);
      return 0;
    });
  }

  async getAvgTime(eventType, eventName) {
    return new Promise((resolve, reject) => {
      this.db.find({ type: eventType, name: eventName }).exec((err, docs) => {
        if (err) {
          return reject(err);
        }

        if (docs.length > 0) {
          return resolve(
            Math.floor(
              docs.reduce((sum, doc) => sum + doc.time, 0) / docs.length
            )
          );
        }

        return resolve(0);
      });
    }).catch(err => {
      //  TODO: proper error logging
      console.error(err);
      return 0;
    });
  }

  save(data, cb) {
    this.db.insert(data, (err, doc) => {
      if (cb && typeof cb === 'function') {
        cb(err, doc);
      }
    });
  }

  clearDb() {
    this.db.remove({}, { multi: true }, err => {
      if (err) {
        console.error(err);
      }
    });
  }
}

module.exports = Database;

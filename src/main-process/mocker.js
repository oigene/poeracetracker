const { globalShortcut } = require('electron');
const settings = require('electron-settings');
const fs = require('fs');

module.exports = {
  init: () => {
    const data = {
      zones: [
        "2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered Lioneye's Watch.",
        '2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered The Coast.',
        '2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered The Mud Flats.',
        '2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered The Submerged Passage.',
        '2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered The Climb.',
        '2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered The Ledge.',
        '2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered The Lower Prison.',
        '2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered The Upper Prison.',
        "2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered Prisoner's Gate.",
        '2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered The Ship Graveyard.',
        '2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered The Ship Graveyard Cave.',
        '2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered The Cavern of Wrath.',
        '2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered The Cavern of Anger.'
      ],
      levels: [
        '2019/09/27 23:32:07 4367843 ac1 [INFO Client 420] : char (Witch) is now level 2',
        '2019/09/27 23:32:07 4367843 ac1 [INFO Client 420] : char (Witch) is now level 3',
        '2019/09/27 23:32:07 4367843 ac1 [INFO Client 420] : char (Witch) is now level 4',
        '2019/09/27 23:32:07 4367843 ac1 [INFO Client 420] : char (Witch) is now level 5',
        '2019/09/27 23:32:07 4367843 ac1 [INFO Client 420] : char (Witch) is now level 6',
        '2019/09/27 23:32:07 4367843 ac1 [INFO Client 420] : char (Witch) is now level 7',
        '2019/09/27 23:32:07 4367843 ac1 [INFO Client 420] : char (Witch) is now level 8',
        '2019/09/27 23:32:07 4367843 ac1 [INFO Client 420] : char (Witch) is now level 9',
        '2019/09/27 23:32:07 4367843 ac1 [INFO Client 420] : char (Witch) is now level 10',
        '2019/09/27 23:32:07 4367843 ac1 [INFO Client 420] : char (Witch) is now level 11',
        '2019/09/27 23:32:07 4367843 ac1 [INFO Client 420] : char (Witch) is now level 12'
      ]
    };

    globalShortcut.register('Alt+5', () => {
      const logpath = settings.get('clientlogpath');
      const type = Object.keys(data)[Math.floor(Math.random() * Math.floor(2))];
      const event =
        data[type][Math.floor(Math.random() * Math.floor(data[type].length))];

      fs.appendFileSync(logpath, `${event}\n`);
    });
  }
};

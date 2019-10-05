const texts = [
  "2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered Lioneye's Watch.",
  '2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : asdds (Witch) is now level 1'
];

const zones = [
  "Lioneye's Watch",
  'The Coast',
  'The Mud Flats',
  'The Submerged Passage',
  'The Lower Prison',
  'The Upper Prison'
];

export const getMockEntry = () => {
  return `2019/09/30 23:37:20 32435234 ac1 [INFO Client 12044] : You have entered ${
    zones[Math.floor(Math.random() * zones.length)]
  }.`;
};

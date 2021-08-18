interface IConstants {
  app: {
    name: string;
  };
  api: {
    urlWebSocket: string;
    commandHelp: string;
    commandNew: string;
    commandMap: string;
    commandRotate: string;
    commandVerify: string;
    responseNewIsOk: string;
    responseRotateIsOk: string;
    responseMapIsOk: string;
    responseVerifyIsOk: string;
    responseVerifyIsOkPassword: string;
    responseVerifyIsOverAttempt: string;
    remainingValidationAttempt: number;
    maximumGameLevel: number;
  };
  localStorageKeyPrefix: string;
  localStorageKeys: {
    achievementLevel1: string;
    achievementLevel2: string;
    achievementLevel3: string;
    achievementLevel4: string;
    achievementLevel5: string;
    achievementLevel6: string;
  };
  messages: {
    loading: string;
    failure: string;
  };
  text: {
    levelPrefix: string;
    copyright: string;
    buttonValidate: string;
    buttonGiveUp: string;
    buttonReturn: string;
    buttonNext: string;
    validationRemainingAttempt: string;
    nextLevel: string;
    gameIsOver: string;
    gameIsFinished: string;
    welcomeTitle: string;
    welcomeDescription: string;
    welcomeLevel: string;
    welcomeAchievement: string;
    welcomePlay: string;
  };
}

const constants: IConstants = {
  app: {
    name: 'Pipe Puzzle',
  },
  api: {
    urlWebSocket: 'wss://hometask.eg1236.com/game-pipes/',
    commandHelp: 'help', // help - lists other commands
    commandNew: 'new', // new <l> - chooses the game level, <1|6>
    commandMap: 'map', // map - returns the current map
    commandRotate: 'rotate', // rotate <x> <y> - rotates the tile at coordinates
    commandVerify: 'verify', // verify - verifies if the current solution is a valid one (if yes, it will return a level password).
    responseNewIsOk: 'new: OK',
    responseRotateIsOk: 'rotate: OK',
    responseMapIsOk: 'map:',
    responseVerifyIsOk: 'verify: Correct!',
    responseVerifyIsOkPassword: 'Password:',
    responseVerifyIsOverAttempt: 'verify: Only 10',
    remainingValidationAttempt: 12,
    maximumGameLevel: 6,
  },
  localStorageKeyPrefix: 'pipepuzzle_achievement_',
  localStorageKeys: {
    achievementLevel1: 'pipepuzzle_achievement_1',
    achievementLevel2: 'pipepuzzle_achievement_2',
    achievementLevel3: 'pipepuzzle_achievement_3',
    achievementLevel4: 'pipepuzzle_achievement_4',
    achievementLevel5: 'pipepuzzle_achievement_5',
    achievementLevel6: 'pipepuzzle_achievement_6',
  },
  messages: {
    loading: 'Please wait...',
    failure: 'Something went wrong. Please try again.',
  },
  text: {
    copyright: 'All rights reserved.',
    levelPrefix: 'Level',
    buttonValidate: 'Validate',
    buttonGiveUp: 'Give Up!',
    buttonReturn: 'Return',
    buttonNext: 'Next Level',
    validationRemainingAttempt: 'Remaining of the validation attempt is:',
    nextLevel: 'Well done! You have achieved:',
    gameIsOver: 'Game is over! You may start again.',
    gameIsFinished: 'You have finished the game. \nYou can be the next Einstein!',
    welcomeTitle: 'Welcome!',
    welcomeDescription: 'You may choose a level to start.',
    welcomeLevel: 'Level',
    welcomeAchievement: 'Achievement',
    welcomePlay: 'Play',
  },
};

export type {
  IConstants,
};

export {
  constants,
};

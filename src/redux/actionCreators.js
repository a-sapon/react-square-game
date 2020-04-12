import Type from './types';

export const fetchGameMode = mode => ({
  type: Type.GET_GAME_MODE,
  mode
});

export const fetchGameDelay = delay => ({
  type: Type.GET_GAME_DELAY,
  delay
});

export const setUserName = name => ({
  type: Type.SET_USERNAME,
  name
});

export const fillArrWithBlocks = arr => ({
  type: Type.FILL_ARRAY,
  arr
});

export const makeBlue = id => ({
  type: Type.MAKE_BLUE,
  id
});

export const makeRed = id => ({
  type: Type.MAKE_RED,
  id
});

export const makeGreen = id => ({
  type: Type.MAKE_GREEN,
  id
});

export const addUserPoint = () => ({
  type: Type.ADD_USER_POINT
});

export const addPcPoint = () => ({
  type: Type.ADD_PC_POINT
});

export const userWins = () => ({
  type: Type.USER_WINS
});

export const pcWins = () => ({
  type: Type.PC_WINS
})
import Type from './types';

export const fetchGameMode = (mode) => ({
  type: Type.GET_GAME_MODE,
  mode,
});

export const fetchGameDelay = (delay) => ({
  type: Type.GET_GAME_DELAY,
  delay,
});

export const setUserName = (name) => ({
  type: Type.SET_USERNAME,
  name
})



export const startGame = () => ({
  type: Type.START_GAME
});

export const endGame = () => ({
  type: Type.END_GAME
});
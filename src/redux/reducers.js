import Type from './types';

const MAIN_INIT_STATE = {
  fieldBlocksNum: 0,
  delay: 0,
  user: {
    name: '',
    points: 0,
    isWinner: false,
  },
  pc: {
    name: 'Computer',
    points: 0,
    isWinner: false,
  },
  // isGameOn: false
};

export const mainReducer = (state = MAIN_INIT_STATE, action) => {
  switch (action.type) {
    case Type.GET_GAME_MODE:
      return {
        ...state,
        fieldBlocksNum: action.mode * action.mode,
      };
    case Type.GET_GAME_DELAY:
      return {
        ...state,
        delay: action.delay,
      };

    case Type.SET_USERNAME:
      return {
        ...state,
        user: { ...state.user, name: action.name },
      };
    default:
      return state;
  }
};

export const blocksReducer = (state = [], action) => {
  switch (action.type) {
    case Type.FILL_ARRAY:
      return action.arr;
    case Type.MAKE_BLUE:
      const blue = '#0066ff';
      const targetObj = state.find(obj => obj.id === action.id);
      targetObj.bgColor = blue;
      return Object.assign([], state, {[action.id]: targetObj});
    default:
      return state;
  }
};

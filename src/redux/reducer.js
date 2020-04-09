import Type from './types';

const INIT_STATE = {
  fieldBlocksNum: 0,
  delay: 0,
  arrForBlocksRender: [],
  // isGameOn: false,
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
}

export const reducer = (state = INIT_STATE, action) => {
  switch(action.type) {
    case Type.GET_GAME_MODE:
      return {
        ...state,
        fieldBlocksNum: action.mode * action.mode
      };
    case Type.GET_GAME_DELAY:
      return {
        ...state,
        delay: action.delay
      };

    case Type.SET_USERNAME:
      return {
        ...state,
        user: {...state.user, name: action.name}
      };
    case Type.FILL_ARRAY:
      return {
        ...state,
        arrForBlocksRender: action.arr
      };
    case Type.MAKE_BLUE:
      return {
        ...state,
        arrForBlocksRender: []
      };


    // case Type.START_GAME:
    //   return {
    //     ...state,
    //     isGameOn: true
    //   };
    // case Type.END_GAME:
    //   return {
    //     ...state,
    //     isGameOn: false
    //   }

      default:
        return state;
  }
}
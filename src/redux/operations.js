import axios from 'axios';
import {
  fetchGameMode,
  fetchGameDelay,
  fillArrWithBlocks,
  userWins,
  pcWins
} from './actionCreators';

export const getGameSettings = mode => async dispatch => {
  const response = await axios.get(
    'https://starnavi-frontend-test-task.herokuapp.com/game-settings'
  );
  for (let key in response.data) {
    if (key === mode) {
      dispatch(fetchGameMode(response.data[key].field));
      dispatch(fetchGameDelay(response.data[key].delay));
    }
  }
};

export const fillArray = num => dispatch => {
  const resultArray = [];
  for (let i = 0; i < num; i += 1) {
    const block = {
      id: i,
      bgColor: ''
    };
    resultArray.push(block);
  }
  dispatch(fillArrWithBlocks(resultArray));
};

export const checkWinner = (blocksNum, user, pc) => dispatch => {
  console.log('user.points', user.points)
  console.log('pc.points', pc.points)
  const fiftyPercent = blocksNum * 0.5;
  if (user.points > fiftyPercent) {
    dispatch(userWins());
  } else if (pc.points > fiftyPercent) {
    dispatch(pcWins());
  }
};
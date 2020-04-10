import axios from 'axios';
import { fetchGameMode, fetchGameDelay, fillArrWithBlocks } from './actionCreators';
// const blue = '#0066ff';
// const red = '#ff1a1a';
// const green = '#00cc00';

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
      bgColor: '',
    };
    resultArray.push(block);
  }
  dispatch(fillArrWithBlocks(resultArray));
}
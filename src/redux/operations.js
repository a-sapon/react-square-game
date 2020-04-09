import axios from 'axios';
import { fetchGameMode, fetchGameDelay } from './actionCreators';

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
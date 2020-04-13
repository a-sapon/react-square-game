import axios from 'axios';
import {
  fetchGameMode,
  fetchGameDelay,
  fillArrWithBlocks,
  userWins,
  pcWins,
  fetchWinners
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

const getCurrentDate = () => {
  const currentDate = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const monthNum = currentDate.getMonth();
  const month = months[monthNum];
  let date = currentDate.getDate();
  const year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  date = date < 10 ? '0' + date : date;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes} — ${month} ${date}, ${year}`;
};

const sendWinnerToServer = async winner => {
  const winnerObj = {
    winner,
    date: getCurrentDate()
  };
  await axios.post(
    'https://starnavi-frontend-test-task.herokuapp.com/winners',
    winnerObj
  );
};

export const checkWinner = (blocksNum, user, pc) => dispatch => {
  const fiftyPercent = blocksNum * 0.5;
  if (user.points > fiftyPercent) {
    dispatch(userWins());
    sendWinnerToServer(user.name);
  } else if (pc.points > fiftyPercent) {
    dispatch(pcWins());
    sendWinnerToServer(pc.name);
  }
};

export const getWinners = () => async dispatch => {
  const response = await axios.get(
    'https://starnavi-frontend-test-task.herokuapp.com/winners'
  );
  dispatch(fetchWinners(response.data));
};

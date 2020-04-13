import React from 'react';
import SubmitForm from './submitForm/SubmitForm';
import GameField from './gameField/GameField';
import { connect } from 'react-redux';
import style from './App.module.css';
import WinnerMsg from './winnerMsg/WinnerMsg';

const App = ({ blocksNum, delay, user, pc }) => (
  <div className={style.mainContainer}>
    <div className={style.gameContainer}>
      <SubmitForm />
      {(user.isWinner || pc.isWinner) && <WinnerMsg />}
      {blocksNum > 0 && delay > 0 && <GameField />}
    </div>

    <div className={style.leadersContainer}></div>
  </div>
);

const mapStateToProps = state => ({
  blocksNum: state.mainReducer.fieldBlocksNum,
  delay: state.mainReducer.delay,
  user: state.userReducer,
  pc: state.pcReducer
});

export default connect(mapStateToProps)(App);

import React from 'react';
import SubmitForm from './submitForm/SubmitForm';
import GameField from './gameField/GameField';
import { connect } from 'react-redux';
import style from './App.module.css';
import WinnerMsg from './winnerMsg/WinnerMsg';
import LeaderBoard from './leaderBoard/LeaderBoard';

const App = ({ blocksNum, delay, user, pc }) => (
  <div className={style.mainContainer}>
    <section className={style.gameSection}>
      <SubmitForm />
      {(user.isWinner || pc.isWinner) && <WinnerMsg />}
      {blocksNum > 0 && delay > 0 && <GameField />}
    </section>

    <section className={style.leadersSection}>
      <LeaderBoard />
    </section>
  </div>
);

const mapStateToProps = state => ({
  blocksNum: state.appReducer.mainReducer.fieldBlocksNum,
  delay: state.appReducer.mainReducer.delay,
  user: state.appReducer.userReducer,
  pc: state.appReducer.pcReducer
});

export default connect(mapStateToProps)(App);

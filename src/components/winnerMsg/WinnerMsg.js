import React from 'react';
import { connect } from 'react-redux';
import style from './WinnerMsg.module.css';

const WinnerMsg = ({ user, pc }) => (
  <div className={style.winnerContainer}>
    {user.isWinner ? user.name : pc.name} wins!
  </div>
);

const mapStateToProps = state => ({
  user: state.userReducer,
  pc: state.pcReducer
});

export default connect(mapStateToProps)(WinnerMsg);
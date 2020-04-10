import React from 'react';
import SubmitForm from './submitForm/SubmitForm';
import GameField from './gameField/GameField';
import { connect } from 'react-redux';
import style from './App.module.css';

const App = ({ blocksNum }) => (
  <>
    <SubmitForm />
    {blocksNum > 0 && (
      <div className={style.fieldWrapper}>
        <GameField />
      </div>
    )}
  </>
);

const mapStateToProps = (state) => ({
  blocksNum: state.mainReducer.fieldBlocksNum
});

export default connect(mapStateToProps)(App);

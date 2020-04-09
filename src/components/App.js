import React from 'react';
import SubmitForm from './submitForm/SubmitForm';
import GameField from './gameField/GameField';
import { connect } from 'react-redux';
import style from './App.module.css';

const App = ({ fieldBlocksNum }) => (
  <>
    <SubmitForm />
    {fieldBlocksNum > 0 && (
      <div className={style.fieldWrapper}>
        <GameField />
      </div>
    )}
  </>
);

const mapStateToProps = (state) => ({
  fieldBlocksNum: state.fieldBlocksNum,
});

export default connect(mapStateToProps)(App);

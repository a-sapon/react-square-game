import React from 'react';
import styles from './GameField.module.css';
import { connect } from 'react-redux';

const GameField = ({ blocksNum }) => {
  const arr = [];
  let width;
  for (let i = 0; i < blocksNum; i += 1) {
    arr.push(i);
  }
  console.log(arr)

  if (blocksNum === 25) {
    width = '250px';
  } else if (blocksNum === 100) {
    width = '500px';
  } else {
    width = '750px';
  }

  return (
    <div className={styles.fieldContainer} style={{width: width}}>
      {arr.map((val, idx) => <div className={styles.fieldBlock} key={idx}></div>)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  blocksNum: state.fieldBlocksNum
})


export default connect(mapStateToProps)(GameField);

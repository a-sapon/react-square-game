import React, { Component } from 'react';
import styles from './GameField.module.css';
import { connect } from 'react-redux';
import { fillArray, checkWinner } from '../../redux/operations';
import {
  makeBlue,
  makeRed,
  makeGreen,
  addUserPoint,
  addPcPoint,
  endGame
} from '../../redux/actionCreators';
const blue = 'rgb(0, 102, 255)';
const green = 'rgb(0, 204, 0)';
const red = 'rgb(255, 26, 26)';
let intervalId;

class GameField extends Component {
  state = {
    width: ''
  };

  componentDidMount() {
    const { fillArray, blocksNum, delay, isGameOn } = this.props;
    this.setWidth();
    fillArray(blocksNum);

    if (intervalId !== undefined) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      this.makeRandomBlockBlue();
      this.makeBlockRed();
    }, delay);
    !isGameOn && clearInterval(intervalId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { user, arr } = this.props;
    if (prevProps.user.points !== user.points) {
      this.readyToCheckWinner(arr);
    }
  }

  makeRandomBlockBlue() {
    const { arr, makeBlue, isGameOn } = this.props;
    const randomNum = Math.round(Math.random() * (arr.length - 1));
    if (arr[randomNum].bgColor === '') {
      makeBlue(randomNum);
    } else {
      isGameOn && this.makeRandomBlockBlue();
    }
    this.areAllBlocksPainted(arr);
  }

  makeBlockRed() {
    const { arr, delay, makeRed, addPcPoint } = this.props;
    arr.forEach(el => {
      if (el.bgColor === green || el.bgColor === '') {
        return;
      }
      setTimeout(() => {
        if (el.bgColor === blue) {
          addPcPoint();
          makeRed(el.id);
          this.readyToCheckWinner(arr);
        }
      }, delay);
    });
  }

  makeBlockGreen(e) {
    const { makeGreen, addUserPoint } = this.props;
    if (e.target.style.backgroundColor === blue) {
      addUserPoint();
      makeGreen(Number(e.target.dataset.id));
    }
  }

  areAllBlocksPainted(arr) {
    const { endGame, isGameOn } = this.props;
    if (arr.every(el => el.bgColor !== '')) {
      isGameOn && endGame();
    }
  }

  readyToCheckWinner(arr) {
    const { checkWinner, blocksNum, user, pc } = this.props;
    if (arr.every(el => el.bgColor === green || el.bgColor === red)) {
      checkWinner(blocksNum, user, pc);
    }
  }

  setWidth() {
    if (this.props.blocksNum === 25) {
      this.setState({
        width: '250px'
      });
    } else if (this.props.blocksNum === 100) {
      this.setState({
        width: '500px'
      });
    } else {
      this.setState({
        width: '750px'
      });
    }
  }

  render() {
    const { width } = this.state;
    const boundMakeGreen = this.makeBlockGreen.bind(this);
    return (
      <div
        onClick={boundMakeGreen}
        className={styles.fieldContainer}
        style={{ width: width }}
      >
        {this.props.arr.map(({ id, bgColor }) => (
          <div
            style={{ backgroundColor: bgColor }}
            className={styles.fieldBlock}
            key={id}
            data-id={id}
          ></div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  blocksNum: state.appReducer.mainReducer.fieldBlocksNum,
  arr: state.appReducer.blocksReducer,
  delay: state.appReducer.mainReducer.delay,
  user: state.appReducer.userReducer,
  pc: state.appReducer.pcReducer,
  isGameOn: state.appReducer.mainReducer.isGameOn
});

export default connect(mapStateToProps, {
  fillArray,
  makeBlue,
  makeRed,
  makeGreen,
  addUserPoint,
  addPcPoint,
  checkWinner,
  endGame
})(GameField);

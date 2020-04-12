import React, { Component } from 'react';
import styles from './GameField.module.css';
import { connect } from 'react-redux';
import { fillArray, checkWinner } from '../../redux/operations';
import { makeBlue, makeRed, makeGreen, addUserPoint, addPcPoint } from '../../redux/actionCreators';
const blue = 'rgb(0, 102, 255)';
const green = 'rgb(0, 204, 0)';
let intervalId;

class GameField extends Component {
  state = {
    width: ''
  };

  componentDidMount() {
    const { fillArray, blocksNum, delay } = this.props;
    this.setWidth();
    fillArray(blocksNum);
    intervalId = setInterval(() => {
      this.makeRandomBlockBlue();
      this.makeBlockRed();
    }, delay);
  }

  makeRandomBlockBlue() {
    const { arr, makeBlue } = this.props;
    const randomNum = Math.round(Math.random() * (arr.length - 1));
    if (arr[randomNum].bgColor === '') {
      makeBlue(randomNum);
    } else {
      this.makeRandomBlockBlue();
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
          makeRed(el.id);
          addPcPoint();
        }
      }, delay);
    });
  }

  makeBlockGreen(e) {
    const { makeGreen, addUserPoint } = this.props;
    if (e.target.style.backgroundColor === blue) {
      makeGreen(Number(e.target.dataset.id));
      addUserPoint()
    }
  }

  areAllBlocksPainted(arr) {
    const { checkWinner, blocksNum, user, pc } = this.props;
    if (arr.every(el => el.bgColor !== '')) {
      checkWinner(blocksNum, user, pc);
      clearInterval(intervalId);
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
  blocksNum: state.mainReducer.fieldBlocksNum,
  arr: state.blocksReducer,
  delay: state.mainReducer.delay,
  user: state.userReducer,
  pc: state.pcReducer
});

export default connect(mapStateToProps, {
  fillArray,
  makeBlue,
  makeRed,
  makeGreen,
  addUserPoint,
  addPcPoint,
  checkWinner
})(GameField);

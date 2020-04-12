import React, { Component } from 'react';
import styles from './GameField.module.css';
import { connect } from 'react-redux';
import { fillArray } from '../../redux/operations';
import { makeBlue, makeRed } from '../../redux/actionCreators';
const blue = '#0066ff';

class GameField extends Component {
  state = {
    width: ''
  };

  componentDidMount() {
    const { fillArray, blocksNum, delay } = this.props;
    this.setWidth();
    fillArray(blocksNum);
    setInterval(() => {
      this.makeRandomBlockBlue();
      this.makeBlockRed();
    }, delay);
  }

  setWidth() {
    if (this.props.blocksNum === 25) {
      this.setState({
        width: '250px',
      });
    } else if (this.props.blocksNum === 100) {
      this.setState({
        width: '500px',
      });
    } else {
      this.setState({
        width: '750px',
      });
    }
  }

  makeRandomBlockBlue() {
    const { arr, makeBlue } = this.props;
    const randomNum = Math.round(Math.random() * (arr.length - 1));
    if (arr[randomNum].bgColor === '') {
      console.log(arr[randomNum])
      makeBlue(randomNum);
    } else {
      this.makeRandomBlockBlue();
      // remove once all blocks are painted
    }
  }

  makeBlockRed() {
    const { arr, delay, makeRed } = this.props;
    arr.forEach(({ id, bgColor }) => {
      setTimeout(() => {
        if (bgColor === blue) {
          console.log(id);
          makeRed(id)
        }
      }, delay);
    })
  }

  makeBlockGreen() {}

  render() {
    const { width } = this.state;
    return (
      <div className={styles.fieldContainer} style={{ width: width }}>
        {this.props.arr.map(({ id, bgColor }) => (
          <div
            style={{ backgroundColor: bgColor }}
            className={styles.fieldBlock}
            key={id}
          ></div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blocksNum: state.mainReducer.fieldBlocksNum,
  arr: state.blocksReducer,
  delay: state.mainReducer.delay
});

export default connect(mapStateToProps, { fillArray, makeBlue, makeRed })(GameField);
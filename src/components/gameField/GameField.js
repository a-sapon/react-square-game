import React, { Component } from 'react';
import styles from './GameField.module.css';
import { connect } from 'react-redux';
import { fillArray } from '../../redux/operations';
import { makeBlue } from '../../redux/actionCreators';

class GameField extends Component {
  state = {
    width: ''
  };

  componentDidMount() {
    const { fillArray, blocksNum } = this.props;
    this.setWidth();
    fillArray(blocksNum);
    setInterval(() => {
      this.getRandomBlock();
    }, 2000);
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

  getRandomBlock() {
    const { arr, makeBlue } = this.props;
    const randomNum = Math.round(Math.random() * (arr.length - 1));
    if (arr[randomNum].bgColor === '') {
      makeBlue(randomNum);
    } else {
      this.getRandomBlock();
      // remove once all blocks are painted
    }
  }

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
  arr: state.blocksReducer
});

export default connect(mapStateToProps, { fillArray, makeBlue })(GameField);
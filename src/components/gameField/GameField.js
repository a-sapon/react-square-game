import React, { Component } from 'react';
import styles from './GameField.module.css';
import { connect } from 'react-redux';
import { fillArray, makeBlockBlue } from '../../redux/operations';

class GameField extends Component {
  state = {
    width: ''
  };

  componentDidMount() {
    const { fillArray, blocksNum, arr, makeBlockBlue } = this.props;
    this.setWidth();
    fillArray(blocksNum);
    makeBlockBlue(arr)
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
  blocksNum: state.fieldBlocksNum,
  arr: state.arrForBlocksRender
});

export default connect(mapStateToProps, { fillArray, makeBlockBlue })(GameField);
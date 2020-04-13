import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import style from './LeaderBoard.module.css';
import { connect } from 'react-redux';
import { getWinners } from '../../redux/operations';

class LeaderBoard extends Component {
  componentDidMount() {
    this.props.getWinners();
  }

  render() {
    return (
      <>
        <h2 className={style.winnersHdr}>Leader Board</h2>
        <List className={style.winnersList}>
          {this.props.winners.map(({ winner, date, id }) => (
            <ListItem key={id}>
              <ListItemAvatar>
                <Avatar>{winner[0].toUpperCase()}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={winner} secondary={date} />
            </ListItem>
          ))}
        </List>
      </>
    );
  }
}

const mapStateToProps = state => ({
  winners: state.leaderBoardReducer
});

export default connect(mapStateToProps, { getWinners })(LeaderBoard);

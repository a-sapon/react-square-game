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
    const { winners } = this.props;
    return (
      <>
        <h2 className={style.winnersHdr}>Leader Board</h2>
        {winners.length === 0 ? (
          <div className={style.noWinners}>Play a game to put your name on the Leader Board!</div>
        ) : (
          <List className={style.winnersList}>
            {winners.map(({ winner, date, id }) => (
              <ListItem key={id}>
                <ListItemAvatar>
                  <Avatar>{winner[0].toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={winner} secondary={date} />
              </ListItem>
            ))}
          </List>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  winners: state.leaderBoardReducer,
  update: state.appReducer.mainReducer.update
});

export default connect(mapStateToProps, { getWinners })(LeaderBoard);

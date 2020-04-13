import React, { Component } from 'react';
import ModeSelect from './ModeSelect';
import NameInput from './NameInput';
import Button from '@material-ui/core/Button';
import style from './styles/submitForm.module.css';
import { styled } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';
import animation from './styles/animation.module.css';
import { getGameSettings } from '../../redux/operations';
import { connect } from 'react-redux';
import { setUserName, resetState } from '../../redux/actionCreators';

const StyledButton = styled(Button)({
  background: 'linear-gradient(45deg, #474747 30%, #808080 90%)',
  color: 'white',
  height: 40,
  padding: '0 30px',
  marginTop: '8px'
});

class SubmitForm extends Component {
  state = {
    showErr: false
  };

  handleSubmit = async e => {
    const { getGameSettings, setUserName, resetState } = this.props;
    e.preventDefault();
    resetState();
    const mode = e.currentTarget.elements.mode.value;
    const name = e.currentTarget.elements.name.value;
    if (mode === '' || name === '') {
      this.setState({ showErr: true });
      setTimeout(() => {
        this.setState({ showErr: false });
      }, 2500);
      return;
    }
    getGameSettings(mode);
    setUserName(name);
  };

  render() {
    const { showErr } = this.state;
    const { isGameOn } = this.props;
    return (
      <>
        <form onSubmit={this.handleSubmit} className={style.submitForm}>
          <ModeSelect />
          <NameInput />
          <StyledButton type='submit' variant='contained'>
            {isGameOn ? 'Play' : 'Play again'}
          </StyledButton>
        </form>
        <CSSTransition
          in={showErr}
          timeout={300}
          classNames={animation}
          unmountOnExit
        >
          <div className={style.error}>
            Please choose the game mode and enter your name!
          </div>
        </CSSTransition>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isGameOn: state.appReducer.mainReducer.isGameOn
});

export default connect(mapStateToProps, {
  getGameSettings,
  setUserName,
  resetState
})(SubmitForm);
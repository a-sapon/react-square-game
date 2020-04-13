import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    minWidth: 136
  }
}));

export default function NameInput() {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems='flex-end'>
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField name='name' label='Enter your name' />
        </Grid>
      </Grid>
    </div>
  );
}

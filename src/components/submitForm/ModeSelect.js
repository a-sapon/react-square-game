import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 136,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ModeSelect() {
  const classes = useStyles();
  const [mode, setMode] = React.useState('');

  const handleChange = (event) => {
    setMode(event.target.value);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='age-native-simple'>Game mode</InputLabel>
        <Select native value={mode} onChange={handleChange} name='mode'>
          <option aria-label='None' value='' />
          <option value='easyMode'>Easy</option>
          <option value='normalMode'>Normal</option>
          <option value='hardMode'>Hard</option>
        </Select>
      </FormControl>
    </div>
  );
}

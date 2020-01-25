import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '50vh',
    textAlign: 'center'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 0),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
    // marginTop: theme.spacing(8),
    // paddingTop: theme.spacing(3),
    // paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      // paddingTop: theme.spacing(6),
      // paddingBottom: theme.spacing(6),
    }
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container text-align="center" justify="space-evenly">
          <Typography variant="body2" color="textSecondary">
            Build on GNU/Linux, circa {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </footer>
    </div>
  );
}

import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';



const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(10, 0, 8),
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Jotter Org
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Jotter is the brainchild of two pre-final CS grad students: Abhinav Shroff a.k.a. <Link href="https://github.com/toguro85" target="_blank" >toguro85 </Link> and Sahil Dhiman a.k.a. <Link href="https://github.com/sahilister" target="_blank" >sahilister </Link>. Jotter is a journaling website to write your story. Journaling is a very effective tool for stress relief. On Jotter, you can register and get your own profile to save all your journal entries. Our rich text editor allows you to format you journal in any way you like, so write it out.
        </Typography>
      </Container>
    </Fragment>
  );
};

export default About;

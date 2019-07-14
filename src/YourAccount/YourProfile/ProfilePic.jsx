import React from 'react'
import firebase from 'firebase'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import './ProfilePic.css'
import { Grid } from '@material-ui/core';
import MediaQuery from 'react-responsive'

const styles = theme => ({
    card: {
      width: 600,
      height: 150
    },
    cardPortrait:{
      width: '100%',
      height: 90
    },
    typography:{
      fontFamily:'Rubik',
      fontSize:25
    },
    typographyPortrait:{
      fontFamily:'Rubik',
      fontSize:17
    },
    avatar: {
      height:120,
      width:120
    },
    avatarPortrait:{
      height:60,
      width:60
    }
  });

function ProfilePic(props){
    const { classes } = props
      return(
        <div>
        <MediaQuery minDeviceWidth={1280}>
        <div className="ProfilePic">
        <Card className={classes.card}>
        <CardContent>
        <Grid container>
        <Grid item xs={4}>
        <Avatar alt={firebase.auth().currentUser.displayName} src={firebase.auth().currentUser.photoURL} className={classes.avatar} />
        </Grid>
        <Grid item xs={8}>
        <Typography gutterBottom variant="p" component="h2" className={classes.typography}>
        Hello <br/><br/>{firebase.auth().currentUser.displayName}<br/>
        </Typography>
        </Grid>
        </Grid>
        </CardContent>   
        </Card>
        </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1280}>
        <div className="ProfilePicPortrait">
        <Card className={classes.cardPortrait}>
        <CardContent>
        <Grid container>
        <Grid item xs={4}>
        <Avatar alt={firebase.auth().currentUser.displayName} src={firebase.auth().currentUser.photoURL} className={classes.avatarPortrait} />
        </Grid>
        <Grid item xs={8}>
        <Typography gutterBottom variant="p" component="h2" className={classes.typographyPortrait}>
        Hello <br/><br/>{firebase.auth().currentUser.displayName}<br/>
        </Typography>
        </Grid>
        </Grid>
        </CardContent>   
        </Card>
        </div>
        </MediaQuery>
        </div>
        )
}
ProfilePic.propTypes = {
    classes: propTypes.object.isRequired,
  };
export default withStyles(styles)(ProfilePic);
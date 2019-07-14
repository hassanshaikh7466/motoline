import React from 'react'
import firebase from 'firebase'
import propTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MediaQuery from 'react-responsive'
import './YourCars.css'

const styles = theme => ({
      card: {
        width: '100%',
        height: 270
      },
      cardPortrait: {
        width: '100%',
        height: 210,
      },
      typography:{
        fontFamily:'Rubik',
        fontSize:16
      },
      typographyPortrait:{
        fontFamily:'Rubik',
        fontSize:15
      },
      media: {
        height: 180,
      },
      mediaPortrait:{
        height:150
      }
    });
    
function CarDetails(props){
    function removeCar(){
        const dbref = firebase.database().ref().child('Users');
        dbref.on('child_added', snap=>{
            if(snap.val().email===firebase.auth().currentUser.email){
                const dbref1 = firebase.database().ref().child('Users/'+snap.key+'/Cars');
                dbref1.child(props.details.id).remove();
            }
        })
    }
    const { classes } = props;
    return(
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="CarDetails">
            <Card className={classes.card}>
            <CardMedia
            className={classes.media}
            image={props.details.imageURL}
            title={props.details.model}>
            <div className="CloseButton">
            <IconButton color="inherit" onClick={removeCar} aria-label="Close">
                <CloseIcon />
            </IconButton>
            </div>
            </CardMedia>
            <CardContent>
            <Typography gutterBottom variant="h6" component="h2" className={classes.typography}>
            {props.details.manufacturer} {props.details.model}<br/>
            {props.details.engineOption}<br/>
            </Typography>
            </CardContent>  
            </Card>
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="CarDetailsPortrait">
            <Card className={classes.cardPortrait}>
            <CardMedia
            className={classes.mediaPortrait}
            image={props.details.imageURL}
            title={props.details.model}>
            <div className="CloseButton">
            <IconButton color="inherit" onClick={removeCar} aria-label="Close">
                <CloseIcon />
            </IconButton>
            </div>
            </CardMedia>
            <CardContent>
            <Typography gutterBottom variant="p" component="h2" className={classes.typographyPortrait}>
            {props.details.manufacturer} {props.details.model}<br/>
            {props.details.engineOption}<br/>
            </Typography>
            </CardContent>  
            </Card>
            </div>
            </MediaQuery>
            </div>
        )
}
CarDetails.propTypes = {
    classes: propTypes.object.isRequired,
    details: propTypes.array
  };
  
export default withStyles(styles)(CarDetails);
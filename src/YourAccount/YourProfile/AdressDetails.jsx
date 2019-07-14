import React from 'react'
import firebase from 'firebase'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MediaQuery from 'react-responsive'
import './Addresses.css'

const styles = theme => ({
      card:{
        width:'100%',
        height: '100%'
      },
      typography:{
        fontFamily:'Rubik'
      },
      typographyPortrait:{
        fontFamily:'Rubik',
        fontSize:15
      }
    });

function AddressDetails(props){
    function removeAddress(){
        const dbref = firebase.database().ref().child('Users');
        dbref.on('child_added', snap=>{
            if(snap.val().email===firebase.auth().currentUser.email){
                const dbref1 = firebase.database().ref().child('Users/'+snap.key+'/Address');
                dbref1.child(props.details.id).remove();
            }
        })
    }
        const { classes } = props;
        return(
            <div className="AddressDetails">
            <MediaQuery minDeviceWidth={1280}>
            <Card className={classes.card}>
            <div className="CloseButton">
            <IconButton color="inherit" onClick={removeAddress} aria-label="Close">
                <CloseIcon />
            </IconButton>
            </div>
            <CardContent>
            <Typography gutterBottom variant="h6" component="h2" className={classes.typography}>
            Address line: {props.details.addressLine}<br/>
            Street: {props.details.street} Landmark: {props.details.landmark}<br/>
            City:{props.details.city} Pincode:{props.details.pincode}
            </Typography>
            </CardContent> 
            </Card>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <Card className={classes.card}>
            <div className="CloseButton">
            <IconButton color="inherit" onClick={removeAddress} aria-label="Close">
                <CloseIcon />
            </IconButton>
            </div>
            <CardContent>
            <Typography gutterBottom variant="h6" component="h2" className={classes.typographyPortrait}>
            Address line: {props.details.addressLine}<br/>
            Street: {props.details.street} Landmark: {props.details.landmark}<br/>
            City:{props.details.city} Pincode:{props.details.pincode}
            </Typography>
            </CardContent> 
            </Card>
            </MediaQuery>
            </div>
        )
}
AddressDetails.propTypes = {
    classes: propTypes.object.isRequired,
    details: propTypes.array
  };
  
export default withStyles(styles)(AddressDetails);
import React,{Component} from 'react'
import firebase from 'firebase'
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles';
import {TextField,Button,Grid} from '@material-ui/core'
import MediaQuery from 'react-responsive'
import propTypes from 'prop-types'
import './Addresses.css'

const styles = theme => ({
    button: {
    fontFamily:'Rubik',
    fontSize:18,
    margin:theme.spacing.unit,
    backgroundColor:'#ffffff',
    color:'#001a66',
    '&:hover': {
        backgroundColor:'#ffff00',
        color:'#001a66'
    }
    },
    buttonPortrait:{
        fontFamily:'Rubik',
        fontSize:14,
        margin:theme.spacing.unit,
        backgroundColor:'#ffffff',
        color:'#001a66',
        '&:hover': {
            backgroundColor:'#ffff00',
            color:'#001a66'
        }
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    textFieldPortrait: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 140
    }
})

class AddAddress extends Component{
    constructor(props){
        super(props)
        this.state = {
            addressRender:true,addressLine:'',street:'',landmark:'',city:'',pincode:'',errorOpen:false
        }
    }
    addAddress = () =>{
        this.state.addressRender
        ? this.setState({ addressRender:false })
        : this.setState({ addressRender:true })
    }
    handleTextbox = e =>{ this.setState({ [e.target.name]:e.target.value })}
    handleAddAddress = () =>{
        if(this.state.addressLine!=="" && this.state.street!=="" && this.state.city!=="" && this.state.landmark!=="" && this.state.pincode!==""){
            const dbref = firebase.database().ref().child('Users');
            dbref.on('child_added', snap=>{
            if(snap.val().email===firebase.auth().currentUser.email){
                const dbref1 = firebase.database().ref().child('Users/'+snap.key+'/Address');
                dbref1.push().set({ 
                    addressLine:this.state.addressLine,
                    street:this.state.street,
                    landmark:this.state.landmark,
                    city:this.state.city,
                    pincode:this.state.pincode
                })
            }
        this.setState({ addressRender:true,addressLine:'',street:'',landmark:'',city:'',pincode:'' })
        })
        }else{
            this.setState({ errorOpen:true })
        }
    }
    handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ errorOpen: false });
    }
    render(){
        const { classes } = this.props;
        return(
            <div className="AddAddress">
            <MediaQuery minDeviceWidth={1280}>
            {this.state.addressRender
            ? <Button variant="flat" className={classes.button} onClick={this.addAddress}>Add Address</Button>
            : <Grid container>
            <Grid item xs={6}>
            <TextField multiline name="addressLine" label="Address line" margin="normal" className={classes.textField} value={this.state.addressLine} onChange={this.handleTextbox}/><br/>
            <TextField multiline name="street" label="Street" margin="normal" className={classes.textField} value={this.state.street} onChange={this.handleTextbox}/><br/>
            <TextField name="pincode" label="Pincode" margin="normal" className={classes.textField} value={this.state.pincode} onChange={this.handleTextbox}/><br/>
            </Grid>
            <Grid item xs={6}>
            <TextField multiline name="landmark" label="Landmark" margin="normal" className={classes.textField} value={this.state.landmark} onChange={this.handleTextbox}/><br/>
            <TextField name="city" label="Town/City" margin="normal" className={classes.textField} value={this.state.city} onChange={this.handleTextbox}/><br/>
            </Grid>
            <Grid item xs={12}>
            <Button variant="flat" onClick={this.handleAddAddress} className={classes.button}>Add</Button>
            <Button variant="flat" onClick={this.addAddress} className={classes.button}>Back</Button>
            </Grid>
            </Grid>}
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} open={this.state.errorOpen}
            autoHideDuration={3000} onClose={this.handleErrorClose}
            ContentProps={{ 'aria-describedby': 'message-id'}}
            message={<span id="message-id">Fill up all the textfields</span>}
            action={[
            <IconButton key="close" aria-label="Close"
            color="inherit" className={classes.close}
            onClick={this.handleErrorClose}>
            <CloseIcon />
            </IconButton>]}/>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            {this.state.addressRender
            ? <Button variant="flat" className={classes.buttonPortrait} onClick={this.addAddress}>Add Address</Button>
            : <Grid container>
            <Grid item xs={12}>
            <TextField multiline name="addressLine" label="Address line" margin="normal" className={classes.textFieldPortrait} value={this.state.addressLine} onChange={this.handleTextbox}/><br/>
            <TextField multiline name="street" label="Street" margin="normal" className={classes.textFieldPortrait} value={this.state.street} onChange={this.handleTextbox}/><br/>
            <TextField multiline name="landmark" label="Landmark" margin="normal" className={classes.textFieldPortrait} value={this.state.landmark} onChange={this.handleTextbox}/><br/>
            <TextField name="city" label="Town/City" margin="normal" className={classes.textFieldPortrait} value={this.state.city} onChange={this.handleTextbox}/><br/>
            <TextField name="pincode" label="Pincode" margin="normal" className={classes.textFieldPortrait} value={this.state.pincode} onChange={this.handleTextbox}/><br/>
            </Grid>
            <Grid item xs={12}>
            <Button variant="flat" onClick={this.handleAddAddress} className={classes.buttonPortrait}>Add</Button>
            <Button variant="flat" onClick={this.addAddress} className={classes.buttonPortrait}>Back</Button>
            </Grid>
            </Grid>}
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'right'}} open={this.state.errorOpen}
            autoHideDuration={3000} onClose={this.handleErrorClose}
            ContentProps={{ 'aria-describedby': 'message-id'}}
            message={<span id="message-id">Fill up all the textfields</span>}
            action={[
            <IconButton key="close" aria-label="Close"
            color="inherit" className={classes.close}
            onClick={this.handleErrorClose}>
            <CloseIcon />
            </IconButton>]}/>
            </MediaQuery>
            </div>
        )
    }
}
AddAddress.propTypes = {
    classes: propTypes.object.isRequired,
  };
  
export default withStyles(styles)(AddAddress);
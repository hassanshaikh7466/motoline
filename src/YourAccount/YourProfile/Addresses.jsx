import React,{Component} from 'react'
import Grid from '@material-ui/core/Grid'
import propTypes from 'prop-types'
import firebase from 'firebase'
import AddressDetails from './AdressDetails';
import { withStyles } from '@material-ui/core/styles';
import { Button, Divider, Card, CardContent, Typography } from '@material-ui/core';
import MediaQuery from 'react-responsive'
import TextField from '@material-ui/core/TextField';
import './Addresses.css'
import AddAddress from './AddAddress';

const styles = theme => ({
    card: {
        width: 720,
        height: '100%'
      },
      cardPortrait: {
        width: '100%',
        height: '100%'
      },
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
    buttonPortrait: {
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
      typography:{
        fontFamily:'Rubik'
      },
      typographyPortrait:{
        fontFamily:'Rubik',
        fontSize: 17
      },
      close: {
        padding: theme.spacing.unit / 2,
        color:'#ffffff'
      }
})
class Addresses extends Component{
    constructor(props){
        super(props);
        this.classes = propTypes.classes
        this.state = {
            addresses:[],
            mobileNo:'',render:false,type:'',points:''
        }
    }
    componentWillMount(){
        const dbref1 = firebase.database().ref().child('Users');
        dbref1.on('child_added', snap=>{
        if(snap.val().email===firebase.auth().currentUser.email){
            this.setState({ mobileNo:snap.val().mobileNo, type:snap.val().type, points:snap.val().points })
          }
        })
        dbref1.on('child_changed', snap=>{
            this.setState({ mobileNo:snap.val().mobileNo, type:snap.val().type, points:snap.val().points })
        })
        const dbref = firebase.database().ref().child('Users');
        dbref.on('child_added', snap=>{
            if(snap.val().email===firebase.auth().currentUser.email){
                const dbref2 = firebase.database().ref().child('Users/'+snap.key+'/Address');
                const addresses = [];
                dbref2.on('child_added', snap=>{
                    addresses.push({
                        id:snap.key,
                        addressLine:snap.val().addressLine,
                        street:snap.val().street,
                        landmark:snap.val().landmark,
                        city:snap.val().city,
                        pincode:snap.val().pincode
                    })
                    this.setState({ addresses })
                })
                dbref2.on('child_removed', snap=>{
                    for(var i=0;i<addresses.length;i++){
                        if(snap.key===addresses[i].id){
                            addresses.splice(i,1)
                        }
                    }
                    this.setState({ addresses })
                })
            }
        })
    }
    handleEdit = () =>{ 
        this.state.render
        ? this.setState({ render:false })
        : this.setState({ render:true })
    }
    handleMobileNo = e =>{ this.setState({ mobileNo:e.target.value })}
    handleChanges = () =>{
      const dbref = firebase.database().ref().child('Users');
      dbref.on('child_added', snap=>{
        if(snap.val().email===firebase.auth().currentUser.email){
          const dbref1 = firebase.database().ref().child('Users/'+snap.key)
          dbref1.update({ mobileNo:this.state.mobileNo })
          this.setState({ render:false })
        }
      })
    }
    
    render(){
        const { classes } = this.props;
        return(
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="Addresses">
            <Card className={classes.card}>
            <CardContent>
            <Typography variant="h6" component="h2" className={classes.typography}>
            Email: {firebase.auth().currentUser.email}<br/>
            Account type: {this.state.type}<br/>
            Mobile no: {this.state.mobileNo}
            {this.state.render
            ? <div>
              <TextField value={this.state.mobileNo} margin="normal" className={classes.textField} onChange={this.handleMobileNo}/>
              <Button variant="flat" className={classes.button} onClick={this.handleChanges}>Save</Button>
              <Button onClick={this.handleEdit} variant="flat" className={classes.button}>Back</Button>
              </div>
            : <Button onClick={this.handleEdit} variant="flat" className={classes.button}>Edit phone no.</Button>}
            {this.state.type==="Mechanic"
            ? <div>Points: {this.state.points}</div>
            :null }
            </Typography><br/>
            <div className="AddressHeading">Addresses:</div>
            <Divider/>
            {this.state.addresses.length===0
            ? <div className="NoAddresses">
                No addresses added
                <AddAddress/>
            </div>
            : <div className="AddressesAdded">
            <Grid container>
            {this.state.addresses.map(p=>
            <Grid item xs={6} key={p.id}>
            <AddressDetails details={p}/>
            </Grid>)}
            </Grid>
            <AddAddress/>
            </div>}
            </CardContent>
            </Card>
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="AddressesPortrait">
            <Card className={classes.cardPortrait}>
            <CardContent>
            <Typography variant="h6" component="h2" className={classes.typographyPortrait}>
            Email: {firebase.auth().currentUser.email}<br/>
            Account type: {this.state.type}<br/>
            Mobile no: {this.state.mobileNo}<br/>
            {this.state.render
            ? <div>
              <TextField value={this.state.mobileNo} margin="normal" className={classes.textField} onChange={this.handleMobileNo}/><br/>
              <Button variant="flat" className={classes.buttonPortrait} onClick={this.handleChanges}>Save</Button>
              <Button onClick={this.handleEdit} variant="flat" className={classes.buttonPortrait}>Back</Button>
              </div>
            : <Button onClick={this.handleEdit} variant="flat" className={classes.buttonPortrait}>Edit phone no.</Button>}
            {this.state.type==="Mechanic"
            ? <div>Points: {this.state.points}</div>
            :null }
            </Typography><br/>
            <div className="AddressHeadingPortrait">Addresses:</div>
            <Divider/>
            {this.state.addresses.length===0
            ? <div className="NoAddressesPortrait">
                No addresses added
                <AddAddress/>
            </div>
            : <div className="AddressesAdded">
            <Grid container>
            {this.state.addresses.map(p=>
            <Grid item xs={12} key={p.id}>
            <AddressDetails details={p}/>
            </Grid>)}
            </Grid>
            <AddAddress/>
            </div>}
            </CardContent>
            </Card>
            </div>
            </MediaQuery>
            </div>
            
        )
    }
}
Addresses.propTypes = {
    classes: propTypes.object.isRequired,
  };
  
export default withStyles(styles)(Addresses);
import React,{Component} from 'react'
import firebase from 'firebase'
import propTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import {Button,Grid} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MediaQuery from 'react-responsive'
import './YourCars.css'

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
    formControl: {
        margin: theme.spacing.unit
      },
      select:{
          width:200
      },
      selectPortrait:{
        width:150,
        fontSize:14
    }
})

class AddCar extends Component{
    constructor(props){
        super(props);
        this.state = {
            carsRender:true,
            manufacturers:[],models:[],engineOptions:[],
            manufacturer:'',model:'',engineOption:'',
            imageURL:'',errorOpen:false
        }
    }
    addCar = () =>{
        const dbref = firebase.database().ref().child('Cars');
        const manufacturers = []
        dbref.on('child_added', snap =>{
            manufacturers.push({
                id:snap.key,
                name:snap.val().name
            })
            this.setState({ carsRender:false,manufacturers })
        })
    }
    handleManufacturer = e =>{
        const dbref = firebase.database().ref().child(e.target.value);
        const models = []
        dbref.on('child_added', snap=>{
            models.push({
                id:snap.key,
                name:snap.val().name,
                imageURL:snap.val().imageURL
            })
            this.setState({ manufacturer:e.target.value,models })
        })
    }
    handleModel = e =>{
        const models = this.state.models
        for(var i=0;i<models.length;i++){
            if(models[i].name===e.target.value){
                this.setState({ model:e.target.value,imageURL:models[i].imageURL })
            }
        }
        const dbref = firebase.database().ref().child(e.target.value);
        const engineOptions = []
        dbref.on('child_added', snap=>{
            engineOptions.push({
                id:snap.key,
                name:snap.val().name
            })
            this.setState({ engineOptions })
        })
    }
    handleEngineOption = e =>{ this.setState({ engineOption:e.target.value })}
    handleAdd = () =>{
        if(this.state.manufacturer!=="" && this.state.model!=="" && this.state.engineOption!==""){
            const dbref = firebase.database().ref().child('Users');
            dbref.on('child_added', snap=>{
            if(snap.val().email===firebase.auth().currentUser.email){
                const dbref1 = firebase.database().ref().child('Users/'+snap.key+'/Cars');
                dbref1.push().set({ 
                    manufacturer:this.state.manufacturer,
                    model:this.state.model,
                    engineOption:this.state.engineOption,
                    imageURL:this.state.imageURL
                })
            }
        })
        this.setState({ carsRender:true })
        }else{
            this.setState({ errorOpen:true })
        }
    }
    handleBack = () =>{this.setState({ carsRender:true })}
    handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ errorOpen: false });
      };
    render(){
        const { classes } = this.props;
        return(
            <div className="AddCar">
            <MediaQuery minDeviceWidth={1280}>
            {this.state.carsRender
            ? <Button variant="flat" className={classes.button} onClick={this.addCar}>Add car</Button>
            : <div>
                <FormControl className={classes.formControl}>
                <InputLabel>Manufacturer</InputLabel>
                <Select value={this.state.manufacturer} onChange={this.handleManufacturer} className={classes.select}>
                <MenuItem value="none">None</MenuItem>
                {this.state.manufacturers.map(p=>
                <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>)}
                </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                <InputLabel>Model</InputLabel>
                <Select value={this.state.model} onChange={this.handleModel} className={classes.select}>
                <MenuItem value="none">None</MenuItem>
                {this.state.models.map(p=>
                <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>)}
                </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                <InputLabel>Engine Option</InputLabel>
                <Select value={this.state.engineOption} onChange={this.handleEngineOption} className={classes.select}>
                <MenuItem value="none">None</MenuItem>
                {this.state.engineOptions.map(p=>
                <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>)}
                </Select>
                </FormControl>
                <Grid container>
                <Grid item xs={12}>
                <Button variant="flat" className={classes.button} onClick={this.handleAdd}>Add</Button>
                <Button variant="flat" className={classes.button} onClick={this.handleBack}>Back</Button>
                </Grid>
                </Grid>
            </div>}
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}} open={this.state.errorOpen}
            autoHideDuration={3000} onClose={this.handleErrorClose}
            ContentProps={{ 'aria-describedby': 'message-id'}}
            message={<span id="message-id">Fill up all the fields</span>}
            action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleErrorClose}>
            <CloseIcon />
            </IconButton>]}/>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            {this.state.carsRender
            ? <Button variant="flat" className={classes.buttonPortrait} onClick={this.addCar}>Add car</Button>
            : <div>
                <FormControl className={classes.formControl}>
                <InputLabel>Manufacturer</InputLabel>
                <Select value={this.state.manufacturer} onChange={this.handleManufacturer} className={classes.selectPortrait}>
                <MenuItem value="none">None</MenuItem>
                {this.state.manufacturers.map(p=>
                <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>)}
                </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                <InputLabel>Model</InputLabel>
                <Select value={this.state.model} onChange={this.handleModel} className={classes.selectPortrait}>
                <MenuItem value="none">None</MenuItem>
                {this.state.models.map(p=>
                <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>)}
                </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                <InputLabel>Engine Option</InputLabel>
                <Select value={this.state.engineOption} onChange={this.handleEngineOption} className={classes.selectPortrait}>
                <MenuItem value="none">None</MenuItem>
                {this.state.engineOptions.map(p=>
                <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>)}
                </Select>
                </FormControl>
                <Grid container>
                <Grid item xs={12}>
                <Button variant="flat" className={classes.buttonPortrait} onClick={this.handleAdd}>Add</Button>
                <Button variant="flat" className={classes.buttonPortrait} onClick={this.handleBack}>Back</Button>
                </Grid>
                </Grid>
            </div>}
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}} open={this.state.errorOpen}
            autoHideDuration={3000} onClose={this.handleErrorClose}
            ContentProps={{ 'aria-describedby': 'message-id'}}
            message={<span id="message-id">Fill up all the fields</span>}
            action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={this.handleErrorClose}>
            <CloseIcon />
            </IconButton>]}/>
            </MediaQuery>
            </div>
        )
    }
}
AddCar.propTypes = {
    classes: propTypes.object.isRequired,
  };
export default withStyles(styles)(AddCar)
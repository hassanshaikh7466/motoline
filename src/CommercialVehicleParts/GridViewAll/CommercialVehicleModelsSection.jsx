import React,{Component} from 'react'
import firebase from 'firebase'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ModelsGrid from './ModelsGrid'
import {TextField,Button}  from '@material-ui/core';
import MediaQuery from 'react-responsive';
import Downshift from 'downshift'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import './GridViewAll.css'

const styles = theme => ({
    button: {
        fontFamily:'Rubik',
        fontSize:18,
        margin:theme.spacing.unit,
        backgroundColor:'#001a66',
        color:'#ffffff',
        '&:hover': {
          backgroundColor:'#ffff00',
          color:'#001a66'
      }
      },  
      buttonPortrait:{
        fontFamily:'Rubik',
        fontSize:15,
        margin:theme.spacing.unit,
        backgroundColor:'#001a66',
        color:'#ffffff',
        '&:hover': {
          backgroundColor:'#ffff00',
          color:'#001a66'
      }
      },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        backgroundColor:'#ffffff',
        padding:10,
        borderRadius:15,
      },
      textFieldPortrait: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
        backgroundColor:'#ffffff',
        padding:5,
        borderRadius:12,
      },
      progress:{
        color:'#ffff00'
    }
})

class CommercialVehicleModelsSection extends Component{
    constructor(props){
        super(props);
        this.manufacturer = propTypes.string;
        this.state = { models:[],isLoaded:false}
    }
    componentWillMount(){
        const dbref = firebase.database().ref().child(this.props.manufacturer);
        const models = []
        dbref.on('child_added', snap=>{
            models.push({
                id:snap.key,
                name:snap.val().name,
                imageURL:snap.val().imageURL
            })
            this.setState({ models,isLoaded:true })
        })
    }
    modelInput = (e1,e2) =>{ this.props.handleData(e1,e2)}
    manufacturerBack = () =>{ this.props.handleManufacturerBack()}
    render(){
        const { classes } = this.props;
        if(this.state.isLoaded){
        return(
            <div className={this.state.models.length>4 ? "CommercialVehicleModelsSection" :"CommercialVehicleModelsSectionLess"}>
            <MediaQuery minDeviceWidth={1280}>
            Models<br/>
            <div className="NavigateTo">
            Navigate to<Button variant="flat" className={classes.button} onClick={this.manufacturerBack}>Manufacturers</Button><br/></div>
            <Downshift onChange={selection => { this.props.handleData(selection.name)}} itemToString={item => (item ? item.name : '')}>
            {({getInputProps,isOpen,inputValue}) => (
            <div>
            <div className="Textfield">Search<br/><TextField className={classes.textField} {...getInputProps()} margin="normal"/></div>
            <Grid container>
            {isOpen
            ? this.state.models
            .filter(item => !inputValue || item.name.trim().toLowerCase().includes(inputValue) || item.name.includes(inputValue) )
            .map((item) => (
            <Grid item xs={3} key={item.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <ModelsGrid details={item} handleData={this.modelInput}/>
            </Slide>
            </Grid>))
            : <Grid container>
            {this.state.models.map(p=>
            <Grid item xs={3} key={p.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <ModelsGrid details={p} handleData={this.modelInput}/>
            </Slide>
            </Grid>)}
            </Grid>}
            </Grid>
            </div>)}
            </Downshift>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <h4>Models</h4>
            <div className="NavigateToPortrait">
            Navigate to<Button variant="flat" className={classes.buttonPortrait} onClick={this.manufacturerBack}>Manufacturers</Button><br/></div>
            <Downshift onChange={selection => { this.props.handleData(selection.name)}} itemToString={item => (item ? item.name : '')}>
            {({getInputProps,isOpen,inputValue}) => (
            <div>
            <div className="TextfieldPortrait">Search<br/><TextField className={classes.textFieldPortrait} {...getInputProps()} margin="normal"/></div>
            <Grid container>
            {isOpen
            ? this.state.models
            .filter(item => !inputValue || item.name.trim().toLowerCase().includes(inputValue) || item.name.includes(inputValue) )
            .map((item) => (
            <Grid item xs={6} key={item.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <ModelsGrid details={item} handleData={this.modelInput}/>
            </Slide>
            </Grid>))
            : <Grid container>
            {this.state.models.map(p=>
            <Grid item xs={6} key={p.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <ModelsGrid details={p} handleData={this.modelInput}/>
            </Slide>
            </Grid>)}
            </Grid>}
            </Grid>
            </div>)}
            </Downshift>
            </MediaQuery>
            </div>
        )
    }else{
        return(
            <div className="NotLoaded">
        <CircularProgress className={classes.progress}/>
        </div>
        )
    }
    }
}
CommercialVehicleModelsSection.propTypes = {
    classes: propTypes.object.isRequired,
  };
export default withStyles(styles)(CommercialVehicleModelsSection)
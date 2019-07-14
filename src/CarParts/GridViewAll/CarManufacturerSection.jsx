import React,{Component} from 'react'
import firebase from 'firebase'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import ManufacturerGrid from './ManufacturerGrid'
import TextField  from '@material-ui/core/TextField';
import MediaQuery from 'react-responsive';
import Downshift from 'downshift'
import Grid from '@material-ui/core/Grid'
import './GridViewAll.css'
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
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

class CarManufacturerSection extends Component{
    constructor(props){
        super(props);
        this.state = { manufacturers:[],isLoaded:false}
    }
    componentWillMount(){
        const dbref = firebase.database().ref().child('Cars')
        const manufacturers = []
        dbref.on('child_added', snap =>{
            manufacturers.push({
                id:snap.key,
                name:snap.val().name,
                imageURL:snap.val().imageURL
            })
            this.setState({manufacturers,isLoaded:true})
        })
    }
    manufacturerInput = e =>{ this.props.handleData(e)}
    render(){
        const { classes } = this.props;
        if(this.state.isLoaded){
            return(
                <div className={this.state.manufacturers.length<=4 ? "CarManufacturersSectionLess" :"CarManufacturersSection"}>
                <MediaQuery minDeviceWidth={1280}>
                <h2>Manufacturers</h2>
                <Downshift onChange={selection => {this.props.handleData(selection.name)}} itemToString={item => (item ? item.name : '')}>
                {({getInputProps,isOpen,inputValue}) => (
                <div>
                <div className="Textfield">Search:<br/><TextField className={classes.textField} {...getInputProps()} margin="normal"/></div>
                <Grid container>
                {isOpen
                ? this.state.manufacturers
                .filter(item => !inputValue || item.name.trim().toLowerCase().includes(inputValue) || item.name.includes(inputValue) )
                .map((item) => (
                <Grid item xs={2} key={item.id}>
                <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
                <ManufacturerGrid details={item} handleData={this.manufacturerInput}/>
                </Slide>
                </Grid>))
                : <Grid container>
                {this.state.manufacturers.map(p=>
                <Grid item xs={2} key={p.id}>
                <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
                <ManufacturerGrid  details={p} handleData={this.manufacturerInput}/>
                </Slide>
                </Grid>)}
                </Grid>}
                </Grid>
                </div>)}
                </Downshift>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1280}>
                <h4>Manufacturers</h4>
                <Downshift onChange={selection => {this.props.handleData(selection.name)}} itemToString={item => (item ? item.name : '')}>
                {({getInputProps,isOpen,inputValue}) => (
                <div>
                <div className="TextfieldPortrait">
                Search:<br/><TextField className={classes.textFieldPortrait} {...getInputProps()} />
                </div>
                <Grid container>
                {isOpen
                ? this.state.manufacturers
                .filter(item => !inputValue || item.name.trim().toLowerCase().includes(inputValue) || item.name.includes(inputValue) )
                .map((item) => (
                <Grid item xs={6} key={item.id}>
                <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
                <ManufacturerGrid  details={item} handleData={this.manufacturerInput}/>
                </Slide>
                </Grid>))
                : <Grid container>
                {this.state.manufacturers.map(p=>
                <Grid item xs={6} key={p.id}>
                <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
                <ManufacturerGrid details={p} handleData={this.manufacturerInput}/>
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
CarManufacturerSection.propTypes = {
    classes: propTypes.object.isRequired,
  };
  
export default withStyles(styles)(CarManufacturerSection)
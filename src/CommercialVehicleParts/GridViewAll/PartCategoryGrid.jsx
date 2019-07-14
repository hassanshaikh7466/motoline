import React,{Component} from 'react'
import propTypes from 'prop-types'
import PartsView from './PartsView';
import firebase from 'firebase'
import Grid from '@material-ui/core/Grid'
import TextField  from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MediaQuery from 'react-responsive'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide'
import Downshift from 'downshift'
import './GridViewAll.css'

const styles = theme => ({
    root: {
        width: '100%',
        padding:10,
      },
      heading: {
        fontSize: 30,
        fontFamily:'Rubik',
        color:'#ffffff'
      },
      headingPortrait:{
          fontSize: 22,
          fontFamily:'Rubik',
          color:'#ffffff'
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
  });

class PartCategoryGrid extends Component{
    constructor(props){
        super(props);
        this.manufacturer = propTypes.string;
        this.model = propTypes.string;
        this.engineOption = propTypes.string;
        this.partCategory = propTypes.string
        this.state = {parts:[],isLoaded:false}
    }
    componentWillMount(){
        const dbref = firebase.database().ref().child('CommercialVehicleParts/'+this.props.partCategory);
        const parts = [];
        const filteredParts = []
        dbref.on('child_added', snap =>{
            parts.push({
                id:snap.key,
                name:snap.val().name,
                description:snap.val().description,
                company:snap.val().company,
                mrp:snap.val().mrp,
                delivery:snap.val().delivery,
                compatibleWith:snap.val().compatibleWith,
                imageURL: snap.val().imageURL,
                qty:snap.val().qty
            })
            for(var i=0;i<parts.length;i++){
                const compatibleWith = parts[i].compatibleWith;
                for(var j=0;j<compatibleWith.length;j++){
                    if(compatibleWith[j].manufacturer===this.props.manufacturer){
                        if(compatibleWith[j].model===this.props.model){
                            if(compatibleWith[j].engineOption===this.props.engineOption){
                                filteredParts.push(parts[i]);
                            }
                        }
                    }
                }
            }
            for(var r=0;r<filteredParts.length;r++){
                for(var s=r+1;s<filteredParts.length;s++){
                    if(filteredParts[r]===filteredParts[s]){
                        filteredParts.splice(s,1)
                    }
                }
            }
            this.setState({ parts:filteredParts,isLoaded:true})
        })
    }
    render(){
        const { classes } = this.props;
        if(this.state.isLoaded){
        return(
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="CommercialVehiclePartCategories">
            {this.state.parts.length!==0
            ? <div className={classes.root}>
            <Typography className={classes.heading}>{this.props.partCategory}</Typography>
            <Downshift itemToString={item => (item ? item.name : '')}>
            {({getInputProps,isOpen,inputValue}) => (
            <div>
            <div className="Textfield">Search:<br/><TextField className={classes.textField} {...getInputProps()} margin="normal"/></div>
            <Grid container>
            {isOpen
            ? this.state.parts
            .filter(item => !inputValue || item.name.trim().toLowerCase().includes(inputValue) || item.name.includes(inputValue) )
            .map((item) => (
            <Grid item xs={3} key={item.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <PartsView 
            manufacturer={this.props.manufacturer} 
            model={this.props.model} 
            engineOption={this.props.engineOption} 
            partCategory={this.props.partCategory}
            partDetails={item}/>
            </Slide>
            </Grid>))
            : <Grid container>
            {this.state.parts.map(p=>
            <Grid item xs={3} key={p.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <PartsView 
            manufacturer={this.props.manufacturer} 
            model={this.props.model} 
            engineOption={this.props.engineOption} 
            partCategory={this.props.partCategory}
            partDetails={p}/>
            </Slide>
            </Grid>)}
            </Grid>}
            </Grid>
            </div>)}
            </Downshift>
            </div>
            : <div className="NoItems">No items to display</div>}
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="CommercialVehiclePartCategoriesPortrait">
            {this.state.parts.length!==0
            ? <div className={classes.root}>
            <Typography className={classes.headingPortrait}>{this.props.partCategory}</Typography>
            <Downshift itemToString={item => (item ? item.name : '')}>
            {({getInputProps,isOpen,inputValue}) => (
            <div>
            <div className="TextfieldPortrait">Search:<br/><TextField className={classes.textFieldPortrait} {...getInputProps()} margin="normal"/></div>
            <Grid container>
            {isOpen
            ? this.state.parts
            .filter(item => !inputValue || item.name.trim().toLowerCase().includes(inputValue) || item.name.includes(inputValue) )
            .map((item) => (
            <Grid item xs={12} key={item.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <PartsView 
            manufacturer={this.props.manufacturer} 
            model={this.props.model} 
            engineOption={this.props.engineOption} 
            partCategory={this.props.partCategory}
            partDetails={item}/>
            </Slide>
            </Grid>))
            : <Grid container>
            {this.state.parts.map(p=>
            <Grid item xs={12} key={p.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <PartsView 
            manufacturer={this.props.manufacturer} 
            model={this.props.model} 
            engineOption={this.props.engineOption} 
            partCategory={this.props.partCategory}
            partDetails={p}/>
            </Slide>
            </Grid>)}
            </Grid>}
            </Grid>
            </div>)}
            </Downshift>
            </div>
            : <div className="NoItems">No items to display</div>}
            </div>
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
PartCategoryGrid.propTypes = {
    classes: propTypes.object.isRequired,
  };
  
export default withStyles(styles)(PartCategoryGrid)
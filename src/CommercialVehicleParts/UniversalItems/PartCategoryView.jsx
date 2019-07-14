import React,{Component} from 'react'
import firebase from 'firebase'
import propTypes from 'prop-types'
import DetailedItem from './DetailedItem';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import MediaQuery from 'react-responsive'
import Downshift from 'downshift'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide'
import './UniversalItems.css'

const styles = theme => ({
    root: {
        width: '100%',
        padding:10,
      },
      heading: {
        fontSize: 30,
        fontFamily:'Rubik',
        color:'#ffffff',
        textAlign:'center'
      },
      headingPortrait:{
          fontSize: 22,
          fontFamily:'Rubik',
          color:'#ffffff',
          textAlign:'center'
      },
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
  });

class PartCategoryView extends Component{
    constructor(props){
        super(props);
        this.partCategory = propTypes.string
        this.state = { universalParts:[],isLoaded:false}
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
                    if(compatibleWith[j].type==="Universal"){
                        filteredParts.push(parts[i]);
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
            this.setState({ universalParts:filteredParts,isLoaded:true })
        })
    }
    handleBack = () =>{ this.props.handleBack()}
    render(){
        const { classes } = this.props;
        if(this.state.isLoaded){
        return(
            <div className="UniversalItemsPartCategory">
            <MediaQuery minDeviceWidth={1280}>
            <div className="Textfield">
            Navigate to <Button variant="flat" className={classes.button} onClick={this.handleBack}>Part Categories</Button>
            </div>
            <Typography className={classes.heading}>{this.props.partCategory}</Typography>
            {this.state.universalParts.length!==0
            ? <div className={classes.root}>
            <Downshift itemToString={item => (item ? item.name : '')}>
            {({getInputProps,isOpen,inputValue}) => (
            <div>
            <div className="Textfield">Search:<br/><TextField className={classes.textField} {...getInputProps()} margin="normal"/></div>
            <Grid container>
            {isOpen
            ? this.state.universalParts
            .filter(item => !inputValue || item.name.trim().toLowerCase().includes(inputValue) || item.name.includes(inputValue) )
            .map((item) => (
            <Grid item xs={3} key={item.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <DetailedItem  details={item} partCategory={this.props.partCategory}/>
            </Slide>
            </Grid>))
            : <Grid container>
            {this.state.universalParts.map(p=>
            <Grid item xs={3} key={p.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <DetailedItem  details={p} partCategory={this.props.partCategory}/>
            </Slide>
            </Grid>)}
            </Grid>}
            </Grid>
            </div>)}
            </Downshift>
            </div>
            : <div className="NoItems">No items to display</div>}
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="TextfieldPortrait">
            Navigate to <Button variant="flat" className={classes.button} onClick={this.handleBack}>Part Categories</Button>
            </div>
            <Typography className={classes.heading}>{this.props.partCategory}</Typography>
            {this.state.universalParts.length!==0
            ? <div className={classes.root}>
            <Downshift itemToString={item => (item ? item.name : '')}>
            {({getInputProps,isOpen,inputValue}) => (
            <div>
            <div className="TextfieldPortrait">Search:<br/><TextField className={classes.textField} {...getInputProps()} margin="normal"/></div>
            <Grid container>
            {isOpen
            ? this.state.universalParts
            .filter(item => !inputValue || item.name.trim().toLowerCase().includes(inputValue) || item.name.includes(inputValue) )
            .map((item) => (
            <Grid item xs={12} key={item.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <DetailedItem  details={item} partCategory={this.props.partCategory}/>
            </Slide>
            </Grid>))
            : <Grid container>
            {this.state.universalParts.map(p=>
            <Grid item xs={12} key={p.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <DetailedItem  details={p} partCategory={this.props.partCategory}/>
            </Slide>
            </Grid>)}
            </Grid>}
            </Grid>
            </div>)}
            </Downshift>
            </div>
            : <div className="NoItems">No items to display</div>}
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
PartCategoryView.propTypes = {
    classes: propTypes.object.isRequired,
  };
  
export default withStyles(styles)(PartCategoryView)
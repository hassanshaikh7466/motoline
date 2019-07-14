import React,{Component} from 'react'
import firebase from 'firebase'
import { Grid,Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DetailedPartCategory from './DetailedPartCategory';
import CircularProgress from '@material-ui/core/CircularProgress';
import MediaQuery from 'react-responsive'
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
      buttonPortrait: {
        fontFamily:'Rubik',
        margin:theme.spacing.unit,
        fontSize:14,
        backgroundColor:'#001a66',
        color:'#ffffff',
        '&:hover': {
          backgroundColor:'#ffff00',
          color:'#001a66'
      }
      },
      progress:{
        color:'#ffff00'
    }
})

class PartCategories extends Component{
    constructor(props){
        super(props)
        this.state = {partCategories:[],isLoaded:false}
    }
    componentWillMount(){
        const dbref = firebase.database().ref().child('CommercialVehiclePartCategories')
        const partCategories = [];
        dbref.on('child_added', snap =>{
            partCategories.push({
                id:snap.key,
                name:snap.val().name
            })
            this.setState({partCategories,isLoaded:true})
        })
    }
    handlePartCategory = e =>{ this.props.handleData(e)}
    manufacturerBack = () =>{ this.props.handleManufacturerBack()}
    modelBack = () =>{ this.props.handleModelBack()}
    render(){
        const { classes } = this.props; 
        if(this.state.isLoaded){
        return(
            <div className="PartCategories">
                <MediaQuery minDeviceWidth={1280}>
                <h3>Part Categories</h3>
                <Grid container>
                <Grid item xs={12}>
                <div className="NavigateTo">
                Navigate to
                <Button variant="flat" className={classes.button} onClick={this.manufacturerBack}>Manufacturers</Button>
                <Button variant="flat" className={classes.button} onClick={this.modelBack}>Models</Button>
                </div>
                </Grid>
                <Grid item xs={12}>
                <Grid container>
                    {this.state.partCategories.map(p=>
                    <Grid key={p.id} item xs={3}>
                    <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
                        <DetailedPartCategory key={p.id} name={p.name} handleData={this.handlePartCategory}/>
                        </Slide>
                        </Grid>)}
                </Grid>
                </Grid>
                </Grid>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1280}>
                <h4>Part Categories</h4>
                <Grid container>
                <Grid item xs={12}>
                <div className="NavigateToPortrait">
                Navigate to 
                <Button variant="flat" className={classes.buttonPortrait} onClick={this.manufacturerBack}>Manufacturers</Button>
                <Button variant="flat" className={classes.buttonPortrait} onClick={this.modelBack}>Models</Button>
                </div>
                </Grid>
                <Grid item xs={12}>
                <Grid container>
                    {this.state.partCategories.map(p=>
                    <Grid key={p.id} item xs={6}>
                    <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
                        <DetailedPartCategory key={p.id} name={p.name} handleData={this.handlePartCategory}/>
                        </Slide>
                        </Grid>)}
                </Grid>
                </Grid>
                </Grid>
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
export default withStyles(styles)(PartCategories) 
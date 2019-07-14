import React,{Component} from 'react'
import firebase from 'firebase'
import PartCategoryView from './PartCategoryView';
import Grid from '@material-ui/core/Grid'
import './UniversalItems.css'
import PartCategories from './PartCategories';
import MediaQuery from 'react-responsive'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import propTypes from 'prop-types'
import Slide from '@material-ui/core/Slide'

const styles ={
    progress:{
        color:'#ffff00'
    }
}
class UniversalItems extends Component{
    constructor(props){
        super(props);
        this.state = { 
            partCategoriesRender:true,partsRender:false,
            partCategory:'',partCategories:[],isLoaded:false}
    }
    componentWillMount(){
        const dbref = firebase.database().ref().child('PartCategories');
        const partCategories = []
        dbref.on('child_added', snap=>{
            partCategories.push({
                id:snap.key,
                name:snap.val().name
            })
            this.setState({ partCategories,isLoaded:true })
        })
    }
    handlePartCategory = e =>{
        this.setState({ 
            partCategory:e,
            partsRender:true,
            partCategoriesRender:false
        })
    }
    handleBack = () =>{
        this.setState({ 
            partsRender:false,
            partCategoriesRender:true,
            partCategory:''
        })
    }
    render(){
        const { classes } = this.props;
        if(this.state.isLoaded){
        return(
            <div className="CarUniversalItems">
            <MediaQuery minDeviceWidth={1280}>
            <h2>Universal Items</h2>
            {this.state.partCategoriesRender
            ? <div className="PartCategories">
                <h3>Part Categories</h3>
                <Grid container>
                {this.state.partCategories.map(p=>
                <Grid item xs={3} key={p.id}>
                <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
                <PartCategories name={p.name} handleData={this.handlePartCategory}/>
                </Slide>
                </Grid>)}
                </Grid>
            </div>
            : null}
            {this.state.partsRender
            ? <PartCategoryView partCategory={this.state.partCategory} handleBack={this.handleBack}/>
            : null}
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <h4>Universal Items</h4>
            {this.state.partCategoriesRender
            ? <div className="PartCategories">
                <h5>Part Categories</h5>
                <Grid container>
                {this.state.partCategories.map(p=>
                <Grid item xs={6} key={p.id}>
                <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
                <PartCategories name={p.name} handleData={this.handlePartCategory}/>
                </Slide>
                </Grid>)}
                </Grid>
            </div>
            : null}
            {this.state.partsRender
            ? <PartCategoryView partCategory={this.state.partCategory} handleBack={this.handleBack}/>
            : null}
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
UniversalItems.propTypes = {
    classes: propTypes.object.isRequired,
  };
export default withStyles(styles)(UniversalItems)
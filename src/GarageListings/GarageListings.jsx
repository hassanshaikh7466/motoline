import React,{Component} from 'react'
import firebase from 'firebase'
import DetailedListing from './DetailedListing';
import propTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';
import Downshift from 'downshift'
import TextField  from '@material-ui/core/TextField';
import './GarageListings.css'
import MediaQuery from 'react-responsive'

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
    }
})

class GarageListings extends Component{
    constructor(props){
        super(props);
        this.state = { garageListings:[]}
    }
    componentWillMount(){
        const dbref = firebase.database().ref().child('GarageListings')
        const garageListings = []
        dbref.on('child_added', snap=>{
            garageListings.push({
                id:snap.key,
                name:snap.val().name,
                mechanic:snap.val().mechanic,
                address:snap.val().address,
                city:snap.val().city,
                phoneNo:snap.val().phoneNo,
                type:snap.val().type,
                imageURL:snap.val().imageURL
            })
            this.setState({ garageListings })
        })
    }
    render(){
        const { classes } = this.props;
        return(
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="GarageListings">
            <div className="GarageListingsHeading">
            Garage Listings
            </div>
            <Downshift onChange={selection => {this.props.handleData(selection.city)}} itemToString={item => (item ? item.city : '')}>
            {({getInputProps,isOpen,inputValue}) => (
            <div>
            <div className="Textfield">Search by city:<br/><TextField className={classes.textField} {...getInputProps()} margin="normal"/></div>
            {isOpen
            ? <div className={this.state.garageListings.length>3 ? "Listings" :"ListingsLess"}>
            {this.state.garageListings
            .filter(item => !inputValue || item.city.trim().toLowerCase().includes(inputValue) || item.city.includes(inputValue) )
            .map((item) => (
            <Grid item xs={12} key={item.id}>
            <DetailedListing details={item}/>
            </Grid>))}
            </div>
            : <Grid container>
            <div className={this.state.garageListings.length>3 ? "Listings" :"ListingsLess"}>
            {this.state.garageListings.map(p=>
            <Grid item xs={12} key={p.id}>
            <DetailedListing details={p}/>
            </Grid>)}
            </div>
            </Grid>}
            </div>)}
            </Downshift>
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="GarageListingsPortrait">
            <div className="GarageListingsHeadingPortrait">
            Garage Listings
            </div>
            <Downshift onChange={selection => {this.props.handleData(selection.city)}} itemToString={item => (item ? item.city : '')}>
            {({getInputProps,isOpen,inputValue}) => (
            <div>
            <div className="TextfieldPortrait">Search by city:<br/><TextField className={classes.textFieldPortrait} {...getInputProps()} margin="normal"/></div>
            {isOpen
            ? <div className={this.state.garageListings.length>3 ? "ListingsPortrait" :"ListingsPortraitLess"}>
            {this.state.garageListings
            .filter(item => !inputValue || item.city.trim().toLowerCase().includes(inputValue) || item.city.includes(inputValue) )
            .map((item) => (
            <Grid item xs={12} key={item.id}>
            <DetailedListing details={item}/>
            </Grid>))}
            </div>
            : <Grid container>
            <div className={this.state.garageListings.length>3 ? "Listings" :"ListingsLess"}>
            {this.state.garageListings.map(p=>
            <Grid item xs={12} key={p.id}>
            <DetailedListing details={p}/>
            </Grid>)}
            </div>
            </Grid>}
            </div>)}
            </Downshift>
            </div>
            </MediaQuery>
            </div>
        )
    }
}
GarageListings.propTypes = {
    classes: propTypes.object.isRequired,
  };
  
export default withStyles(styles)(GarageListings)
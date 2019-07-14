import React,{Component} from 'react'
import firebase from 'firebase'
import Grid from '@material-ui/core/Grid'
import CarDetails from './CarDetails';
import { Divider, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types'
import './YourCars.css'
import AddCar from './AddCar';
import MediaQuery from 'react-responsive'

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
    formControl: {
        margin: theme.spacing.unit
      },
      select:{
          width:200
      },
      card:{
          width:600,
          height:'100%',
          textAlign:'center'
      },
      cardPortrait:{
        width:'100%',
        height:'100%'
      }
})

class YourCars extends Component{
    constructor(props){
        super(props);
        this.state = {cars:[]}
    }
    componentWillMount(){
        const dbref = firebase.database().ref().child('Users');
        dbref.on('child_added', snap=>{
            if(snap.val().email===firebase.auth().currentUser.email){
                const dbref1 = firebase.database().ref().child('Users/'+snap.key+'/Cars');
                const cars = [];
                dbref1.on('child_added', snap=>{
                    cars.push({
                        id:snap.key,
                        manufacturer:snap.val().manufacturer,
                        model:snap.val().model,
                        engineOption:snap.val().engineOption,
                        imageURL:snap.val().imageURL
                    })
                    this.setState({ cars })
                })
                dbref1.on('child_removed', snap=>{
                    for(var i=0;i<cars.length;i++){
                        if(snap.key===cars[i].id){
                            cars.splice(i,1)
                        }
                    }
                    this.setState({ cars })
                })
            }
        })
    }
    
    render(){
        const { classes } = this.props;
        return(
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="YourCarsProfile">
            {this.state.cars.length===0
            ? <div className="NoCarsAdded">
            <Card className={classes.card}>
            Your cars
            <Divider/>
            <div className="NoCarsCaption">No Cars Added</div>
            <AddCar/>
            </Card>
            </div>
            : <div className="YourCarsAdded">
            <Card className={classes.card}>
            Your cars
            <Divider/>
            <Grid container>
            {this.state.cars.map(p=>
            <Grid item xs={6} key={p.id}>
            <CarDetails details={p}/>
            </Grid>)}
            <AddCar/>
            </Grid>
            </Card>
            </div>} 
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="YourCarsPortrait">
            {this.state.cars.length===0
            ? <div className="NoCarsAddedPortrait">
            <Card className={classes.cardPortrait}>
            Your cars
            <Divider/>
            <div className="NoCarsCaptionPortrait">No Cars Added</div>
            <AddCar/>
            </Card>
            </div>
            : <div className="YourCarsAddedPortrait">
            <Card className={classes.cardPortrait}>
            Your cars
            <Divider/>
            <Grid container>
            {this.state.cars.map(p=>
            <Grid item xs={12} key={p.id}>
            <CarDetails details={p}/>
            </Grid>)}
            <AddCar/>
            </Grid>
            </Card>
            </div>} 
            </div>
            </MediaQuery>
            </div>
        )
    }
}
YourCars.propTypes = {
    classes: propTypes.object.isRequired,
  };
export default withStyles(styles)(YourCars)
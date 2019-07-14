import React from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import MediaQuery from 'react-responsive';
import './GridViewAll.css'

const styles = theme => ({
    button:{
      fontFamily:'Rubik',
      color:'#ffffff',
      backgroundColor:'#001a66',
      margin:theme.spacing.unit,
      height:150,
      width:350,
      fontSize:15,
      borderRadius:10,
      '&:hover': {
          backgroundColor:'#ffff00',
          color:'#001a66',
      }
    },
    buttonPortrait:{
      fontFamily:'Rubik',
      color:'#ffffff',
      backgroundColor:'#001a66',
      margin:theme.spacing.unit,
      height:110,
      width:320,
      fontSize:12,
      borderRadius:7,
      '&:hover': {
          backgroundColor:'#ffff00',
          color:'#001a66',
      }
    }
  });

function YourCars(props){
    function handleClick(){ props.handleData(props.details.id)}
      const { classes } = props;
        return(
            <div className="YourCars">
              <MediaQuery minDeviceWidth={1280}>
            <Button className={classes.button} onClick={handleClick}>
              <img src={props.details.imageURL} height="120px" width="200px" alt={props.details.id}/>
              {props.details.manufacturer} {props.details.model} {props.details.engineOption}
            </Button>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <Button className={classes.buttonPortrait} onClick={handleClick}>
              <img src={props.details.imageURL} height="90px" width="160px" alt={props.details.id}/><br/>
              {props.details.manufacturer} {props.details.model} {props.details.engineOption}
            </Button>
            </MediaQuery>
            </div>
        )
}
YourCars.propTypes = {
  classes: propTypes.object.isRequired,
  details: propTypes.array
};
export default withStyles(styles)(YourCars);
import React from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './GridViewAll.css'
import MediaQuery from 'react-responsive';

const styles = theme => ({
  button:{
    backgroundColor:'#ffffff',
    margin:theme.spacing.unit,
    height:220,
    width:220,
    borderRadius:110,
    '&:hover': {
        backgroundColor:'#ffff00'
    }
  },
  portraitButton:{
    backgroundColor:'#ffffff',
    margin:theme.spacing.unit,
    height:160,
    width:160,
    borderRadius:80,
    '&:hover': {
        backgroundColor:'#ffff00'
    }
  }
});

function ManufacturerGrid(props){
    function handleClick(){ props.handleData(props.details.name)}
      const { classes } = props;
        return(
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="CarManufacturers">  
            <Button className={classes.button} onClick={handleClick}><img src={props.details.imageURL} height="90px" width="180px" alt={props.details.name}/></Button><br/>
            {props.details.name}
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="CarManufacturersPortrait">
            <Button className={classes.portraitButton} onClick={handleClick}><img src={props.details.imageURL} height="60px" width="120px" alt={props.details.name}/></Button><br/>
            {props.details.name}
            </div>
            </MediaQuery>
            </div>
        )
}
ManufacturerGrid.propTypes = {
  classes: propTypes.object.isRequired,
  details: propTypes.array
};
export default withStyles(styles)(ManufacturerGrid);
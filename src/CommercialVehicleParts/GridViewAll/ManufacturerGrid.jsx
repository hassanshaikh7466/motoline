import React from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import MediaQuery from 'react-responsive'
import Button from '@material-ui/core/Button'
import './GridViewAll.css'

const styles = theme => ({
  button:{
    backgroundColor:'#ffffff',
    margin:theme.spacing.unit,
    height:250,
    width:250,
    borderRadius:125,
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
    const { classes } = props
    return(
    <div>
    <MediaQuery minDeviceWidth={1280}>
    <div className="CommercialVehicleManufacturers">
    <Button className={classes.button} onClick={handleClick}><img src={props.details.imageURL} height="90px" width="180px" alt={props.details.name}/></Button><br/>
    {props.details.name}
    </div>
    </MediaQuery>
    <MediaQuery maxDeviceWidth={1280}>
    <div className="CommercialVehicleManufacturersPortrait">
    <Button className={classes.portraitButton} onClick={handleClick}><img src={props.details.imageURL} height="70px" width="140px" alt={props.details.name}/></Button><br/>
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
import React from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import MediaQuery from 'react-responsive';
import './GridViewAll.css'

const styles = theme => ({
  button:{
    backgroundColor:'#001a66',
    fontFamily:'Rubik',
    color:'#ffffff',
    fontSize:18,
    margin:theme.spacing.unit,
    height:70,
    width:180,
    borderRadius:18,
    '&:hover': {
        backgroundColor:'#ffff00',
        color:'#001a66'
    }
  },
  buttonPortrait:{
    backgroundColor:'#001a66',
    fontFamily:'Rubik',
    color:'#ffffff',
    fontSize:12,
    margin:theme.spacing.unit,
    height:55,
    width:100,
    borderRadius:10,
    '&:hover': {
        backgroundColor:'#ffff00',
        color:'#001a66'
    }
  }
});


function EngineOptionsGrid(props){
  function handleClick(){ props.handleData(props.name)}
      const { classes } = props
        return(
            <div className="CarEngineOptions">
              <MediaQuery minDeviceWidth={1280}>
              <Button className={classes.button} onClick={handleClick}>{props.name}</Button><br/>
              </MediaQuery>
              <MediaQuery maxDeviceWidth={1280}>
              <Button className={classes.buttonPortrait} onClick={handleClick}>{props.name}</Button><br/>
              </MediaQuery>
            </div>
        )
}
EngineOptionsGrid.propTypes = {
    classes: propTypes.object.isRequired,
    name: propTypes.string
}

export default withStyles(styles)(EngineOptionsGrid);
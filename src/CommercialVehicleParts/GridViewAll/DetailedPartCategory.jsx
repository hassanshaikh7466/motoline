import React from 'react'
import propTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import MediaQuery from 'react-responsive'
import './GridViewAll.css'

const styles = theme => ({
    button:{
      backgroundColor:'#001a66',
      fontFamily:'Rubik',
      color:'#ffffff',
      fontSize:25,
      margin:theme.spacing.unit,
      height:100,
      width:250,
      borderRadius:20,
      '&:hover': {
          backgroundColor:'#ffff00',
          color:'#001a66'
      }
    },
    buttonPortrait:{
        backgroundColor:'#001a66',
        fontFamily:'Rubik',
        color:'#ffffff',
        fontSize:18,
        margin:theme.spacing.unit,
        height:70,
        width:180,
        borderRadius:15,
        '&:hover': {
            backgroundColor:'#ffff00',
            color:'#001a66'
        }
      }
})
function DetailedPartCategory(props){
    function handleClick(){ props.handleData(props.name)}
    const { classes } = props
    return(
        <div className="DetailedPartCategory">
            <MediaQuery minDeviceWidth={1280}>
            <Button className={classes.button} onClick={handleClick}>{props.name}</Button><br/>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <Button className={classes.buttonPortrait} onClick={handleClick}>{props.name}</Button><br/>
            </MediaQuery>
            
        </div>
    )
}
DetailedPartCategory.propTypes = {
    classes: propTypes.object.isRequired,
    name: propTypes.string
}
export default withStyles(styles)(DetailedPartCategory) 
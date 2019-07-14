import React from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import MediaQuery from 'react-responsive'
import Button from '@material-ui/core/Button'
import './UniversalItems.css'

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

function PartCategories(props){
    function handlePartCategory(){ props.handleData(props.name)}
        const { classes } = props
        return(
            <div className="UniversalItemsPartCategories">
            <MediaQuery minDeviceWidth={1280}>
            <Button className={classes.button} onClick={handlePartCategory}>{props.name}</Button><br/>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <Button className={classes.buttonPortrait} onClick={handlePartCategory}>{props.name}</Button><br/>
            </MediaQuery> 
            </div>
        )
}
PartCategories.propTypes = {
    name:propTypes.string
}
export default withStyles(styles)(PartCategories) 
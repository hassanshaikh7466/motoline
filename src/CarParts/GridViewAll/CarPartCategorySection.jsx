import React from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import PartCategoryGrid from './PartCategoryGrid'
import {Button}  from '@material-ui/core';
import MediaQuery from 'react-responsive';
import Grid from '@material-ui/core/Grid'
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
      }
})

function CarPartCategorySection(props){
    function manufacturerBack(){ props.handleManufacturerBack()}
    function modelBack(){ props.handleModelBack()}
    function engineOptionBack(){ props.handleEngineOptionBack()}
    function yourCarsBack(){ props.handleYourCarsBack()}
        const { classes } = props
        return(
            <div className="CarPartCategorySection">
                <MediaQuery minDeviceWidth={1280}>
                {props.manufacturer} {props.model} {props.engineOption}<br/>
                <Grid container>
                <Grid item xs={12}>
                <div className="NavigateTo">
                Navigate to
                <Button variant="flat" className={classes.button} onClick={manufacturerBack}>Manufacturers</Button>
                <Button variant="flat" className={classes.button} onClick={modelBack}>Models</Button>
                <Button variant="flat" className={classes.button} onClick={engineOptionBack}>Part Categories</Button>
                <Button variant="flat" className={classes.button} onClick={yourCarsBack}>Your Cars</Button><br/>
                </div>
                </Grid>
                <Grid item xs={12}>
                <PartCategoryGrid 
                manufacturer={props.manufacturer}
                model={props.model}
                engineOption={props.engineOption}
                partCategory={props.partCategory}/>
                </Grid>
                </Grid>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1280}>
                <h5>{props.manufacturer} {props.model}<br/>{props.engineOption}</h5>
                <Grid container>
                <Grid item xs={12}>
                <div className="NavigateToPortrait">
                Navigate to
                <Button variant="flat" className={classes.buttonPortrait} onClick={manufacturerBack}>Manufacturers</Button>
                <Button variant="flat" className={classes.buttonPortrait} onClick={modelBack}>Models</Button>
                <Button variant="flat" className={classes.buttonPortrait} onClick={engineOptionBack}>Part Categories</Button>
                <Button variant="flat" className={classes.buttonPortrait} onClick={yourCarsBack}>Your Cars</Button><br/>
                </div>
                </Grid>
                <Grid item xs={12}>
                <PartCategoryGrid 
                manufacturer={props.manufacturer}
                model={props.model}
                engineOption={props.engineOption}
                partCategory={props.partCategory}/>
                </Grid>
                </Grid>
                </MediaQuery>
            </div>
        )
}
CarPartCategorySection.propTypes = {
    classes: propTypes.object.isRequired,
    manufacturer: propTypes.string,
    model: propTypes.string,
    engineOption:propTypes.string,
    partCategory:propTypes.string
  };
  
export default withStyles(styles)(CarPartCategorySection)
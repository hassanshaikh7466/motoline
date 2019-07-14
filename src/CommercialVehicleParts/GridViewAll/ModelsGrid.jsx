import React from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import './GridViewAll.css'
import MediaQuery from 'react-responsive';
import CommercialVehicleEngineOptionsSection from './CommercialVehicleEngineOptionsSection';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  heading:{
    fontFamily:'Rubik',
  },
  panelSummary:{
    width:'100%',
  },
  panelSummaryPortrait:{
    width:'100%',
  }
  });

function ModelsGrid(props){ 
    function handleClick(e){props.handleData(props.details.name,e)}
      const { classes } = props;
        return(
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="CommercialVehicleModels">
            <ExpansionPanel className={classes.panelSummary}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
            <Grid container>
            <Grid item xs={12}>
            <Typography variant='h6' className={classes.heading}>{props.details.name}</Typography>
            </Grid>
            <Grid item xs={12}>
            <img src={props.details.imageURL} height="160px" width="290px" alt={props.details.name}/>
            </Grid>
            </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <CommercialVehicleEngineOptionsSection model={props.details.name} handleData={handleClick}/>
            </ExpansionPanelDetails>
            </ExpansionPanel>
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="CommercialVehicleModelsPortrait">
            <ExpansionPanel className={classes.panelSummaryPortrait}>
            <ExpansionPanelSummary >
            <Grid container>
            <Grid item xs={12}>
            <Typography variant='body1' className={classes.heading}>{props.details.name}</Typography>
            </Grid>
            <Grid item xs={12}>
            <img src={props.details.imageURL} height="85px" width="135px" alt={props.details.name}/>
            </Grid>
            </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <CommercialVehicleEngineOptionsSection model={props.details.name} handleData={handleClick}/>
            </ExpansionPanelDetails>
            </ExpansionPanel>
            </div>
            </MediaQuery>
            </div>
        )
}
ModelsGrid.propTypes = {
    classes: propTypes.object.isRequired,
    details: propTypes.array
  };
export default withStyles(styles)(ModelsGrid);
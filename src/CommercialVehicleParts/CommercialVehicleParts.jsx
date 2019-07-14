import React from 'react'
import propTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import {BrowserRouter,Route,NavLink} from 'react-router-dom'
import UniversalItems from './UniversalItems/UniversalItems';
import { withStyles } from '@material-ui/core/styles';
import CommVehGridViewAll from './GridViewAll/CommVehGridViewAll';
import MediaQuery from 'react-responsive'
import './CommercialVehicleParts.css'

const styles = theme => ({
    button:{
        color:'#001a66',
        backgroundColor:'#e6e600',
        margin:theme.spacing.unit,
        fontFamily:'Rubik',
        borderRadius:10,
        fontSize:20,
        '&:hover': {
          backgroundColor:'#001a66',
          color:'#ffffff',
        }
      },
      buttonPortrait:{
        color:'#001a66',
        backgroundColor:'#e6e600',
        margin:theme.spacing.unit,
        fontFamily:'Rubik',
        borderRadius:8,
        fontSize:16,
        '&:hover': {
          backgroundColor:'#001a66',
          color:'#ffffff',
        }
      }
});

function CommercialVehicleParts(props){
        const { classes } = props
        return(
            <BrowserRouter>
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="CommercialVehicleParts">
            <div className="CommercialVehiclePartsHeader">
            Commercial Vehicle Parts
            <div className="CommercialVehiclePartsTabs">
            <NavLink to="/CommercialVehicleParts/GridView"><Button className={classes.button}>Grid View</Button></NavLink>
            <NavLink to="/CommercialVehicleParts/UniversalItems"><Button className={classes.button}>Universal Items</Button></NavLink>
            </div>
            </div>
            <Route path="/CommercialVehicleParts/GridView" component={CommVehGridViewAll}/>
            <Route path="/CommercialVehicleParts/UniversalItems" component={UniversalItems}/>
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="CommercialVehiclePartsPortrait">
            <div className="CommercialVehiclePartsHeaderPortrait">
            Commercial Vehicle Parts
            <div className="CommercialVehiclePartsTabs">
            <NavLink to="/CommercialVehicleParts/GridView"><Button className={classes.buttonPortrait}>Grid View</Button></NavLink>
            <NavLink to="/CommercialVehicleParts/UniversalItems"><Button className={classes.buttonPortrait}>Universal Items</Button></NavLink>
            </div>
            </div>
            <Route path="/CommercialVehicleParts/GridView" component={CommVehGridViewAll}/>
            <Route path="/CommercialVehicleParts/UniversalItems" component={UniversalItems}/>
            </div>
            </MediaQuery>
            </div>
            </BrowserRouter>
        )
}
CommercialVehicleParts.propTypes = {
    classes: propTypes.object.isRequired,
  };
export default withStyles(styles)(CommercialVehicleParts);
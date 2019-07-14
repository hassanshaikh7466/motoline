import React from 'react'
import propTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import {BrowserRouter,Route,NavLink} from 'react-router-dom'
import GridViewAll from './GridViewAll/GridViewAll';
import UniversalItems from './UniversalItems/UniversalItems';
import { withStyles } from '@material-ui/core/styles';
import MediaQuery from 'react-responsive'
import './CarParts.css'

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

function CarParts(props){
        const { classes } = props;
        return(
            <BrowserRouter>
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="CarParts">
            <div className="CarPartsHeader">
            Car parts
            <div className="CarPartsTabs">
            <NavLink to="/CarParts/GridView"><Button className={classes.button} >Grid View</Button></NavLink>
            <NavLink to="/CarParts/UniversalItems"><Button className={classes.button}>Universal Items</Button></NavLink>
            </div>
            </div>
            <Route path="/CarParts/GridView" component={GridViewAll}/>
            <Route path="/CarParts/UniversalItems" component={UniversalItems}/>
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="CarPartsPortrait">
            <div className="CarPartsHeaderPortrait">
            Car parts
            <div className="CarPartsTabs">
            <NavLink to="/CarParts/GridView"><Button className={classes.buttonPortrait} >Grid View</Button></NavLink>
            <NavLink to="/CarParts/UniversalItems"><Button className={classes.buttonPortrait}>Universal Items</Button></NavLink>
            </div>
            </div>
            <Route path="/CarParts/GridView" component={GridViewAll}/>
            <Route path="/CarParts/UniversalItems" component={UniversalItems}/>
            </div>
            </MediaQuery>
            </div>
            </BrowserRouter>
        )
}
CarParts.propTypes = {
    classes: propTypes.object.isRequired,
  };
export default withStyles(styles)(CarParts);
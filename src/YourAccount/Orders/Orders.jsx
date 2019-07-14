import React from 'react'
import { Divider, Button } from '@material-ui/core';
import {BrowserRouter,NavLink,Route} from 'react-router-dom'
import Pending from './Pending/Pending';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Completed from './Completed/Completed';
import MediaQuery from 'react-responsive'
import './Orders.css'
import Canceled from './Canceled/Canceled';

const styles = theme => ({
    button:{
        margin:theme.spacing.unit,
        fontFamily:'Rubik',
        color:'#ffffff',
        fontSize:18,
        backgroundColor:'#001a66',
        '&:hover': {
          backgroundColor:'#ffff00',
          color:'#001a66',
          }
      },
      buttonPortrait:{
        margin:theme.spacing.unit,
        fontFamily:'Rubik',
        color:'#ffffff',
        fontSize:14,
        backgroundColor:'#001a66',
        '&:hover': {
          backgroundColor:'#ffff00',
          color:'#001a66',
          }
      },
})
function Orders(props){
        const { classes } = props;
        return(
            <BrowserRouter>
            <div className="Orders">
            <MediaQuery minDeviceWidth={1280}>
            <div className="OrdersHeading">Orders</div>
            <Divider/>
            <div className="OrdersTab">
                <NavLink to="/YourAccount/Orders/Pending"><Button className={classes.button}>Pending</Button></NavLink>
                <NavLink to="/YourAccount/Orders/Completed"><Button className={classes.button}>Completed</Button></NavLink>
                <NavLink to="/YourAccount/Orders/Cancelled"><Button className={classes.button}>Cancelled</Button></NavLink>
            </div>
            <Divider/>
            <Route path="/YourAccount/Orders/Pending" component={Pending}/>
            <Route path="/YourAccount/Orders/Completed" component={Completed}/>
            <Route path="/YourAccount/Orders/Cancelled" component={Canceled}/>
            </MediaQuery>  
            <MediaQuery maxDeviceWidth={1280}>
            <div className="OrdersHeadingPortrait">Orders</div>
            <Divider/>
            <div className="OrdersTab">
                <NavLink to="/YourAccount/Orders/Pending"><Button className={classes.buttonPortrait}>Pending</Button></NavLink>
                <NavLink to="/YourAccount/Orders/Completed"><Button className={classes.buttonPortrait}>Completed</Button></NavLink>
                <NavLink to="/YourAccount/Orders/Cancelled"><Button className={classes.buttonPortrait}>Cancelled</Button></NavLink>
            </div>
            <Divider/>
            <Route path="/YourAccount/Orders/Pending" component={Pending}/>
            <Route path="/YourAccount/Orders/Completed" component={Completed}/>
            <Route path="/YourAccount/Orders/Cancelled" component={Canceled}/>
            </MediaQuery>
            </div>
            </BrowserRouter>
        )
}
Orders.propTypes = {
    classes: propTypes.object.isRequired,
  };
  export default withStyles(styles)(Orders);
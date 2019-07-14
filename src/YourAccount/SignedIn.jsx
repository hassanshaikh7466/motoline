import React from 'react'
import propTypes from 'prop-types'
import firebase from 'firebase'
import MediaQuery from 'react-responsive'
import Button from '@material-ui/core/Button'
import YourProfile from './YourProfile/YourProfile'
import Orders from './Orders/Orders'
import Cart from './Cart/Cart';
import './SignedIn.css'
import { withStyles } from '@material-ui/core/styles';
import {BrowserRouter,Route,NavLink} from 'react-router-dom'

const styles = theme => ({
    button: {
        fontFamily:'Rubik',
        fontSize:20,
        margin:theme.spacing.unit,
        backgroundColor:'#e6e600',
        color:'#001a66',
        '&:hover': {
            backgroundColor:'#001a66',
            color:'#ffffff'
        }
    },
    signoutButton:{
        fontFamily:'Rubik',
        fontSize:20,
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
            fontSize:15,
            margin:theme.spacing.unit,
            backgroundColor:'#e6e600',
            color:'#001a66',
            '&:hover': {
                backgroundColor:'#001a66',
                color:'#ffffff'
            }
        },
        signoutButtonPortrait:{
            fontFamily:'Rubik',
            fontSize:15,
            margin:theme.spacing.unit,
            backgroundColor:'#001a66',
            color:'#ffffff',
            '&:hover': {
                backgroundColor:'#ffff00',
                color:'#001a66'
                }
            }
})
function SignedIn(props){
    function handleSignOut(){
        firebase.auth().signOut()
        props.handleSignOut();
    }
        const { classes } = props;
        return(
            <BrowserRouter>
            <div className="SignedIn">
            <MediaQuery minDeviceWidth={1280}>
            <div className="YourAccountTabs">
            <NavLink to="/YourAccount/Profile/Details"><Button variant="flat" className={classes.button}>Profile</Button></NavLink>
            <NavLink to="/YourAccount/Cart"><Button variant="flat" className={props.classes.button}>Cart</Button></NavLink>
            <NavLink to="/YourAccount/Orders/Pending"><Button variant="flat" className={classes.button} >Orders</Button></NavLink>
            </div>
            <div className="SignOutButton">
            <Button variant="flat" onClick={handleSignOut} className={classes.signoutButton}>Sign out</Button>
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="YourAccountTabsPortrait">
            <NavLink to="/YourAccount/Profile/Details"><Button variant="flat" className={classes.buttonPortrait}>Profile</Button></NavLink>
            <NavLink to="/YourAccount/Cart"><Button variant="flat" className={props.classes.buttonPortrait}>Cart</Button></NavLink>
            <NavLink to="/YourAccount/Orders/Pending"><Button variant="flat" className={classes.buttonPortrait} >Orders</Button></NavLink>
            </div>
            <div className="SignOutButton">
            <Button variant="flat" onClick={handleSignOut} className={classes.signoutButtonPortrait}>Sign out</Button>
            </div>
            </MediaQuery>
            <Route path="/YourAccount/Profile/Details" component={YourProfile}/>
            <Route path="/YourAccount/Profile/Addresses" component={YourProfile}/>
            <Route path="/YourAccount/Profile/Cars" component={YourProfile}/>
            <Route path="/YourAccount/Cart" component={Cart}/>
            <Route path="/YourAccount/Orders/Pending" component={Orders}/>
            <Route path="/YourAccount/Orders/Completed" component={Orders}/>
            <Route path="/YourAccount/Orders/Cancelled" component={Orders}/>
            </div>
            </BrowserRouter>
        )
}
SignedIn.propTypes = {
    classes: propTypes.object.isRequired,
  };
export default withStyles(styles)(SignedIn);
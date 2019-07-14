import React, { Component } from 'react';
import {NavLink,Route,BrowserRouter} from 'react-router-dom'
import AboutUs from './AboutUs/AboutUs'
import propTypes from 'prop-types'
import YourAccount from './YourAccount/YourAccount'
import firebase from 'firebase'
import CarParts from './CarParts/CarParts';
import CommercialVehicleParts from './CommercialVehicleParts/CommercialVehicleParts';
import GarageListings from './GarageListings/GarageListings';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import ArrowBack from '@material-ui/icons/ArrowBack'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import './App.css';
import Typography from '@material-ui/core/Typography';
import MediaQuery from 'react-responsive'
import { Button} from '@material-ui/core';
import Home from './Home/Home';


const drawerWidth = 250;
const drawerWidthPortrait = 200;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  avatar: {
    marginRight:50,
    backgroundColor:'#001a66'
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow:1
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor:'#ffff00',
    position:'fixed'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftPortrait: {
    width: `calc(100% - ${drawerWidthPortrait}px)`,
    marginLeft: drawerWidthPortrait,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    color:'#001a66',
    marginLeft:10
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPortrait: {
    width: drawerWidthPortrait,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#001a66'
  },
  drawerPaperPortrait: {
    width: drawerWidthPortrait,
    backgroundColor:'#001a66'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    opacity: 0.2,
    transition: theme.transitions.create('opacity'),
  },
  shoppingCart:{
    color:'#001a66'
  },
  button:{
    fontFamily:'Rubik',
    color:'#ffffff',
    fontSize:18,
    width:230,
    '&:hover': {
      backgroundColor:'#ffff00',
      color:'#001a66',
      }
  },
  buttonPortrait:{
    fontFamily:'Rubik',
    color:'#ffffff',
    fontSize:15,
    width:180,
    '&:hover': {
      backgroundColor:'#ffff00',
      color:'#001a66',
      }
  },
  login:{
    fontFamily:'Rubik',
    color:'#001a66',
    backgroundColor:'#ffff00',
    fontSize:16,
    '&:hover': {
      backgroundColor:'#001a66',
      color:'#ffffff',
      }
  },
  loginPortrait:{
    fontFamily:'Rubik',
    color:'#001a66',
    backgroundColor:'#ffff00',
    fontSize:14,
    '&:hover': {
      backgroundColor:'#001a66',
      color:'#ffffff',
      }
  }
});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      open:false,cartItemCount:'',signedIn:false,users:[],user:null
    }
  }
  
  handleDrawerOpen = () => {
    this.state.open
    ? this.setState({ open:false })
    : this.setState({ open:true })
  }

  componentWillMount(){
    const dbref = firebase.database().ref().child('Users');
      const users = [];
      dbref.on('child_added', snap=>{
        users.push({
          id:snap.key,
          email:snap.val().email
        })
        this.setState({users})
      })
      const auth = firebase.auth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user,signedIn:true });
          const dbref1 = firebase.database().ref('Users');
          dbref1.on('child_added', snap =>{
            if(snap.val().email===user.email){
              const cartRef = firebase.database().ref().child('Users/'+snap.key+'/Cart');
              const cartItems = [];
              cartRef.on('child_added',snap=>{
                cartItems.push({ id:snap.key})
                this.setState({ cartItemCount:cartItems.length })
              })
              cartRef.on('child_removed',snap=>{
                for(var i=0;i<cartItems.length;i++){
                  if(snap.key===cartItems[i].id){
                      cartItems.splice(i,1)
                  }
              }
              this.setState({cartItemCount:cartItems.length})
              })
            }
          })
        }else if(user===null){
          this.setState({ signedIn:false,cartItemCount:0})
        }
      });
}  
  handleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({user});
      const users = this.state.users
      const dbref = firebase.database().ref().child('Users');
      var exists = false;
      for(var i=0;i<users.length;i++){
        if(users[i].email===user.email){
          exists=true;
        }
      }
      if(!exists){
        dbref.push().set({name:user.displayName,email:user.email,type:'Individual',cartTotal:0,points:0})
      }
    })
  }
  render() {
    const { classes } = this.props
    return (
      <BrowserRouter>
      <div className="App">
      <MediaQuery minDeviceWidth={1280}>
      <div className={classes.root}>
      <AppBar className={classNames(classes.appBar, {[classes.appBarShift]: this.state.open})} elevation={0}>
      <Toolbar disableGutters={!this.state.open}>
      <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton)}>
        <Settings />
      </IconButton>
      <Typography variant="h2" color="inherit" className={classes.grow}>
      <div className="AppbarHeader">motoline</div>
      </Typography>
      {this.state.signedIn
      ? <div className="AccountIcons">
          <IconButton aria-label={firebase.auth().currentUser.displayName}>
          <NavLink to="/YourAccount/Profile/Details"><Avatar alt={firebase.auth().currentUser.displayName} src={firebase.auth().currentUser.photoURL}/></NavLink>
          </IconButton>
          <Badge className={classes.margin} badgeContent={this.state.cartItemCount} color="primary">
          <NavLink to="/YourAccount/Cart"><ShoppingCart className={classes.shoppingCart}/></NavLink>
          </Badge>
        </div>
      : <div className="LoginSignup">
          <Button className={classes.login} onClick={this.handleSignIn}>Login | Signup</Button>
        </div>}
      </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" 
        open={this.state.open}
        classes={{paper: classes.drawerPaper}}>
        <div className={classes.drawerHeader}>
        <Button className={classes.button} onClick={this.handleDrawerOpen}> <ArrowBack/> </Button>
        </div>
        <div className="DrawerButtons">
        <List>
        <NavLink to="/">
        <Button onClick={this.handleDrawerOpen} className={classes.button}>Home</Button><br/>
        </NavLink>
        <NavLink to="/CarParts/GridView" onClick={this.handleDrawerOpen}>
        <Button onClick={this.handleDrawerClose} className={classes.button}>Car Parts</Button><br/>
        </NavLink>
        <NavLink to="/CommercialVehicleParts/GridView" onClick={this.handleDrawerOpen}>
        <Button onClick={this.handleDrawerClose} className={classes.button}>Commercial Vehicle Parts</Button><br/>
        </NavLink>
        <NavLink to="/GarageListings" onClick={this.handleDrawerOpen}>
        <Button onClick={this.handleDrawerClose} className={classes.button}>Garage Listings</Button><br/>
        </NavLink>
        <NavLink to="/YourAccount/Profile/Details" onClick={this.handleDrawerOpen}>
        <Button onClick={this.handleDrawerClose} className={classes.button}>Your Account</Button><br/>
        </NavLink>
        <NavLink to="/AboutUs">
        <Button onClick={this.handleDrawerOpen} className={classes.button}>About Us</Button><br/>
        </NavLink>
        </List>
        </div>
        </Drawer>
        <main className={classNames(classes.content, {[classes.contentShift]: this.state.open})}>
    <Route path="/" component={Home} exact/>
    <Route path="/AboutUs" component={AboutUs}/>
    <Route path="/CarParts/GridView" component={CarParts}/>
    <Route path="/CarParts/UniversalItems" component={CarParts}/>
    <Route path="/CommercialVehicleParts/GridView" component={CommercialVehicleParts}/>
    <Route path="/CommercialVehicleParts/UniversalItems" component={CommercialVehicleParts}/>
    <Route path="/YourAccount/Profile/Details" component={YourAccount}/>
    <Route path="/YourAccount/Profile/Addresses" component={YourAccount}/>
    <Route path="/YourAccount/Profile/Cars" component={YourAccount}/>
    <Route path="/YourAccount/Cart" component={YourAccount}/>
    <Route path="/YourAccount/Orders/Pending" component={YourAccount}/>
    <Route path="/YourAccount/Orders/Completed" component={YourAccount}/>
    <Route path="/YourAccount/Orders/Cancelled" component={YourAccount}/>
    <Route path="/GarageListings" component={GarageListings}/>
    </main>
      </div>
      <div className="Footer">
        Copyrights Reserved | www.motoline.shop<br/>
        Contact: motolineshop@gmail.com | +91 8866068886
      </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1280}>
      <div className={classes.root}>
      <AppBar className={classNames(classes.appBar, {[classes.appBarShiftPortrait]: this.state.open})} elevation={0}>
      <Toolbar disableGutters={!this.state.open}>
      <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton)}>
        <Settings />
      </IconButton>
      <Typography variant="h4" color="inherit" className={classes.grow}>
      <div className="AppbarHeaderPortrait">motoline</div>
      </Typography>
      {this.state.signedIn
      ? <div className="AccountIcons">
          <IconButton aria-label={firebase.auth().currentUser.displayName}>
          <NavLink to="/YourAccount/Profile/Details"><Avatar alt={firebase.auth().currentUser.displayName} src={firebase.auth().currentUser.photoURL}/></NavLink>
          </IconButton>
          <Badge className={classes.margin} badgeContent={this.state.cartItemCount} color="primary">
          <NavLink to="/YourAccount/Cart"><ShoppingCart className={classes.shoppingCart}/></NavLink>
          </Badge>
        </div>
      : <div className="LoginSignup">
          <Button className={classes.loginPortrait} onClick={this.handleSignIn}>Login | Signup</Button>
        </div>}
      </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" 
        open={this.state.open}
        classes={{paper: classes.drawerPaperPortrait}}>
        <div className={classes.drawerHeader}>
        <Button className={classes.buttonPortrait} onClick={this.handleDrawerOpen}> <ArrowBack/> </Button>
        </div>
        <div className="DrawerButtons">
        <List>
        <NavLink to="/">
        <Button onClick={this.handleDrawerOpen} className={classes.buttonPortrait}>Home</Button><br/>
        </NavLink>
        <NavLink to="/CarParts/GridView" onClick={this.handleDrawerOpen}>
        <Button onClick={this.handleDrawerClose} className={classes.buttonPortrait}>Car Parts</Button><br/>
        </NavLink>
        <NavLink to="/CommercialVehicleParts/GridView" onClick={this.handleDrawerOpen}>
        <Button onClick={this.handleDrawerClose} className={classes.buttonPortrait}>Commercial Vehicle Parts</Button><br/>
        </NavLink>
        <NavLink to="/GarageListings" onClick={this.handleDrawerOpen}>
        <Button onClick={this.handleDrawerClose} className={classes.buttonPortrait}>Garage Listings</Button><br/>
        </NavLink>
        <NavLink to="/YourAccount/Profile/Details" onClick={this.handleDrawerOpen}>
        <Button onClick={this.handleDrawerClose} className={classes.buttonPortrait}>Your Account</Button><br/>
        </NavLink>
        <NavLink to="/AboutUs">
        <Button onClick={this.handleDrawerOpen} className={classes.buttonPortrait}>About Us</Button><br/>
        </NavLink>
        </List>
        </div>
        </Drawer>
        <main className={classNames(classes.content, {[classes.contentShift]: this.state.open})}>
    <Route path="/" component={Home} exact/>
    <Route path="/AboutUs" component={AboutUs}/>
    <Route path="/CarParts/GridView" component={CarParts}/>
    <Route path="/CarParts/UniversalItems" component={CarParts}/>
    <Route path="/CommercialVehicleParts/GridView" component={CommercialVehicleParts}/>
    <Route path="/CommercialVehicleParts/UniversalItems" component={CommercialVehicleParts}/>
    <Route path="/YourAccount/Profile/Details" component={YourAccount}/>
    <Route path="/YourAccount/Profile/Addresses" component={YourAccount}/>
    <Route path="/YourAccount/Profile/Cars" component={YourAccount}/>
    <Route path="/YourAccount/Cart" component={YourAccount}/>
    <Route path="/YourAccount/Orders/Pending" component={YourAccount}/>
    <Route path="/YourAccount/Orders/Completed" component={YourAccount}/>
    <Route path="/YourAccount/Orders/Cancelled" component={YourAccount}/>
    <Route path="/GarageListings" component={GarageListings}/>
    </main>
      </div>
      <div className="FooterPortrait">
        Copyrights Reserved | www.motoline.shop<br/>
        Contact: motolineshop@gmail.com | +91 8866068886
      </div>
      </MediaQuery>
      </div>
      </BrowserRouter>
  
    );
  }
}
App.propTypes = {
  classes: propTypes.object.isRequired,
  theme: propTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(App);

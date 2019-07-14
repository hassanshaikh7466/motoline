import React from 'react'
import {NavLink} from 'react-router-dom'
import './Home.css'
import { Button, Grid } from '@material-ui/core';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Link,Element} from 'react-scroll'
import MediaQuery from 'react-responsive'
import Slide from '@material-ui/core/Slide'

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      fontFamily: 'Rubik',
      borderRadius:15,
      fontSize: 20,
      color:'#ffffff',
      backgroundColor:'#001a66',
      height:80,
      width:300,
      '&:hover': {
        backgroundColor:'#ffff00',
        color:'#001a66',
        }
    },
    buttonPortrait:{
        margin: theme.spacing.unit,
      fontFamily: 'Rubik',
      borderRadius:7,
      fontSize: 12,
      color:'#ffffff',
      backgroundColor:'#001a66',
      height:55,
      width:160,
      '&:hover': {
        backgroundColor:'#ffff00',
        color:'#001a66',
        }
    },
    garageListingButton:{
        margin: theme.spacing.unit,
        fontFamily: 'Rubik',
      borderRadius:5,
      fontSize: 20,
      color:'#ffffff',
      backgroundColor:'#001a66',
    },
    garageListingButtonPortrait:{
        margin: theme.spacing.unit,
        fontFamily: 'Rubik',
      borderRadius:3,
      fontSize: 16,
      color:'#ffffff',
      backgroundColor:'#001a66',
    },
    readMoreButton:{
        margin: theme.spacing.unit,
        fontSize: 15,
        color:'#001a66',
        fontFamily: 'Rubik',
        '&:hover': {
            backgroundColor:'#001a66',
            color:'#ffffff',
            }
    },
    yourAccountButton:{
        margin: theme.spacing.unit,
        fontSize: 20,
        color:'#ffffff',
        backgroundColor:'#001a66',
        fontFamily: 'Rubik',
        '&:hover': {
            backgroundColor:'#e6e600',
            color:'#001a66',
            }
    },
    yourAccountButtonPortrait:{
        margin: theme.spacing.unit,
        fontSize: 16,
        color:'#ffffff',
        backgroundColor:'#001a66',
        fontFamily: 'Rubik',
        '&:hover': {
            backgroundColor:'#e6e600',
            color:'#001a66',
            }
    },
    onePageScrollButtons:{
        margin: theme.spacing.unit,
        fontSize: 18,
        color:'#001a66',
        fontFamily: 'Rubik',
        backgroundColor:'#e6e600',
        '&:hover': {
            backgroundColor:'#001a66',
            color:'#ffffff',
        }
    },
    onePageScrollPortrait:{
        margin: 2,
        backgroundColor:'#e6e600',
        fontSize: 13,
        height:33,
        color:'#001a66',
        fontFamily: 'Rubik',
        '&:hover': {
            backgroundColor:'#001a66',
            color:'#ffffff',
        }
    }
})
function Home(props){
        const { classes } = props;
        return(
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="Home">
            <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={500}>
            <div className="OnePageScroll">
            <Link activeClass="active" to="Home" spy={true} smooth={true} duration={500}><Button variant="flat" className={classes.onePageScrollButtons}>Home</Button></Link>
            <Link activeClass="active" to="GarageListing" spy={true} smooth={true} offset={-50} duration={500}><Button variant="flat" className={classes.onePageScrollButtons}>Garage listings</Button></Link>
            <Link activeClass="active" to="AboutUs" spy={true} smooth={true} offset={-50} duration={500}><Button variant="flat" className={classes.onePageScrollButtons}>About Us</Button></Link>
            <Link activeClass="active" to="Register" spy={true} smooth={true} offset={-50} duration={500}><Button variant="flat" className={classes.onePageScrollButtons}>Register</Button></Link>    
            </div>
            </Slide>
            <Element name="Home">
            <div className="PartSection">
            <Grid container>
                <Grid item xs={12}>
                <div className="PartSectionHeader">
            Searching for car or commercial vehicle spares?
            <div className="nawazautoparts">
            You have come to the right place.<br/>
                <Grid container>
            <Grid item xs={6}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
                <div className="CarPartsButton">
                <img src="https://firebasestorage.googleapis.com/v0/b/motolineshop77.appspot.com/o/2342791-swift-builth-wells-garages-swift-png-850_567.png?alt=media&token=7aa19bd1-d0bb-489c-a551-fff9bca7bc92"
                height="200px" width="300px" alt="Car Parts"/><br/>
            <NavLink to="/CarParts/GridView"><Button variant="flat" className={classes.button}>Car Parts</Button></NavLink>
            </div>
            </Slide>
            </Grid>
                    <Grid item xs={6}>
                    <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={500}>
                    <div className="CommercialVehiclePartsButton">
                    <img src="https://firebasestorage.googleapis.com/v0/b/motolineshop77.appspot.com/o/CT%202518%20HD%20(6x4)%20Tipper.png?alt=media&token=d69615ad-de3e-4ae8-b2af-7df1a1bb839d"
                height="200px" width="300px" alt="Commercial Vehicle Parts"/><br/>
                    <NavLink to="/CommercialVehicleParts/GridView"><Button variant="flat" className={classes.button}>Commercial Vehicle Parts</Button></NavLink>
                    </div>
                    </Slide>
                    </Grid>
                </Grid>
            <p>
            - One stop for all your car needs.<br/>
            - Geniune car and commercial vehicle spare parts.<br/>
            - Delivery in 24 hours*.<br/>
            - Door step delivery within limits of Goa.<br/>
            - Great offers and discounts.<br/>
            - Did not find what you were looking for? Fill in the enquiry form so that we can arrange it for you.
            </p>
            </div>
            </div>
                </Grid>
                
            </Grid>
            </div>
            </Element>
            <Element name="GarageListing">
            <div className="GarageListingSection">
                <div className="GarageListingHeader">
                    Searching for a garage/mechanic to repair your car?
                </div>
                <div className="GarageLisitngPreview">
                    Did your car breakdown? Searching for a garage nearby? <br/>Check out our garage suggestions and pick the nearest to your location.<br/>
                    <NavLink to="/GarageListings"><Button variant="flat" className={classes.garageListingButton}>Garage Listings</Button></NavLink>
                </div>
            </div>
            </Element>
            <Element name="AboutUs">
            <div className="AboutUsSection">
                <div className="AboutUsSectionHeader">
                Who are we?
                </div>
            <div className="AboutUsPreview">
            Motoline, an e-commerce platform by Nawaz Auto Parts...
            <NavLink to="/AboutUs"><Button variant="flat" className={classes.readMoreButton}>Read more</Button></NavLink>
            </div>
            </div>
            </Element>
            <Element name="Register">
            <div className="RegisterSection">
            <div className="RegisterSectionHeader">
                Register!
            </div>
            <p>
            Not yet registered? Register now and sign in to place your order!!<br/>
            <NavLink to="/YourAccount/Profile/Details"><Button variant="flat" className={classes.yourAccountButton}>Register/Sign in with Google</Button></NavLink>
            </p>
            </div>
            </Element>
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="HomePortrait">
            <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={500}>
            <div className="OnePageScrollPortrait">
            <Link activeClass="active" to="Home" spy={true} smooth={true} duration={500}><Button variant="flat" className={classes.onePageScrollPortrait}>Home</Button></Link>
            <Link activeClass="active" to="GarageListing" spy={true} smooth={true} offset={-50} duration={500}><Button variant="flat" className={classes.onePageScrollPortrait}>Garage listings</Button></Link>
            <Link activeClass="active" to="AboutUs" spy={true} smooth={true} offset={-50} duration={500}><Button variant="flat" className={classes.onePageScrollPortrait}>About Us</Button></Link>
            <Link activeClass="active" to="Register" spy={true} smooth={true} offset={-50} duration={500}><Button variant="flat" className={classes.onePageScrollPortrait}>Register</Button></Link>    
            </div>
            </Slide>
            <Element name="Home">
            <div className="PartSectionPortrait">
            <Grid container>
            <Grid item xs={12}>
            <div className="PartSectionHeaderPortrait">
            Searching for car or commercial vehicle spares?
            <div className="nawazautopartsPortrait">
            You have come to the right place.<br/>
            <Grid container>
            <Grid item xs={6}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <div className="CarPartsButtonPortrait">
                <img src="https://firebasestorage.googleapis.com/v0/b/motolineshop77.appspot.com/o/2342791-swift-builth-wells-garages-swift-png-850_567.png?alt=media&token=7aa19bd1-d0bb-489c-a551-fff9bca7bc92"
                height="110px" width="160px" alt="Car Parts"/>
            <NavLink to="/CarParts/GridView"><Button variant="flat" className={classes.buttonPortrait}>Car Parts</Button></NavLink>
            </div>
            </Slide>
            </Grid>
            <Grid item xs={6}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <div className="CommercialVehiclePartsButtonPortrait">
                    <img src="https://firebasestorage.googleapis.com/v0/b/motolineshop77.appspot.com/o/CT%202518%20HD%20(6x4)%20Tipper.png?alt=media&token=d69615ad-de3e-4ae8-b2af-7df1a1bb839d"
                height="110px" width="160px" alt="Commercial Vehicle Parts"/>
            <NavLink to="/CommercialVehicleParts/GridView"><Button variant="flat" className={classes.buttonPortrait}>Commercial<br/>Vehicle Parts</Button></NavLink>
            </div>
            </Slide>
            </Grid>
            </Grid>
            <p>
            - One stop for all your car needs.<br/>
            - Geniune car and commercial vehicle spare parts.<br/>
            - Delivery in 24 hours*.<br/>
            - Door step delivery within limits of Goa.<br/>
            - Great offers and discounts.<br/>
            - Did not find what you were looking for? Fill in the enquiry form so that we can arrange it for you.
            </p>
            </div>
            </div>
            </Grid>
            </Grid>
            </div>
            </Element>
            <Element name="GarageListing">
            <div className="GarageListingSection">
                <div className="GarageListingHeaderPortrait">
                    Searching for a garage/mechanic to repair your car?
                </div>
                <div className="GarageLisitngPreviewPortrait">
                    Did your car breakdown? Searching for a garage nearby? <br/>Check out our garage suggestions and pick the nearest to your location.<br/>
                    <NavLink to="/GarageListings"><Button variant="flat" className={classes.garageListingButtonPortrait}>Garage Listings</Button></NavLink>
                </div>
            </div>
            </Element>
            <Element name="AboutUs">
            <div className="AboutUsSection">
                <div className="AboutUsSectionHeaderPortrait">
                Who are we?
                </div>
            <div className="AboutUsPreviewPortrait">
            Motoline, an e-commerce platform by Nawaz Auto Parts...
            <NavLink to="/AboutUs"><Button variant="flat" className={classes.readMoreButton}>Read more</Button></NavLink>
            </div>
            </div>
            </Element>
            <Element name="Register">
            <div className="RegisterSectionPortrait">
            <div className="RegisterSectionHeaderPortrait">
                Register!
            </div>
            <p>
            Not yet registered? Register now and sign in to place your order!!<br/>
            <NavLink to="/YourAccount/Profile/Details"><Button variant="flat" className={classes.yourAccountButtonPortrait}>Register/Sign in with Google</Button></NavLink>
            </p>
            </div>
            </Element>
            </div>
            </MediaQuery>
            </div>
        )
}

Home.propTypes = {
    classes: propTypes.object.isRequired,
};
  
export default withStyles(styles)(Home);
import React from 'react'
import './YourProfile.css'
import { Grid } from '@material-ui/core';
import ProfilePic from './ProfilePic';
import Addresses from './Addresses';
import YourCars from './YourCars';
import MediaQuery from 'react-responsive'

function YourProfile(){
        return(
            <div className="YourProfile">
            <MediaQuery minDeviceWidth={1280}>
            <Grid container>
            <Grid item xs={6}>
            <Grid container>
            <Grid item xs={12}>
            <ProfilePic/>
            </Grid>
            <Grid item xs={12}>
            <YourCars/>
            </Grid>
            </Grid>
            </Grid>
            <Grid item xs={6}>
            <Addresses/>
            </Grid>
            </Grid>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <Grid container>
            <Grid item xs={12}>
            <ProfilePic/>
            </Grid>
            <Grid item xs={12}>
            <Addresses/>
            </Grid>
            <Grid item xs={12}>
            <YourCars/>
            </Grid>
            </Grid>
            </MediaQuery>
            </div>
        )
}
export default YourProfile;
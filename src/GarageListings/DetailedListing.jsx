import React from 'react'
import propTypes from 'prop-types'
import { Grid } from '@material-ui/core';
import './GarageListings.css'
import MediaQuery from 'react-responsive'

function DetailedListing(props){
        return(
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="DetailedListing">
                <Grid container>
                    <Grid item xs={8}>
                    {props.details.name}<br/>
                    {props.details.mechanic}<br/>
                    Address: {props.details.address} {props.details.city}<br/>
                    Phone no:{props.details.phoneNo}<br/>
                    Type: {props.details.type}
                    </Grid>
                    <Grid item xs={4}>
                    <img src={props.details.imageURL} alt={props.details.name} height="190" width="330"/><br/>
                    </Grid>
                </Grid>
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="DetailedListingPortrait">
                <Grid container>
                    <Grid item xs={6}>
                    {props.details.name}<br/>
                    {props.details.mechanic}<br/>
                    Address: {props.details.address} {props.details.city}<br/>
                    Phone no:{props.details.phoneNo}<br/>
                    Type: {props.details.type}
                    </Grid>
                    <Grid item xs={6}>
                    <img src={props.details.imageURL} alt={props.details.name} height="130" width="190"/><br/>
                    </Grid>
                </Grid>
            </div>
            </MediaQuery>
            </div>
        )
}
DetailedListing.propTypes = {
    details :propTypes.array
}
export default DetailedListing;
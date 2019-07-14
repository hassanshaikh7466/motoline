import React from 'react'
import propTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import MediaQuery from 'react-responsive'
import './Completed.css'

function Particulars(props){
        return(
        <div>
        <MediaQuery minDeviceWidth={1280}>
        <div className="Particulars">
        <Grid container>
        <Grid item xs={4}><img src={props.particulars.imageURL} height="250px" width="250px" alt={props.particulars.name}/>
        </Grid>
        <Grid item xs={8}>
        {props.particulars.name}<br/>
        {props.particulars.description}<br/>
        MRP: {props.particulars.mrp}<br/>
        {props.particulars.type==="Universal"
        ? <div>For: Universal</div>
        : <div>For: {props.particulars.compatibleWith.manufacturer} {props.particulars.compatibleWith.model} {props.particulars.compatibleWith.engineOption}</div>}
        Qty: {props.particulars.qty}<br/>
        Total: {props.particulars.total}
        </Grid>
        </Grid>
        </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1280}>
        <div className="ParticularsPortrait">
        <Grid container>
        <Grid item xs={6}><img src={props.particulars.imageURL} height="150px" width="150px" alt={props.particulars.name}/></Grid>
        <Grid item xs={6}>
        {props.particulars.name}<br/>
        {props.particulars.description}<br/>
        MRP: {props.particulars.mrp}<br/>
        {props.particulars.type==="Universal"
        ? <div>For: Universal</div>
        : <div>For: {props.particulars.compatibleWith.manufacturer} {props.particulars.compatibleWith.model} {props.particulars.compatibleWith.engineOption}</div>}
        Qty: {props.particulars.qty}<br/>
        Total: {props.particulars.total}
        </Grid>
        </Grid>
        </div>
        </MediaQuery>
        </div>
        )
}
Particulars.propTypes = {
    particulars: propTypes.array
}
export default Particulars;
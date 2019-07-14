import React from 'react'
import propTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import MediaQuery from 'react-responsive'
import './Cart.css'

function OrderReview(props){
    return(
        <div>
        <MediaQuery minDeviceWidth={1280}>
        <div className="OrderReview">
        <Grid container>
        <Grid item xs={12}>
        <Grid container>
        {props.cartItems.map(p=>
            <Grid item xs={6} key={p.id}>
            <div className="ItemDetails">
            <Grid container>
            <Grid item xs={4}>
                <img src={p.imageURL} height="200px" width="200px" alt={p.name}/>
            </Grid>
            <Grid item xs={8}>
                Name: {p.name}<br/>
                For: {p.compatibleWith.type==="Universal" ? "Universal" : <p>{p.compatibleWith.manufacturer} {p.compatibleWith.model} {p.compatibleWith.engineOption}</p>}
                MRP: {p.mrp}<br/>
                Qty: {p.qty}<br/>
                Total: {p.total}
            </Grid>
            </Grid>
            </div>
            </Grid>)}
        </Grid>
        </Grid>
        <Grid item xs={12}>
        <div className="GrandTotalDialog">
        {props.type==="Mechanic" ? <p>Points redeemed: {props.amount}</p> :null}
        Grand total: {props.cartTotal}
        </div>
        </Grid>
        </Grid>
        </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1280}>
        <div className="OrderReviewPortrait">
        <Grid container>
        <Grid item xs={12}>
        <Grid container>
        {props.cartItems.map(p=>
            <Grid item xs={12} key={p.id}>
            <div className="ItemDetails">
            <Grid container>
            <Grid item xs={6}>
                <img src={p.imageURL} height="150px" width="150px" alt={p.name}/>
            </Grid>
            <Grid item xs={6}>
                Name: {p.name}<br/>
                For: {p.compatibleWith.type==="Universal" ? <p>Universal</p> : <p>{p.compatibleWith.manufacturer} {p.compatibleWith.model} {p.compatibleWith.engineOption}</p>}
                MRP: {p.mrp}<br/>
                Qty: {p.qty}<br/>
                Total: {p.total}
            </Grid>
            </Grid>
            </div>
            </Grid>)}
        </Grid>
        </Grid>
        <Grid item xs={12}>
        <div className="GrandTotalDialogPortrait">
        {props.type==="Mechanic" ? <p>Points redeemed: {props.amount}</p> :null}
        Grand total: {props.cartTotal}
        </div>
        </Grid>
        </Grid>
        </div>
        </MediaQuery>
        </div>
    )
}

OrderReview.propTypes = {
    cartItems:propTypes.array,
    amount:propTypes.string,
    cartTotal:propTypes.string,
    type:propTypes.string
}

export default OrderReview
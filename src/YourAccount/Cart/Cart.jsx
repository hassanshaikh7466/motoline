import React,{Component} from 'react'
import firebase from 'firebase'
import propTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import ItemDetails from './ItemDetails';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, Divider, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close';
import MediaQuery from 'react-responsive'
import './Cart.css'
import OrderReview from './OrderReview';

const styles = theme => ({
    appBar:{
        backgroundColor:'#ffff00'
    },
    root: {
      display: 'flex',
    },
    tableRoot: {
        width: '100%',
        marginTop: theme.spacing.unit,
        overflowX: 'auto',
      },
      table: {
        width: '100%',
        fontFamily:'Rubik',
        fontSize:20
      },
    formControl: {
      margin: theme.spacing.unit * 3,
    },
    group: {
      margin: `${theme.spacing.unit}px 0`
    },
    button: {
        fontFamily:'Rubik',
        fontSize:18,
        margin:theme.spacing.unit,
        backgroundColor:'#001a66',
        color:'#ffffff',
        '&:hover': {
          backgroundColor:'#ffff00',
          color:'#001a66'
      }
      },
      buttonPortrait:{
        fontFamily:'Rubik',
        fontSize:14,
        margin:theme.spacing.unit,
        backgroundColor:'#001a66',
        color:'#ffffff',
        '&:hover': {
          backgroundColor:'#ffff00',
          color:'#001a66'
      }
      },
    close: {
        padding: theme.spacing.unit / 2,
        color:'#001a66'
      },
      closeSnackbar: {
        padding: theme.spacing.unit / 2,
        color:'#ffffff'
      },
      radioGroupLabel:{
          fontFamily:'Rubik',
          fontSize:20
      },
      typography: {
        fontFamily:'Rubik'
      },
      appBarTitle:{
          fontFamily:'Rubik',
          color:'#001a66'
      },
      textField:{
          backgroundColor:'#ffffff',
          padding:5,
          borderRadius:5
      },
      textFieldPortrait:{
        backgroundColor:'#ffffff',
        padding:3,
        borderRadius:5
    }
  });
  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }
class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            cartItems:[],grandTotal:0,pointsRedeemed:0,orders:[],addreses:[],address:[],
            open:false,successOpen:false,mobileNo:'',points:'',cartTotal:'',type:'',
            pointsRender:false,amount:'',pointsOpen:false,addressOpen:false,openDialog:false,mobileDialog:false
        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false });
      };
      handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ successOpen: false });
      };
      handlePointsClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ pointsOpen: false });
      };
      handleAddressClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ addressOpen: false });
      };
      handleMobileClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ mobileDialog: false });
      };
    componentWillMount(){
        const dbref3 = firebase.database().ref().child('Orders');
        const orders = []
        dbref3.on('child_added', snap=>{
            orders.push(snap.val())
            this.setState({ orders })
        })
        const dbref1 = firebase.database().ref('Users');
        dbref1.on('child_added', snap =>{
            if(snap.val().email===firebase.auth().currentUser.email){
                this.setState({
                    mobileNo:snap.val().mobileNo,
                    points:snap.val().points,
                    type:snap.val().type,
                    pointsRedeemed:snap.val().pointsRedeemed,
                    cartTotal:snap.val().cartTotal
                })
                const dbref = firebase.database().ref().child('Users/'+snap.key+'/Cart');
                const cartItems = [];
                dbref.on('child_added', snap =>{
                    cartItems.push({
                        id:snap.key,
                        PartID:snap.val().PartID,
                        partCategory:snap.val().partCategory,
                        imageURL:snap.val().imageURL,
                        name:snap.val().name,
                        description:snap.val().description,
                        company:snap.val().company,
                        compatibleWith:snap.val().compatibleWith,
                        mrp:snap.val().mrp,
                        type:snap.val().type,
                        qty:snap.val().qty,
                        total:snap.val().total
                    })
                    this.setState({cartItems})
                })
                dbref.on('child_removed', snap =>{
                    for(var i=0;i<cartItems.length;i++){
                        if(snap.key===cartItems[i].id){
                            cartItems.splice(i,1)
                        }
                    }
                    this.setState({cartItems})
                })
                dbref.on('child_changed',snap=>{
                    for(var i=0;i<cartItems.length;i++){
                        if(snap.key===cartItems[i].id){
                            cartItems[i].qty=snap.val().qty;
                            cartItems[i].total=snap.val().total
                        }
                    }
                    this.setState({cartItems })
                })
                const addressesdb = firebase.database().ref().child('Users/'+snap.key+'/Address')
                const addreses = [];
                addressesdb.on('child_added', snap=>{
                    addreses.push({
                        id:snap.key,
                        addressLine:snap.val().addressLine,
                        street:snap.val().street,
                        landmark:snap.val().landmark,
                        city:snap.val().city,
                        pincode:snap.val().pincode
                    })
                    this.setState({ addreses })
                })
            }
        })
        dbref1.on('child_changed', snap=>{
            this.setState({ 
                points:snap.val().points,
                cartTotal:snap.val().cartTotal,
                pointsRedeemed:snap.val().pointsRedeemed,
                mobileNo:snap.val().mobileNo
            })
        })
    }
        
    placeOrder = () =>{
        if(this.state.address.length!==0){
            var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var date = mm + '/' + dd + '/' + yyyy;
        var time = today.getHours() + ":" + today.getMinutes()
        const orders = this.state.orders
        const dbref = firebase.database().ref().child('Orders');
        dbref.push().set({
            OrderID:"ML"+(orders.length+1),
            name:firebase.auth().currentUser.displayName,
            email:firebase.auth().currentUser.email,
            mobileNo:this.state.mobileNo,
            particulars:this.state.cartItems,
            status:"Pending",
            address:{addressLine:this.state.address.addressLine,street:this.state.address.street,landmark:this.state.address.landmark,city:this.state.address.city,pincode:this.state.address.pincode},
            date:date,
            time:time,
            pointsRedeemed:this.state.amount,
            total:this.state.cartTotal
        })
        const dbref1 = firebase.database().ref('Users');
        dbref1.on('child_added', snap =>{
            if(snap.val().email===firebase.auth().currentUser.email){
                const dbref2 = firebase.database().ref('Users/'+snap.key);
                dbref2.child('Cart').remove();
                dbref2.update({cartTotal:0,pointsRedeemed:0})
                this.setState({ successOpen:true })
            }
        })
        }else{
            this.setState({ addressOpen:true })
        }
    }
    handleCartOpen = () =>{ 
        this.state.mobileNo
        ? this.setState({ open:true })
        : this.setState({ mobileDialog:true  })
    }
    handleAddress = e =>{
        const addresses = this.state.addreses;
        for(var i=0;i<addresses.length;i++){
            if(addresses[i].id===e.target.value){
                this.setState({ address:addresses[i] })
            }
        }
    }
    handlePointsRender = () =>{ 
        this.state.pointsRender
        ? this.setState({ pointsRender:false })
        : this.setState({ pointsRender:true })
    }
    handleAmount = e =>{ this.setState({ amount:e.target.value })}
    handleRedeem = () =>{
        if(parseFloat(this.state.amount)<=parseFloat(this.state.points)){
            const dbref = firebase.database().ref().child('Users');
            dbref.on('child_added', snap=>{
            if(snap.val().email===firebase.auth().currentUser.email){
                const dbref1 = firebase.database().ref().child('Users/'+snap.key)
                dbref1.update({ 
                    pointsRedeemed:parseFloat(this.state.amount),
                    cartTotal: parseFloat(this.state.cartTotal)-parseFloat(this.state.amount),
                    points: parseFloat(this.state.points)-parseFloat(this.state.amount)
                })
            }
        })
        this.setState({ 
            grandTotal:parseInt(this.state.grandTotal)-parseInt(this.state.amount),
            pointsRender:false,
            amount:''
        })
        }else{
            this.setState({ pointsOpen:true })
        }
        
    }
    handleUndo = () =>{
        const dbref = firebase.database().ref().child('Users');
        dbref.on('child_added', snap=>{
            if(snap.val().email===firebase.auth().currentUser.email){
            const dbref1 = firebase.database().ref().child('Users/'+snap.key)
            dbref1.update({ 
                    pointsRedeemed:0,
                    cartTotal: parseFloat(this.state.cartTotal)+parseFloat(this.state.pointsRedeemed),
                    points: parseFloat(this.state.points)+parseFloat(this.state.pointsRedeemed)
                })
            }
        })
    }
    handleClickOpen = () => { 
        this.state.openDialog
        ? this.setState({ openDialog:false })
        : this.setState({ openDialog:true })
    }
    render(){
        const { classes } = this.props;
        return(
            <div className="Cart">
            <MediaQuery minDeviceWidth={1280}>
            <div className="CartHeading">Cart</div>
            {this.state.cartItems.length!==0
            ? <div>
            <Grid container>
            {this.state.cartItems.map(p=> 
            <Grid item xs={6} key={p.id}>
            <ItemDetails details={p}/>
            </Grid>)}
            </Grid>
            <Divider/>
            {this.state.cartItems.length!==0
            ? <div>
                {this.state.type==="Mechanic"
                ? <div className="PointsRedeem">
                Points: {this.state.points}<br/>
                {this.state.pointsRedeemed!==0
                ? <div>
                    Points redeemed: {this.state.pointsRedeemed}<br/>
                    <Button className={classes.button} onClick={this.handleUndo}>Undo</Button>
                </div>
                : null}
                {this.state.pointsRender
                    ? <div>
                    <TextField label="Enter amount" margin="normal" value={this.state.amount} onChange={this.handleAmount} className={classes.textField}/><br/>
                    <Button className={classes.button} onClick={this.handleRedeem}>Redeem Points</Button>
                    <Button className={classes.button} onClick={this.handlePointsRender}>Back</Button>
                    </div>
                    : <Button className={classes.button} onClick={this.handlePointsRender}>Redeem</Button>}
                </div>
                : null}
            <div className="GrandTotal">
            Grand total: {this.state.cartTotal}
            </div>
            <div className="Checkout">
            {this.state.cartItems.length!==0
            ? <Button variant="flat" className={classes.button} onClick={this.handleClickOpen}>Proceed to checkout</Button>
            : <Button variant="flat" className={classes.button} onClick={this.handleCartOpen}>Proceed to checkout</Button>}
            </div>
            </div>
            : null}
            <Dialog fullScreen open={this.state.openDialog} onClose={this.handleClickOpen} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar>
            <IconButton onClick={this.handleClickOpen} aria-label="Close" className={classes.close}>
            <CloseIcon />
            </IconButton>
            <Typography variant="h5" className={classes.appBarTitle}>Order review</Typography>
            </Toolbar>
            </AppBar>
            <OrderReview cartItems={this.state.cartItems} type={this.state.type} amount={this.state.pointsRedeemed} cartTotal={this.state.cartTotal}/>
            <div className="AddressSelection">
            Please select an address
            <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="caption" className={classes.radioGroupLabel}>Address</FormLabel>
            <RadioGroup aria-label="Address" name="address" className={classes.group}
            value={this.state.address.addressLine} onChange={this.handleAddress}>
            {this.state.addreses.map(p=>
            <FormControlLabel key={p.id} value={p.id} control={<Radio />} className={classes.labels} label={p.addressLine}/>)}
            </RadioGroup>
            </FormControl>
            </div>
            </div>
            <div className="PlaceOrder">
            <Button variant="flat" className={classes.button} onClick={this.placeOrder}>Place order</Button>
            </div>
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
            open={this.state.successOpen} autoHideDuration={3000}
            onClose={this.handleSuccessClose}
            ContentProps={{'aria-describedby': 'message-id'}}
            message={<span id="message-id">Order Successfully placed</span>}
            action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.closeSnackbar} onClick={this.handleSuccessClose}>
            <CloseIcon />
            </IconButton>]}/>
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
            open={this.state.addressOpen} autoHideDuration={3000}
            onClose={this.handleAddressClose}
            ContentProps={{'aria-describedby': 'message-id'}}
            message={<span id="message-id">No address selected, Please select an address</span>}
            action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.closeSnackbar} onClick={this.handleAddressClose}>
            <CloseIcon />
            </IconButton>]}/>
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
            open={this.state.mobileDialog} autoHideDuration={3000}
            onClose={this.handleMobileClose}
            ContentProps={{'aria-describedby': 'message-id'}}
            message={<span id="message-id">Mobile number not updated</span>}
            action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.closeSnackbar} onClick={this.handleMobileClose}>
            <CloseIcon />
            </IconButton>]}/>
            </Dialog>
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
            open={this.state.open} autoHideDuration={3000}
            onClose={this.handleClose} ContentProps={{ 'aria-describedby': 'message-id'}}
            message={<span id="message-id">Cart is empty</span>}
            action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.closeSnackbar} onClick={this.handleClose}>
            <CloseIcon />
            </IconButton>]}/>
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
            open={this.state.pointsOpen} autoHideDuration={3000}
            onClose={this.handlePointsClose}
            ContentProps={{'aria-describedby': 'message-id'}}
            message={<span id="message-id">Not enough points</span>}
            action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.closeSnackbar} onClick={this.handlePointsClose}>
            <CloseIcon />
            </IconButton>]}/>
            </div>
            : <div className="IfEmpty">
                Cart is empty :(
            </div>}
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="CartHeadingPortrait">Cart</div>
            {this.state.cartItems.length!==0
            ? <div>
            <Grid container>
            {this.state.cartItems.map(p=> 
            <Grid item xs={12} key={p.id}>
            <ItemDetails details={p}/>
            </Grid>)}
            </Grid>
            <Divider/>
            {this.state.cartItems.length!==0
            ? <div>
                {this.state.type==="Mechanic"
                ? <div className="PointsRedeemPortrait">
                Points: {this.state.points}<br/>
                {this.state.pointsRedeemed!==0
                ? <div>
                    Points redeemed: {this.state.pointsRedeemed}<br/>
                    <Button className={classes.buttonPortrait} onClick={this.handleUndo}>Undo</Button>
                </div>
                : null}
                {this.state.pointsRender
                    ? <div>
                    <TextField label="Enter amount" margin="normal" value={this.state.amount} onChange={this.handleAmount} className={classes.textFieldPortrait}/><br/>
                    <Button className={classes.buttonPortrait} onClick={this.handleRedeem}>Redeem Points</Button>
                    <Button className={classes.buttonPortrait} onClick={this.handlePointsRender}>Back</Button>
                    </div>
                    : <Button className={classes.buttonPortrait} onClick={this.handlePointsRender}>Redeem</Button>}
                </div>
                : null}
            <div className="GrandTotalPortrait">
            Grand total: {this.state.cartTotal}
            </div>
            <div className="CheckoutPortrait">
            {this.state.cartItems.length!==0
            ? <Button variant="flat" className={classes.buttonPortrait} onClick={this.handleClickOpen}>Proceed to checkout</Button>
            : <Button variant="flat" className={classes.buttonPortrait} onClick={this.handleCartOpen}>Proceed to checkout</Button>}
            </div>
            </div>
            : null}
            <Dialog fullScreen open={this.state.openDialog} onClose={this.handleClickOpen} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar>
            <IconButton onClick={this.handleClickOpen} aria-label="Close" className={classes.close}>
            <CloseIcon />
            </IconButton>
            <Typography variant="h5" className={classes.appBarTitle}>Order review</Typography>
            </Toolbar>
            </AppBar>
            <OrderReview cartItems={this.state.cartItems} type={this.state.type} amount={this.state.pointsRedeemed} cartTotal={this.state.cartTotal}/>
            <div className="AddressSelectionPortrait">
            Please select an address
            <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="caption" className={classes.radioGroupLabel}>Address</FormLabel>
            <RadioGroup aria-label="Address" name="address" className={classes.group}
            value={this.state.address.addressLine} onChange={this.handleAddress}>
            {this.state.addreses.map(p=>
            <FormControlLabel key={p.id} value={p.id} control={<Radio />} className={classes.labels} label={p.addressLine}/>)}
            </RadioGroup>
            </FormControl>
            </div>
            </div>
            <div className="PlaceOrder">
            <Button variant="flat" className={classes.buttonPortrait} onClick={this.placeOrder}>Place order</Button>
            </div>
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
            open={this.state.successOpen} autoHideDuration={3000}
            onClose={this.handleSuccessClose}
            ContentProps={{'aria-describedby': 'message-id'}}
            message={<span id="message-id">Order Successfully placed</span>}
            action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.closeSnackbar} onClick={this.handleSuccessClose}>
            <CloseIcon />
            </IconButton>]}/>
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
            open={this.state.addressOpen} autoHideDuration={3000}
            onClose={this.handleAddressClose}
            ContentProps={{'aria-describedby': 'message-id'}}
            message={<span id="message-id">No address selected, Please select an address</span>}
            action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.closeSnackbar} onClick={this.handleAddressClose}>
            <CloseIcon />
            </IconButton>]}/>
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
            open={this.state.mobileDialog} autoHideDuration={3000}
            onClose={this.handleMobileClose}
            ContentProps={{'aria-describedby': 'message-id'}}
            message={<span id="message-id">Mobile number not updated</span>}
            action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.closeSnackbar} onClick={this.handleMobileClose}>
            <CloseIcon />
            </IconButton>]}/>
            </Dialog>
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
            open={this.state.open} autoHideDuration={3000}
            onClose={this.handleClose} ContentProps={{ 'aria-describedby': 'message-id'}}
            message={<span id="message-id">Cart is empty</span>}
            action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.closeSnackbar} onClick={this.handleClose}>
            <CloseIcon />
            </IconButton>]}/>
            <Snackbar anchorOrigin={{vertical: 'bottom',horizontal: 'left'}}
            open={this.state.pointsOpen} autoHideDuration={3000}
            onClose={this.handlePointsClose}
            ContentProps={{'aria-describedby': 'message-id'}}
            message={<span id="message-id">Not enough points</span>}
            action={[
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.closeSnackbar} onClick={this.handlePointsClose}>
            <CloseIcon />
            </IconButton>]}/>
            </div>
            : <div className="IfEmptyPortrait">
                Cart is empty :(
            </div>}   
            </MediaQuery>
            </div>
        )
    }
}
Cart.propTypes = {
    classes: propTypes.object.isRequired,
  };
  
export default withStyles(styles)(Cart)
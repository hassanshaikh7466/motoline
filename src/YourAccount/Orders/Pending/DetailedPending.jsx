import React,{Component} from 'react'
import propTypes from 'prop-types'
import Particulars from './Particulars';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Button, Grid } from '@material-ui/core';
import firebase from 'firebase'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MediaQuery from 'react-responsive'
import DialogTitle from '@material-ui/core/DialogTitle';
import './Pending.css'

const styles = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor:'#ffff00',
    color:'#001a66'
  },
  close: {
    color: '#001a66',
  },
  card: {
      maxWidth: '100%',
    },
    typography:{
      fontFamily:'Rubik'
    },
    typographyPortrait:{
      fontFamily:'Rubik',
      fontSize:16
    },
    button:{
      margin:theme.spacing.unit,
      fontFamily:'Rubik',
      backgroundColor:'#001a66',
      color:'#ffffff',
      fontSize:18,
      '&:hover': {
        backgroundColor:'#ffff00',
        color:'#001a66',
        }
    },
    buttonPortrait:{
      margin:theme.spacing.unit,
      fontFamily:'Rubik',
      backgroundColor:'#001a66',
      color:'#ffffff',
      fontSize:14,
      '&:hover': {
        backgroundColor:'#ffff00',
        color:'#001a66',
        }
    }
  });
  
  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

class DetailedPending extends Component{
    constructor(props){
        super(props);
        this.details = propTypes.array;
        this.state = {
            open:false,openConfirmation:false
        }
    }
    handleClickOpen = () => {
      this.state.open
      ? this.setState({ open:false })
      : this.setState({ open:true})
    };

      cancelOrder = () =>{
        const dbref = firebase.database().ref().child('Orders/'+this.props.details.id)
        dbref.update({status:"Canceled"})
        const dbref2 = firebase.database().ref().child('Users');
        dbref2.on('child_added', snap=>{
          if(snap.val().email===firebase.auth().currentUser.email){
            if(snap.val().type==="Mechanic"){
              if(this.props.details.pointsRedeemed!==""){
                const dbref1 = firebase.database().ref().child('Users/'+snap.key)
                dbref1.update({ points: parseFloat(snap.val().points)+parseFloat(this.props.details.pointsRedeemed) })
              }
            }
          }
        })
        this.setState({ openConfirmation:false })
      }
    handleDialogOpen = () =>{
      this.state.openConfirmation
      ? this.setState({ openConfirmation:false })
      : this.setState({ openConfirmation:true })
    }
    render(){
        const { classes } = this.props;
        return(
            <div className="DetailedPending">
            <MediaQuery minDeviceWidth={1280}>
            <Card className={classes.card}>
            <CardActionArea onClick={this.handleClickOpen}>
            <CardContent>
            <Typography variant="h5" component="p" className={classes.typography}>
            OrderID: {this.props.details.OrderID}<br/>
            Date: {this.props.details.date}<br/>
            Total: {this.props.details.total}<br/>
            </Typography>
            </CardContent>
            </CardActionArea>
            <Button onClick={this.handleDialogOpen} className={classes.button}>Cancel Order</Button>
            </Card>
            <Dialog fullScreen open={this.state.open} onClose={this.handleClickOpen} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar>
            <IconButton color="inherit" onClick={this.handleClickOpen} aria-label="Close" className={classes.close}>
            <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.typography}>Details</Typography>
            </Toolbar>
            </AppBar>
            <div className="DetailedOrder">
            OrderID: {this.props.details.OrderID}<br/>
            Date: {this.props.details.date}<br/>
            Address: {this.props.details.address.addressLine} {this.props.details.address.street} {this.props.details.address.landmark} {this.props.details.address.city} {this.props.details.address.pincode}<br/>
            Total: {this.props.details.total}<br/>
            Particulars: <br/>
            <Grid container>
            {this.props.details.particulars.map(p=>
            <Grid item xs={12} key={p.id}>
            <Particulars particulars={p}/>
            </Grid>)}
            </Grid>
            </div>
            </Dialog>
            <Dialog open={this.state.openConfirmation} onClose={this.handleDialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Cancel order ?</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to cancel order ?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleDialogOpen} className={classes.button}>No</Button>
            <Button onClick={this.cancelOrder} className={classes.button}>Yes</Button>
            </DialogActions>
            </Dialog>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <Card className={classes.card}>
            <CardActionArea onClick={this.handleClickOpen}>
            <CardContent>
            <Typography variant="h6" component="p" className={classes.typographyPortrait}>
            OrderID: {this.props.details.OrderID}<br/>
            Date: {this.props.details.date}<br/>
            Total: {this.props.details.total}<br/>
            </Typography>
            </CardContent>
            </CardActionArea>
            <Button onClick={this.handleDialogOpen} className={classes.buttonPortrait}>Cancel Order</Button>
            </Card>
            <Dialog fullScreen open={this.state.open} onClose={this.handleClickOpen} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar>
            <IconButton color="inherit" onClick={this.handleClickOpen} aria-label="Close" className={classes.close}>
            <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.typography}>Details</Typography>
            </Toolbar>
            </AppBar>
            <div className="DetailedOrderPortrait">
            OrderID: {this.props.details.OrderID}<br/>
            Date: {this.props.details.date}<br/>
            Address: {this.props.details.address.addressLine} {this.props.details.address.street} {this.props.details.address.landmark} {this.props.details.address.city} {this.props.details.address.pincode}<br/>
            Total: {this.props.details.total}<br/>
            Particulars: <br/>
            <Grid container>
            {this.props.details.particulars.map(p=>
            <Grid item xs={12} key={p.id}>
            <Particulars particulars={p}/>
            </Grid>)}
            </Grid>
            </div>
            </Dialog>
            <Dialog open={this.state.openConfirmation} onClose={this.handleDialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Cancel order ?</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to cancel order ?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleDialogOpen} className={classes.buttonPortrait}>No</Button>
            <Button onClick={this.cancelOrder} className={classes.buttonPortrait}>Yes</Button>
            </DialogActions>
            </Dialog>
            </MediaQuery>
            </div>
        )
    }
}
DetailedPending.propTypes = {
    classes: propTypes.object.isRequired,
  };
  
export default withStyles(styles)(DetailedPending);
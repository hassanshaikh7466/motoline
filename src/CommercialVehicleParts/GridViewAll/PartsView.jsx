import React,{Component} from 'react'
import firebase from 'firebase'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button, CardActionArea,Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import MediaQuery from 'react-responsive'
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './GridViewAll.css'

const styles = theme => ({
  card: {
    width: 300,
    borderRadius:10,
    padding:5
  },
  cardPortrait:{
    width: '100%',
    height:150,
    borderRadius:5,
    padding:5
  },
  media: {
    width:295,
    height: 295,
  },
  mediaPortrait:{
    width:145,
    height: 145,
  },
close: {
  padding: theme.spacing.unit / 2,
  color:'#001a66'
},
closeDialog:{
  padding: theme.spacing.unit / 2,
  color:'#ffffff'
},
textField: {
  marginLeft: theme.spacing.unit,
  marginRight: theme.spacing.unit,
  width: 200,
},
textFieldPortrait: {
  marginLeft: theme.spacing.unit,
  marginRight: theme.spacing.unit,
  width: 150,
},
  appBar: {
    position: 'relative',
    backgroundColor:'#ffff00'
  },
  flex: {
    flex: 1,
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
    fontSize:10,
    height:30,
    margin:theme.spacing.unit,
    backgroundColor:'#001a66',
    color:'#ffffff',
    '&:hover': {
      backgroundColor:'#ffff00',
      color:'#001a66'
  }
  },
  outofStockButton:{
    fontFamily:'Rubik',
    fontSize:18,
    margin:theme.spacing.unit,
  },
  outofStockButtonPortrait:{
    fontFamily:'Rubik',
    fontSize:10,
    height:30,
    margin:theme.spacing.unit,
  },
  typography: {
    fontFamily:'Rubik',
    color:'#001a66'
  }
});
  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }
class PartsView extends Component{
    constructor(props){
        super(props);
        this.manufacturer = propTypes.string;
        this.model = propTypes.string;
        this.engineOption = propTypes.string;
        this.partCategory = propTypes.string;
        this.partDetails = propTypes.array;
        this.state = {
          isSignedIn:false,users:[],open:false,openDialog:false,successSnackbar:false
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
        this.setState({ successSnackbar: false });
      };
    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.setState({isSignedIn:!!user})
        })
    }
    handleAdd = () =>{
      if(this.state.isSignedIn){
        const partDetails = this.props.partDetails
        const dbref = firebase.database().ref().child('Users');
        dbref.on('child_added',snap=>{
            if(snap.val().email===firebase.auth().currentUser.email){
              const dbref2 = firebase.database().ref().child('Users/'+snap.key);
              dbref2.update({ cartTotal:snap.val().cartTotal+parseInt(partDetails.mrp) })  
              const cartRef = firebase.database().ref().child('Users/'+snap.key+'/Cart');
                cartRef.push().set({
                    PartID:partDetails.id,
                    partCategory:this.props.partCategory,
                    type:"CommercialVehicleParts",
                    imageURL:partDetails.imageURL,
                    name:partDetails.name,
                    description:partDetails.description,
                    company:partDetails.company,
                    compatibleWith:{manufacturer:this.props.manufacturer,model:this.props.model,engineOption:this.props.engineOption},
                    mrp:partDetails.mrp,
                    qty:1,
                    total:parseInt(partDetails.mrp)
                })
                this.setState({ successSnackbar:true })
            }
        })
      }else{
        this.setState({ open:true })
      }
    }
    handleClickOpen = () => {
      this.state.openDialog
      ? this.setState({ openDialog:false })
      : this.setState({ openDialog:true })
    };

    render(){
        const { classes } = this.props;
        return(
          <div>
          <MediaQuery minDeviceWidth={1280}>
          <div className="CommercialVehiclePartsView">
          <Card className={classes.card}>
          <CardActionArea onClick={this.handleClickOpen}>
          <CardMedia className={classes.media} image={this.props.partDetails.imageURL} title={this.props.partDetails.name}/>
          <CardContent>
          <Typography gutterBottom variant="h6" component="h2" className={classes.typography}>
          {this.props.partDetails.name}<br/>
          {this.props.partDetails.company}<br/>
          MRP: {this.props.partDetails.mrp}<br/>
          </Typography>
          </CardContent>
          </CardActionArea>
          <Dialog fullScreen open={this.state.openDialog} onClose={this.handleClickOpen} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
          <Toolbar>
          <IconButton className={classes.close} onClick={this.handleClickOpen} aria-label="Close"><CloseIcon/></IconButton>
          </Toolbar>
          </AppBar>
          <Typography gutterBottom variant="h5" component="h2" className={classes.typography}>
          <Grid container>
          <Grid item xs={6}>
          <div className="CommercialVehiclePartImage">
          <img src={this.props.partDetails.imageURL} height="500px" width="500px" alt={this.props.partDetails.name}/>
          </div>
          </Grid>
          <Grid item xs={6}>
          <div className="CommercialVehiclePartDetails">
          Name: {this.props.partDetails.name}<br/>
          Description: {this.props.partDetails.description}<br/>
          Company: {this.props.partDetails.company}<br/>
          MRP: {this.props.partDetails.mrp}<br/>
          Delivery in {this.props.partDetails.delivery}
          </div>
          </Grid>
          </Grid>
          </Typography>
          <div className="DialogButton">
          {this.props.partDetails.qty===0
          ? <Button variant="flat" disabled className={classes.outofStockButton}>Out of stock</Button>
          : <Button variant="flat" className={classes.button} onClick={this.handleAdd}>Add to cart</Button>}
          </div>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{'aria-describedby': 'message-id'}}
          message={<span id="message-id">You are not signed in</span>}
          action={[<IconButton key="close" aria-label="Close" color="inherit" className={classes.closeDialog} onClick={this.handleClose}>
          <CloseIcon />
          </IconButton>]}/>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
          open={this.state.successSnackbar}
          autoHideDuration={3000}
          onClose={this.handleSuccessClose}
          ContentProps={{'aria-describedby': 'message-id'}}
          message={<span id="message-id">Item added to cart</span>}
          action={[<IconButton key="close" aria-label="Close" color="inherit" className={classes.closeDialog} onClick={this.handleSuccessClose}>
          <CloseIcon />
          </IconButton>]}/>
          </Dialog>
          <CardActions>
          <div className="Button">
          {this.props.partDetails.qty===0
          ? <Button variant="flat" disabled className={classes.outofStockButton}>Out of stock</Button>
          : <Button variant="flat" className={classes.button} onClick={this.handleAdd}>Add to cart</Button>}
          </div>
          </CardActions>    
          </Card>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{'aria-describedby': 'message-id'}}
          message={<span id="message-id">You are not signed in</span>}
          action={[<IconButton key="close" aria-label="Close" color="inherit" className={classes.closeDialog} onClick={this.handleClose}>
          <CloseIcon />
          </IconButton>]}/>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
          open={this.state.successSnackbar}
          autoHideDuration={3000}
          onClose={this.handleSuccessClose}
          ContentProps={{'aria-describedby': 'message-id'}}
          message={<span id="message-id">Item added to cart</span>}
          action={[<IconButton key="close" aria-label="Close" color="inherit" className={classes.closeDialog} onClick={this.handleSuccessClose}>
          <CloseIcon />
          </IconButton>]}/>
          </div>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={1280}>
          <div className="CommercialVehiclePartsViewPortrait">
          <Card className={classes.cardPortrait}>
          <Grid container>
          <Grid item xs={12}>
          <CardActionArea onClick={this.handleClickOpen}>
          <Grid container>
          <Grid item xs={3}>
          <CardMedia className={classes.mediaPortrait} image={this.props.partDetails.imageURL} title={this.props.partDetails.name}/>
          </Grid>
          <Grid item xs={9}>
          <CardContent>
          <Typography gutterBottom variant="body2" component="h2" className={classes.typography}>
          {this.props.partDetails.name}<br/>
          {this.props.partDetails.company}<br/>
          MRP: {this.props.partDetails.mrp}<br/>
          </Typography>
          </CardContent>
          </Grid>
          </Grid>
          </CardActionArea>
          <Dialog fullScreen open={this.state.openDialog} onClose={this.handleClickOpen} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
          <Toolbar>
          <IconButton className={classes.close} onClick={this.handleClickOpen} aria-label="Close"><CloseIcon/></IconButton>
          </Toolbar>
          </AppBar>
          <Typography gutterBottom variant="body1" component="h2" className={classes.typography}>
          <Grid container>
          <Grid item xs={12}>
          <div className="CommercialVehiclePartImage">
          <img src={this.props.partDetails.imageURL} height="250px" width="250px" alt={this.props.partDetails.name}/>
          </div>
          </Grid>
          <Grid item xs={12}>
          <div className="CommercialVehiclePartDetails">
          Name: {this.props.partDetails.name}<br/>
          Description: {this.props.partDetails.description}<br/>
          Company: {this.props.partDetails.company}<br/>
          MRP: {this.props.partDetails.mrp}<br/>
          Delivery in {this.props.partDetails.delivery}
          </div>
          </Grid>
          </Grid>
          </Typography>
          <div className="DialogButton">
          {this.props.partDetails.qty===0
          ? <Button variant="flat" disabled className={classes.outofStockButtonPortrait}>Out of stock</Button>
          : <Button variant="flat" className={classes.buttonPortrait} onClick={this.handleAdd}>Add to cart</Button>}
          </div>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{'aria-describedby': 'message-id'}}
          message={<span id="message-id">You are not signed in</span>}
          action={[<IconButton key="close" aria-label="Close" color="inherit" className={classes.closeDialog} onClick={this.handleClose}>
          <CloseIcon />
          </IconButton>]}/>
          <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
          open={this.state.successSnackbar}
          autoHideDuration={3000}
          onClose={this.handleSuccessClose}
          ContentProps={{'aria-describedby': 'message-id'}}
          message={<span id="message-id">Item added to cart</span>}
          action={[<IconButton key="close" aria-label="Close" color="inherit" className={classes.closeDialog} onClick={this.handleSuccessClose}>
          <CloseIcon />
          </IconButton>]}/>
          </Dialog>
          </Grid>
          </Grid>
          </Card>
          </div>
          </MediaQuery>
          </div>
        )
    }
}
PartsView.propTypes = {
    classes: propTypes.object.isRequired,
  };
export default withStyles(styles)(PartsView);
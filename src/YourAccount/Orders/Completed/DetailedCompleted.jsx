import React,{Component} from 'react'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Particulars from './Particulars'
import MediaQuery from 'react-responsive'
import './Completed.css'

const styles = {
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
      }
  };
  
  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  class DetailedCompleted extends Component{
    constructor(props){
        super(props);
        this.details = propTypes.array;
        this.state = {open:false}
    }
    handleClickOpen = () => {
      this.state.open
      ? this.setState({ open:false })
      : this.setState({ open:true })
      };
    render(){
      const { classes } = this.props;
      return(
        <div className="DetailedCompleted">
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
        </MediaQuery>
        </div>
        )
      }
  }
  DetailedCompleted.propTypes = {
    classes: propTypes.object.isRequired,
  };
  
  export default withStyles(styles)(DetailedCompleted);
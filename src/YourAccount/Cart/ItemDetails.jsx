import React,{Component} from 'react'
import propTypes from 'prop-types'
import firebase from 'firebase'
import { Button, Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MediaQuery from 'react-responsive'
import './Cart.css'

const styles = theme => ({
    card: {
      width: '100%',
    },
    button: {
        fontFamily:'Rubik',
        fontSize:18,
        margin:theme.spacing.unit,
        backgroundColor:'#ffffff',
        color:'#001a66',
        '&:hover': {
          backgroundColor:'#ffff00',
          color:'#001a66'
      }
      },
      buttonPortrait: {
        fontFamily:'Rubik',
        fontSize:14,
        margin:theme.spacing.unit,
        backgroundColor:'#ffffff',
        color:'#001a66',
        '&:hover': {
          backgroundColor:'#ffff00',
          color:'#001a66'
      }
      },
      typography:{
        fontFamily:'Rubik',
        textAlign:'right'
      },
      typographyPortrait:{
        fontFamily:'Rubik',
        textAlign:'right',
        fontSize:15
      },
  });

class ItemDetails extends Component{
    constructor(props){
        super(props);
        this.details = propTypes.array
        this.state = {
            qtyRender:true,qty:''
        }
    }
    editQty = () =>{
        this.state.qtyRender
        ? this.setState({ qtyRender:false })
        : this.setState({ qtyRender:true })
    }
    handleQty = e =>{
        this.setState({ qty:e.target.value })
    }
    addQty = () =>{
        const dbref = firebase.database().ref().child('Users')
        dbref.on('child_added', snap=>{
            if(snap.val().email===firebase.auth().currentUser.email){
                const dbref2 = firebase.database().ref().child('Users/'+snap.key);
                dbref2.update({ cartTotal:snap.val().cartTotal-(parseInt(this.props.details.total))+(parseInt(this.state.qty)*parseInt(this.props.details.mrp))})
                const dbref1 = firebase.database().ref().child('Users/'+snap.key+'/Cart/'+this.props.details.id)
                dbref1.update({qty:this.state.qty,total:parseInt(this.state.qty)*parseInt(this.props.details.mrp)})
            }
        })
        this.setState({qtyRender:true})
    }
    removeItem = () =>{
        const dbref1 = firebase.database().ref('Users');
        dbref1.on('child_added', snap =>{
            if(snap.val().email===firebase.auth().currentUser.email){
                const dbref2 = firebase.database().ref().child('Users/'+snap.key);
                dbref2.update({ cartTotal:snap.val().cartTotal-(parseInt(this.props.details.mrp)*parseInt(this.props.details.qty))})
                const dbref = firebase.database().ref().child('Users/'+snap.key+'/Cart');
                dbref.child(this.props.details.id).remove();
            }
        })
    }
    render(){
        const { classes } = this.props;
        return(
            <div className="ItemDetails">
            <MediaQuery minDeviceWidth={1280}>
            <Card className={classes.card}>
            <CardContent>
            <Grid container>
                <Grid item xs={4}>
                    <img src={this.props.details.imageURL} height="300px" width="300px" alt={this.props.details.name}/>
                </Grid>
                <Grid item xs={8}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.typography}>
                {this.props.details.name}
                </Typography>
                <Typography variant="subtitle1" component="p" className={classes.typography}>
                {this.props.details.description}<br/>
                {this.props.details.company}<br/>
                For:<br/>
                {this.props.details.compatibleWith.type==="Universal"
                ?   <div>Universal</div>
                : <div>
                {this.props.details.compatibleWith.manufacturer} {this.props.details.compatibleWith.model}<br/>
                {this.props.details.compatibleWith.engineOption}<br/>
                </div>} 
                MRP: {this.props.details.mrp}<br/>
                Qty: {this.props.details.qty}<br/>
                Amount {this.props.details.total}<br/>
                </Typography>
                </Grid>
            </Grid>
            </CardContent>
            <CardActions>
            {this.state.qtyRender
            ? <div><Button variant="flat" className={classes.button} onClick={this.editQty}>Edit qty</Button><br/></div>
            : <div>
                <TextField type="number" label="Qty" margin="normal" onChange={this.handleQty} value={this.state.qty}/>
                <Button variant="flat" className={classes.button} onClick={this.addQty}>Edit</Button>
                <Button variant="flat" className={classes.button} onClick={this.editQty}>Back</Button>
            </div>}
            <Button variant="flat" className={classes.button} onClick={this.removeItem}>Remove item</Button>
            </CardActions>
            </Card>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <Card className={classes.card}>
            <CardContent>
            <Grid container>
                <Grid item xs={6}>
                    <img src={this.props.details.imageURL} height="150px" width="150px" alt={this.props.details.name}/>
                </Grid>
                <Grid item xs={6}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.typography}>
                {this.props.details.name}
                </Typography>
                <Typography variant="subtitle1" component="p" className={classes.typographyPortrait}>
                {this.props.details.description}<br/>
                {this.props.details.company}<br/>
                For:<br/>
                {this.props.details.compatibleWith.type==="Universal"
                ? <div>Universal</div>
                : <div>
                {this.props.details.compatibleWith.manufacturer} {this.props.details.compatibleWith.model}<br/>
                {this.props.details.compatibleWith.engineOption}<br/>
                </div>} 
                MRP: {this.props.details.mrp}<br/>
                Qty: {this.props.details.qty}<br/>
                Amount {this.props.details.total}<br/>
                </Typography>
                </Grid>
            </Grid>
            </CardContent>
            <CardActions>
            {this.state.qtyRender
            ? <div><Button variant="flat" className={classes.buttonPortrait} onClick={this.editQty}>Edit qty</Button><br/></div>
            : <div>
                <TextField type="number" label="Qty" margin="normal" onChange={this.handleQty} value={this.state.qty}/>
                <Button variant="flat" className={classes.buttonPortrait} onClick={this.addQty}>Edit</Button>
                <Button variant="flat" className={classes.buttonPortrait} onClick={this.editQty}>Back</Button>
            </div>}
            <Button variant="flat" className={classes.buttonPortrait} onClick={this.removeItem}>Remove item</Button>
            </CardActions>
            </Card>
            </MediaQuery>
            </div>
        )
    }
}
ItemDetails.propTypes = {
    classes: propTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ItemDetails);
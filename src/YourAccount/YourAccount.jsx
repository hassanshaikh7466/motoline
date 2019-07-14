import React,{Component} from 'react'
import firebase from 'firebase'
import propTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import './YourAccount.css'
import SignedIn from './SignedIn'
import { Button } from '@material-ui/core';
import MediaQuery from 'react-responsive'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  button: {
    fontFamily:'Rubik',
      fontSize:20,
      backgroundColor:'#001a66',
      margin:theme.spacing.unit,
      color:'#ffffff',
      '&:hover': {
        backgroundColor:'#ffff00',
        color:'#001a66'
    }
  },
  buttonPortrait: {
    fontFamily:'Rubik',
      fontSize:15,
      backgroundColor:'#001a66',
      margin:theme.spacing.unit,
      color:'#ffffff',
      '&:hover': {
        backgroundColor:'#ffff00',
        color:'#001a66'
    }
  },
  progress:{
    color:'#ffff00'
}
})

class YourAccount extends Component{
    constructor(props){
        super(props);
        this.state = {
          user:null,users:[],isLoaded:false
        }
    }
    componentWillMount(){
      this.setState({isLoaded:true})
      const dbref = firebase.database().ref().child('Users');
      const users = [];
      dbref.on('child_added', snap=>{
        users.push({
          id:snap.key,
          email:snap.val().email
        })
        this.setState({users})
      })
      const auth = firebase.auth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user:user });
        }else{
          this.setState({ isLoaded:false})
        }  
      });
    }
    handleSignIn = () =>{
      this.setState({isLoaded:true})
      const provider = new firebase.auth.GoogleAuthProvider();
      const auth = firebase.auth();
      auth.signInWithPopup(provider).then((result) => {
        const user = result.user;
        this.setState({user});
        const usersAr = this.state.users
        const dbref = firebase.database().ref().child('Users');
        var exists = false;
        for(var i=0;i<usersAr.length;i++){
          if(usersAr[i].email===user.email){
            exists=true;
          }
        }
        if(!exists){
          dbref.push().set({name:user.displayName,email:user.email,type:'Individual',cartTotal:0,points:0,pointsRedeemed:0})
        }
      })
    }
    handleSignOut = () =>{
      this.setState({user:null,isLoaded:false})
    }
    render(){
      const { classes } = this.props;
        return(
            <div className="YourAccount">
            {this.state.isLoaded
            ? this.state.user!==null
              ? <div className="SignedIn">
                <SignedIn handleSignOut={this.handleSignOut}/>
                </div>
              :<div className="NotLoaded">
              <CircularProgress className={classes.progress}/>
              </div>
            : <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="NotSignedIn">
              You are not signed in<br/>
              <Button variant="flat" className={classes.button} onClick={this.handleSignIn}>Sign in with google</Button>
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="NotSignedInPortrait">
              You are not signed in<br/>
              <Button variant="flat" className={classes.buttonPortrait} onClick={this.handleSignIn}>Sign in with google</Button>
              </div>
            </MediaQuery>
            </div>}
            </div>
        )
    }
}
YourAccount.propTypes = {
  classes: propTypes.object.isRequired,
};
export default withStyles(styles)(YourAccount);
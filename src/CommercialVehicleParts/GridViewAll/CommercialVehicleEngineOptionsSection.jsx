import React,{Component} from 'react'
import firebase from 'firebase'
import propTypes from 'prop-types'
import EngineOptionsGrid from './EngineOptionsGrid'
import MediaQuery from 'react-responsive';
import Grid from '@material-ui/core/Grid'
import './GridViewAll.css'

class CommercialVehicleEngineOptionsSection extends Component{
    constructor(props){
        super(props);
        this.model = propTypes.string
        this.state = {engineOptions:[]}
    }
    componentWillMount(){
        const dbref = firebase.database().ref().child(this.props.model);
        const engineOptions = [];
        dbref.on('child_added', snap =>{
            engineOptions.push({
                id:snap.key,
                name:snap.val().name,
                imageURL:snap.val().imageURL
            })
            this.setState({ engineOptions })
        })
    }
    engineOptionInput = e =>{ this.props.handleData(e) }
    render(){ 
        return(
            <div className="CommercialVehicleEngineOptionsSection">
            <MediaQuery minDeviceWidth={1280}>
            <Grid container>
            {this.state.engineOptions.map(p=>
            <Grid item xs={12} key={p.id}>
            <EngineOptionsGrid  name={p.name} handleData={this.engineOptionInput}/>
            </Grid>)}
            </Grid>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <Grid container>
            {this.state.engineOptions.map(p=>
            <Grid item xs={12} key={p.id}>
            <EngineOptionsGrid  name={p.name} handleData={this.engineOptionInput}/>
            </Grid>)}
            </Grid>
            </MediaQuery>
            </div>

        )
    }
}
CommercialVehicleEngineOptionsSection.propTypes = {
    classes: propTypes.object.isRequired,
  };
  
export default CommercialVehicleEngineOptionsSection
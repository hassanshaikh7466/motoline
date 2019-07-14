import React,{Component} from 'react'
import firebase from 'firebase'
import './GridViewAll.css'
import {Grid } from '@material-ui/core';
import YourCars from './YourCars';
import CarPartCategorySection from './CarPartCategorySection'
import CarManufacturerSection from './CarManufacturerSection';
import CarModelSection from './CarModelSection';
import MediaQuery from 'react-responsive'
import PartCategories from './PartCategories';
import Slide from '@material-ui/core/Slide'

class GridViewAll extends Component{
    constructor(props){
        super(props);
        this.state = {
            manufacturer:'',manufacturerRender:true,
            model:'',modelRender:false,
            engineOption:'',engineOptionRender:false,
            partCategoriesRender:false, partCategory:'',
            yourCars:[],yourCarsRender:true
        }
    }
    
    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(!!user){
                const dbref1 = firebase.database().ref('Users');
                dbref1.on('child_added', snap =>{
                if(snap.val().email===firebase.auth().currentUser.email){
                    const dbref2 = firebase.database().ref().child('Users/'+snap.key+'/Cars');
                    const yourCars = [];
                    dbref2.on('child_added', snap=>{
                        yourCars.push({
                            id:snap.key,
                            manufacturer:snap.val().manufacturer,
                            model:snap.val().model,
                            engineOption:snap.val().engineOption,
                            imageURL:snap.val().imageURL
                        });
                        this.setState({yourCars})
                    })
                    }
                })
            }
        })
        
    }
    manufacturerInput = e =>{
        this.setState({ 
            manufacturer:e,modelRender:true,
            manufacturerRender:false,engineOptionRender:false,
            yourCarsRender:true
        })
    }
    manufacturerBack = () =>{
        this.setState({
            manufacturerRender:true,modelRender:false,
            engineOptionRender:false,partCategoriesRender:false,
            yourCarsRender:true
        })
    }
    modelInput = (e1,e2) =>{
        this.setState({
            model:e1,engineOption:e2,modelRender:false,
            manufacturerRender:false,engineOptionRender:true,
            partCategoriesRender:false,yourCarsRender:false
        })
    }
    modelBack = () =>{
        this.setState({
            manufacturerRender:false,modelRender:true,
            engineOptionRender:false,partCategoriesRender:false,
            yourCarsRender:true
        })
    }
    handlePartCategory = e =>{
        this.setState({
            partCategory:e,manufacturerRender:false,
            modelRender:false,engineOptionRender:false,
            partCategoriesRender:true,yourCarsRender:false
        })
    }
    engineOptionBack = () =>{
        this.setState({
            manufacturerRender:false,modelRender:false,
            engineOptionRender:true,partCategoriesRender:false,
            yourCarsRender:false
        })
    }
    handleYourCar = e =>{
        const yourCars = this.state.yourCars;
        for(var i=0;i<yourCars.length;i++){
            if(yourCars[i].id===e){
                this.setState({
                    manufacturer:yourCars[i].manufacturer,
                    model:yourCars[i].model,
                    engineOption:yourCars[i].engineOption,
                    manufacturerRender:false,
                    modelRender:false,
                    engineOptionRender:true,
                    partCategoriesRender:false,
                    yourCarsRender:false
                })
            }
        }
    }
    yourCarsBack = () =>{
        this.setState({
            manufacturerRender:true,
            modelRender:false,
            engineOptionRender:false,
            partCategoriesRender:false,
            yourCarsRender:true
        })
    }
    
    render(){
        return(
            <div className="CarPartsGridView">
            {this.state.yourCars.length!==0
            ? <div className="YourCarsSection">
            {this.state.yourCarsRender
            ? <div>
                <MediaQuery minDeviceWidth={1280}>
            <h2>Your cars</h2>
            <Grid container>
            {this.state.yourCars.map(p=>
            <Grid item xs={3} key={p.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <YourCars details={p} handleData={this.handleYourCar}/>
            </Slide>
            </Grid>)}
            </Grid>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <h4>Your cars</h4>
            <Grid container>
            {this.state.yourCars.map(p=>
            <Grid item xs={12}  key={p.id}>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={500}>
            <YourCars details={p} handleData={this.handleYourCar}/>
            </Slide>
            </Grid>)}
            </Grid>
            </MediaQuery>
            </div>
            : null}
            </div>
            : null}
            {this.state.manufacturerRender
            ? <CarManufacturerSection handleData={this.manufacturerInput}/>
            :null}
            {this.state.modelRender
            ? <CarModelSection manufacturer={this.state.manufacturer} handleData={this.modelInput} handleManufacturerBack={this.manufacturerBack}/>
            : null}
            {this.state.engineOptionRender
            ? <PartCategories handleData={this.handlePartCategory} handleManufacturerBack={this.manufacturerBack} handleModelBack={this.modelBack}/>
            : null}
            {this.state.partCategoriesRender
            ?<CarPartCategorySection 
                manufacturer={this.state.manufacturer} model={this.state.model} engineOption={this.state.engineOption} partCategory={this.state.partCategory}
                handleManufacturerBack={this.manufacturerBack} handleModelBack={this.modelBack} handleEngineOptionBack={this.engineOptionBack} handleYourCarsBack={this.yourCarsBack}/>
            :null}
            </div>
        )
    }
}
  
export default GridViewAll
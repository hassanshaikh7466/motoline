import React,{Component} from 'react'
import propTypes from 'prop-types'
import './GridViewAll.css'
import CommercialVehicleManufacturersSection from './CommercialVehicleManufacturersSection';
import CommercialVehicleModelsSection from './CommercialVehicleModelsSection';
import PartCategories from './PartCategories'
import CommercialVehiclePartCategorySection from './CommercialVehiclePartCategorySection';

class CommVehGridViewAll extends Component{
    constructor(props){
        super(props);
        this.classes = propTypes.classes
        this.state = {
            manufacturer:'',manufacturerRender:true,
            model:'',modelRender:false,
            engineOption:'',engineOptionRender:false,
            partCategory:'',partCategoriesRender:false
        }
    }
    manufacturerInput = e =>{
        this.setState({ 
            manufacturer:e,modelRender:true,
            manufacturerRender:false,engineOptionRender:false
        })
    }
    manufacturerBack = () =>{
        this.setState({
            manufacturerRender:true,modelRender:false,
            engineOptionRender:false,partCategoriesRender:false
        })
    }
    modelInput = (e1,e2) =>{
        this.setState({
            model:e1,engineOption:e2,
            modelRender:false,manufacturerRender:false,
            engineOptionRender:true
        })
    }
    modelBack = () =>{
        this.setState({
            manufacturerRender:false,modelRender:true,
            engineOptionRender:false,partCategoriesRender:false
        })
    }
    handlePartCategory = e =>{
        this.setState({
            partCategory:e,manufacturerRender:false,
            modelRender:false,engineOptionRender:false,
            partCategoriesRender:true
        })
    }
    engineOptionBack = () =>{
        this.setState({
            manufacturerRender:false,modelRender:false,
            engineOptionRender:true,partCategoriesRender:false
        })
    }
    render(){ 
        return(
            <div className="CommercialVehiclePartsGridView">
            {this.state.manufacturerRender
            ?<CommercialVehicleManufacturersSection handleData={this.manufacturerInput}/>
            : null}
            {this.state.modelRender
            ? <CommercialVehicleModelsSection manufacturer={this.state.manufacturer} handleData={this.modelInput} handleManufacturerBack={this.manufacturerBack}/>
            : null}
            {this.state.engineOptionRender
            ? <PartCategories handleData={this.handlePartCategory} handleManufacturerBack={this.manufacturerBack} handleModelBack={this.modelBack}/>
            : null}
            {this.state.partCategoriesRender
            ? <CommercialVehiclePartCategorySection 
                manufacturer={this.state.manufacturer} model={this.state.model} engineOption={this.state.engineOption} partCategory={this.state.partCategory}
                handleManufacturerBack={this.manufacturerBack} handleModelBack={this.modelBack} handleEngineOptionBack={this.engineOptionBack} handleYourCarsBack={this.yourCarsBack}/>
            :null}
            </div>
        )
    }
}
  
export default CommVehGridViewAll
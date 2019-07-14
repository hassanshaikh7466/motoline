import React,{Component} from 'react'
import firebase from 'firebase'
import DetailedCanceled from './DetailedCanceled'
import { Divider } from '@material-ui/core';
import MediaQuery from 'react-responsive'
import './Canceled.css'

class Canceled extends Component{
    constructor(props){
        super(props);
        this.state = {orders:[]}
    }
    componentWillMount(){
        const dbref = firebase.database().ref().child('Orders'); 
        const orders = []
        dbref.on('child_added', snap=>{
            orders.push({
                id:snap.key,
                OrderID:snap.val().OrderID,
                email:snap.val().email,
                date:snap.val().date,
                address:snap.val().address,
                particulars:snap.val().particulars,
                status:snap.val().status,
                total:snap.val().total
            })
            for(var i=0;i<orders.length;i++){
                if(firebase.auth().currentUser.email!==orders[i].email || orders[i].status!=="Canceled"){
                    orders.splice(i,1)
                }
            }
            this.setState({ orders })
        })
        dbref.on('child_changed', snap=>{
            if(snap.val().status==="Canceled"){
                orders.push({
                    id:snap.key,
                    OrderID:snap.val().OrderID,
                    email:snap.val().email,
                    date:snap.val().date,
                    address:snap.val().address,
                    particulars:snap.val().particulars,
                    status:snap.val().status,
                    pointsRedeemed:snap.val().pointsRedeemed,
                    total:snap.val().total
                })
            }
            this.setState({ orders })
        })
    }
    render(){
        return(
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="Cancelled">
            Cancelled
            <Divider/>
            {this.state.orders.length!==0
            ? <div className={this.state.orders.length>2 ? "CancelledMore" :"CancelledLess"}>
            {this.state.orders.reverse().map(p=>
            <DetailedCanceled key={p.id} details={p}/>)}
            </div>
            : <div className="IfCancelledEmpty">
                No orders found
            </div>}
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="CancelledPortrait">
            Cancelled
            <Divider/>
            {this.state.orders.length!==0
            ? <div className={this.state.orders.length>2 ? "CancelledMore" :"CancelledLess"}>
            {this.state.orders.reverse().map(p=>
            <DetailedCanceled key={p.id} details={p}/>)}
            </div>
            : <div className="IfCancelledEmpty">
                No orders found
            </div>}
            </div>
            </MediaQuery>
            </div>
        )
    }
}
export default Canceled;
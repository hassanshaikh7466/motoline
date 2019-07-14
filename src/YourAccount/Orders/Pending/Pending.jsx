import React,{Component} from 'react'
import firebase from 'firebase'
import DetailedPending from './DetailedPending'
import { Divider } from '@material-ui/core';
import MediaQuery from 'react-responsive'
import './Pending.css'

class Pending extends Component{
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
                date:snap.val().date,
                email:snap.val().email,
                address:snap.val().address,
                particulars:snap.val().particulars,
                status:snap.val().status,
                pointsRedeemed:snap.val().pointsRedeemed,
                total:snap.val().total
            })
            for(var i=0;i<orders.length;i++){
                if(firebase.auth().currentUser.email!==orders[i].email || orders[i].status!=="Pending"){
                    orders.splice(i,1)
                }
            }
            this.setState({ orders })
        })
        dbref.on('child_changed', snap=>{
            for(var i=0;i<orders.length;i++){
                if(orders[i].id===snap.key){
                    if(snap.val().status==="Completed" || snap.val().status==="Canceled"){
                        orders.splice(i,1)
                    }
                }
            }
            this.setState({ orders })
        })
    }
    render(){
        return(
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="Pending">
            Pending
            <Divider/>
            {this.state.orders.length!==0
            ? <div className={this.state.orders.length>2 ? "PendingMore" :"PendingLess"}>
            {this.state.orders.reverse().map(p=>
                <DetailedPending key={p.id} details={p}/>)}
            </div>
            : <div className="IfPendingEmpty">
                No orders found
            </div>}
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="PendingPortrait">
            Pending
            <Divider/>
            {this.state.orders.length!==0
            ? <div className={this.state.orders.length>2 ? "PendingMore" :"PendingLess"}>
            {this.state.orders.reverse().map(p=>
                <DetailedPending key={p.id} details={p}/>)}
            </div>
            : <div className="IfPendingEmpty">
                No orders found
            </div>}
            </div>
            </MediaQuery>
            </div>
        )
    }
}
export default Pending;
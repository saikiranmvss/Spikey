import {  useState , useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import $ from "jquery";
import './Allusers.css';
import './css/fontawesome/css/all.css';
import './css/fontawesome/css/all.min.css';

function Users(){          

const [usersprint,userState]= useState([]);

  useEffect(() => {
    axios.post('http://192.168.0.144:9999/usersdata',{id:$('#userids').val()}).then((response) => {      
      userState(response.data.allUsesrsName);
    }); 
  }, []);

    return (

<div className="container user_container" style={{position:"relative",height: "93vh",overflow: "scroll"}}>
<div className="row" >
{usersprint.map(function (item,index){
              return  <div key={item.user_id} className="col-12 tiles">
          <Link className="clearfix row users_link"
        to={{
          pathname:"/Chatwindow",
          search: "?id="+item.user_id, 
          state: { fromDashboard: true }
        }}>  
        
          <div className="col-3">
             <img className="pro_pics" src={process.env.PUBLIC_URL+"default.png"} alt="" /> 
          </div>
          <div className="col-6 line-space msg-text"><strong >{item.name}</strong></div>
          <div className="col-3 line-space"></div>
        </Link>
      </div>
       })}
</div>
</div>


    )


}

export default Users;
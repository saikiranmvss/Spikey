import './Settings.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useNavigate , useLocation} from "react-router-dom";
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
// import './css/core.min.css';
// import './css/all.min.css';
import $ from 'jquery';
import axios from 'axios';
import Cookies from 'universal-cookie';
var cookies = new Cookies();
// import $ from 'jquery';

var navigate='';
function logout(){
  // axios.post('http://192.168.0.144:9999/logout_user').then((response)=>{
  //   sessionStorage.setItem('userId','');
  // })  
  localStorage.setItem('userIds','');
  navigate('/');
}
var location='';
const Settings = () => {  
navigate=useNavigate();
location = useLocation();
useEffect(()=>{
  
},[])

return (
  //   <div>
//   <div className="settings-main-back">
//   <div className="prof-container">
//      <div className="img-border" style={{border:'5px solid rgb(255 255 255)',borderRadius:'60px'}}>
//   <img src="test.jpg" width="100" height="100" style={{borderRadius:'60px'}} />
// </div>
//   <h4 className="settings-name">john Doe</h4>
//   </div>
//   </div>
// <div className="tile-items-settings">
// <div className="settings-tiles"><FontAwesomeIcon icon={faEdit} /><p className="settings-tile-name">Edit profile</p><i className="fa fa-angle-right"></i></div>
// <div className="settings-tiles"><FontAwesomeIcon icon={faGear} /><p className="settings-tile-name">Settings</p><i className="fa fa-angle-right"></i></div>
// <div className="settings-tiles"><FontAwesomeIcon icon={faLock} /><p className="settings-tile-name">Change Password</p><i className="fa fa-angle-right"></i></div>
// <div onClick={logout} className="settings-tiles"><FontAwesomeIcon icon={faSignOut} /><p className="settings-tile-name"  >Logout</p><i className="fa fa-angle-right"></i></div>
// </div>
// </div>
<div className="container-fluid body-div">
<div className='row settings-header'>
    <div className="col-6 user-name">Test</div>
    <div className="col-6"><div style={{backgroundImage: "url('"+process.env.PUBLIC_URL+"sample.jpeg')"}} className="pro_pic"></div></div>
</div>
<div className="row tiles-row">
{/* <div className="col-6" style={{padding:"0px 0px 0px 10px"}}>
    <div className="setting-tiles"> profile <i style={{color:"#008aff"}} className="fa fa-user" aria-hidden="true"></i></div>
    <div className="setting-tiles"> password <i style={{color:"#3094c0"}} className="fa fa-key" aria-hidden="true"></i></div>
</div>
<div className="col-6" style={{padding:"0px 5px 0px 5px"}}>
<div className="setting-tiles">app settings <i style={{color:"green"}} className="fa-solid fa-globe"></i>
</div>            
<div className="setting-tiles">logout <i style={{color:"#ff9600"}} className="fas fa-sign-out-alt"></i></div> */}

<div className="setting-tiles"> Profile <i style={{color:"#008aff"}} className="fa fa-user" aria-hidden="true"></i></div>
<div className="setting-tiles"> Password <i style={{color:"#3094c0"}} className="fa fa-key" aria-hidden="true"></i></div>                    
<div className="setting-tiles">Settings <i style={{color:"green"}} className="fa-solid fa-globe"></i></div>
<div className="setting-tiles">Info <i style={{color:"#7e7e7e"}} className="fa fa-info-circle"></i></div>
<div className="setting-tiles" onClick={logout}>Logout <i style={{color:"#ff9600"}} className="fas fa-sign-out-alt"></i></div> 
</div>
</div>
)
}
export default Settings;
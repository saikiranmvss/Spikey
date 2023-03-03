import './Signup.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom";
// import $ from 'jquery';

function Signup(){
    return(
        
        <div className="container signup_container d-flex align-items-center wh-logs">
        <div className="row form-box">
            <div className="col-12 title-text">SIGNUP FORM</div>
            <div className="col-12"><input className="form-control" type="text" placeholder="Name" /></div>
            <div className="col-12"><input className="form-control" type="email" placeholder="Email Address" /></div>
            <div className="col-12"><input className="form-control" type="tel" placeholder="Phone Number" /></div>
            <div className="col-12"><textarea className="form-control" placeholder="Address"></textarea></div>
            <div className="col-12"><input className="form-control" type="password" placeholder="Password" /></div>
            <div className="col-12"><input className="form-control" type="password" placeholder="Confirm Password" /></div>
            <div className="col-12" style={{marginBottom:'1rem'}}><input style={{background:'rgb(27, 45, 65)'}} className="signup_button btn btn-primary" type="button" value="REGISTER" /><span>Already have an account ? <strong><Link to='/'>Login</Link></strong></span></div>
        </div>          
              </div>
              
    )
};

export default Signup;
import "./css/bottomnav/style.css";
import "./css/bottomnav/demo.css";
import "./js/script.js";
import $ from 'jquery';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome } from '@fortawesome/free-solid-svg-icons'
// import { faUsers } from '@fortawesome/free-solid-svg-icons'
// import { faGear } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';

function Footer(){

    const navbarEvent = (event) => {        
        $('.mobile-bottom-nav__item').each(function(){
            $(this).removeClass('mobile-bottom-nav__item--active');        
			$(this).find('i').css('color','');    
        })            
        $(event.target).closest('.mobile-bottom-nav__item').addClass('mobile-bottom-nav__item--active');        
		$(event.target).closest('.mobile-bottom-nav__item').find('i').css('color','#20485a');
    }

return(
<div className="container mobile-bottom-nav" style={{position:"relative"}}>
	<div className="row bottom-nav">
	<input type="hidden" id="userids" />
	<div onClick={navbarEvent} className="col-4 mobile-bottom-nav__item mobile-bottom-nav__item--active"><Link to='/Allusers'><i style={{color:"black"}} className="fa-solid fa-house"></i></Link></div>	
	<div onClick={navbarEvent} className="mobile-bottom-nav__item col-4"><Link to='/Allusers'><i className="fa-solid fa-user-group"></i></Link></div>   
	<div onClick={navbarEvent} className="mobile-bottom-nav__item col-4"><Link to='/Users'><i className="fa-solid fa-user-group"></i></Link></div>          
	<div onClick={navbarEvent} className="mobile-bottom-nav__item col-4"><Link to='/Settings'><i className="fa-solid fa-gear"></i></Link></div>          
 </div>
 </div>

)
}
export default Footer;
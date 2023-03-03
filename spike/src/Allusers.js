import {  useState , useEffect ,useContext} from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import './Allusers.css';
import { useNavigate ,useSearchParams , useLocation} from "react-router-dom";
import axios from "axios";
import {SocketContext} from './App';

var id='';
var mainMsg='';
var  socket='';
var ids='';
var el='';
function Allusers(){          
  const {state} = useLocation();
  const navigate = useNavigate();
  const [user,userState]= useState([]);  
   useEffect(() => {        
     var id= localStorage.getItem("userIds");
      ids= localStorage.getItem("userIds");      

      socket.off('received_msg').on('received_msg',function(data){        
        
        var nowMsgTime=new Date().getHours()+':'+new Date().getMinutes();

        $('#messages_div').append('<div class="msg_sent_div" >'+data[0]+'</div>');        
        if($('#msg_view').val()==data[2]){        
          socket.emit('update_msg',[localStorage.getItem("userIds"),data[2],data[3],1]);
          $('#msg_text'+data[2]).html(data[0]);
          $('#user-msg-time-'+data[2]).html(nowMsgTime);
        }else{
          socket.emit('update_msg',[localStorage.getItem("userIds"),data[2],data[3],0]);
          $('#msg_text'+data[2]).html('<strong>'+data[0]+'</strong>');
          $('#user-msg-time-'+data[2]).html('<strong>'+nowMsgTime+'</strong>');
        }
        
        el=document.getElementById('messages_div');      
        if(el){
          el.scrollTop = el.scrollHeight;
        }      
      })

     if(id=='' || id==undefined || id==null){
      navigate('/');
     }
 
    $('.mobile-bottom-nav').show();
    axios.post('http://192.168.0.144:9999/allusersdata',{id:localStorage.getItem('userIds')}).then((response) => {          
      if(response.data.allUsers!==''){
        userState(response.data.allUsers);
        socket.emit('loggedin',ids);
      }else{      
      }      

    });
  }, []);
  socket = useContext(SocketContext);   
  return (  
    <div className="container alluser_container" style={{position:"relative",height: "93vh",overflow: "scroll"}}>
    <div className="row" >
    {user.map(function (item,index){
      if(item.receiver_status==0 && item.receiver_id==localStorage.getItem("userIds") ){
        mainMsg=<strong>{item.msg_content}</strong>;
      }else{
        mainMsg=item.msg_content;
      }

      var date=item.msg_createddate;
      var Today=new Date();
      var now = new Date();
      var yesterday= now.setDate(now.getDate()-1);
      var dayBefore=now.setDate(now.getDate()-1);

      var actYesterday= new Date( new Date(yesterday).getFullYear(),new Date(yesterday).getMonth(),new Date(yesterday).getDate(),23,59,59 );
      var yesterdayTime= actYesterday.getTime();
      
      var actDaybefore= new Date( new Date(dayBefore).getFullYear(),new Date(dayBefore).getMonth(),new Date(dayBefore).getDate(),23,59,59 );

      var dateTime= new Date(date).getTime();

      var todayTime= Today.getTime();

      var actToday=new Date( new Date(Today).getFullYear(),new Date(Today).getMonth(),new Date(Today).getDate(),23,59,59 );

      if(dateTime>=yesterdayTime && dateTime <=actToday.getTime()){
        var disTime=new Date(date).getHours()+':'+new Date(date).getMinutes();
      }else if(dateTime>=actDaybefore && dateTime <= yesterdayTime){
        var disTime='Yesterday';
      }else{
        var disTime=(new Date(date)).getDate()+'/'+(new Date(date)).getMonth()+'/'+(new Date(date)).getFullYear();
      }


            return <div key={item.user_id} className="col-12 tiles">
              <Link className="allusers_link clearfix row"
            to={{
              pathname:"/Chatwindow",
              search: "?id="+item.user_id, 
              state: { fromDashboard: true }
            }}>  
              <div className="col-3">
                <div className="pro_pics" style={{backgroundImage: 'url('+process.env.PUBLIC_URL+'"default.png")'}}></div>             
              </div>
              <div className="col-6 line-space msg-text"><strong >{item.name}</strong><p id={'msg_text'+item.user_id}>{mainMsg}</p></div>
              <div className="col-3 line-space"><p className='time-allusers' id={"user-msg-time-"+item.user_id}>{disTime}</p></div>
    
            </Link>
          </div>
           })}
    </div>
    </div>
        )

//     return (   
// <div className="container alluser_container" style={{position:"relative",height: "93vh",overflow: "scroll"}}>
// <div className="row" >
// {user.map(function (item,index){
//         return <div key={item.user_id} className="col-12 tiles">
//           <Link className="clearfix"
//         to={{
//           pathname:"/Chatwindow",
//           search: "?id="+item.user_id, 
//           state: { fromDashboard: true }
//         }}>  
//         <div className="row" >
//           <div className="col-3">
//              <img className="pro_pics" src={process.env.PUBLIC_URL+"default.png"} alt="" /> 
//           </div>
//           <div className="col-6 line-space msg-text"><strong >{item.name || <Skeleton /> }</strong><p>{item.msg_content || <Skeleton /> }</p></div>
//           <div className="col-3 line-space"><p>Just now</p></div>
//         </div>
//         </Link>
//       </div>
//        })}
// </div>
// </div>
//     )
    
      }


export default Allusers;
import './Chatwindow.css';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useEffect , useContext , useRef , useState } from 'react';
import $ from "jquery" ;
import axios from 'axios';
import {SocketContext} from './App';

var socket='';
var el='';
function sendmessage(){  
  el=document.getElementById('messages_div');

  var msg=$('#message').val();
  if(msg!=''){       
  $('#messages_div').append('<div class="msg_rec_div">'+msg+'</div>');
  $('#message').val('');
  socket.emit('send_message',[msg,id,ownId]);
  }else{
    return false;
  }  
  el.scrollTop = el.scrollHeight;
}
 

var id='';
var ownId='';

function Chatwindow(){            
  socket = useContext(SocketContext);
  
  useEffect(()=>{   
    $('.mobile-bottom-nav').hide();

    // socket.off('received_msg').on('received_msg',function(data){      
    //   console.log('test');
    //   $('#messages_div').append('<div class="msg_sent_div" >'+data[0]+'</div>');        
    //   if($('#msg_view').val()==data[2]){        
    //     socket.emit('update_msg',[localStorage.getItem("userIds"),data[2],data[3],1]);
    //     $('#msg_text'+data[2]).html(data[0]);        
    //   }else{
    //     socket.emit('update_msg',[localStorage.getItem("userIds"),data[2],data[3],0]);
    //     $('#msg_text'+data[2]).html('<strong>'+data[0]+'</strong>');
    //   }
      
    //   el=document.getElementById('messages_div');      
    //   if(el){
    //     el.scrollTop = el.scrollHeight;
    //   }      
    // })

  },[socket])

  const [searchParams, setSearchParams] = useSearchParams();

  id = searchParams.get('id');  
  $('#msg_view').val(id);
  ownId=localStorage.getItem("userIds");

const [user_chat , user_chats] = useState([]);
const [user_name , user_names ] = useState([]);
const messageEl = useRef(null);
const [msgs , msg ] = useState([]);

useEffect(()=>{

  $(document).on('keypress',function(e) {
    if(e.which == 13) {
      sendmessage();   
    }
});


axios.post('http://192.168.0.144:9999/user_chat',{id:id,ownId:ownId}).then((response) =>{  
  el=document.getElementById('messages_div');
  var dataBack=response;  
  if(dataBack.data.chat_return1.length!=0){
    user_chats(dataBack.data.chat_return1);  
  }  
  if(dataBack.data.chat_return2.length!=0){
    user_names(dataBack.data.chat_return2);
  }    
  if(dataBack.data.displayMsgArray.length!=0){
    $('#messages_div').html(dataBack.data.displayMsgArray[0]);
  }  
  // el.scrollIntoView({block: "start"});  
  el.scrollTop = el.scrollHeight;
  })

},[])
    return(      
      <div>
      <div className="main-body">
<div style={{background:'white',padding: "0px 20px 2px 5px",borderBottom: "2px solid #fff7f7",display:"flex"}}>
      <div className="aligned-center">
        <input type="hidden" id="msg_view" />
      <div className="aligned-center">
      <div className="head-text">
      <Link to={{pathname:'/Allusers'}}> <i className="fa-solid fa-angle-left"></i></Link>  
      </div>
          <div className="head-text">
              <div style={{backgroundImage: "url(../default.png)",backgroundRepeat: "no-repeat",backgroundPosition:"center",borderRadius:"60px",backgroundSize:"cover"}}><div style={{height:"60px",width:"60px"}}></div></div>
          </div>
          <div className="head-text">
              
              { 
    
    user_name.map(function (item,index){
   return <div style={{fontSize: "20px"}} key={item.user_id}>{item.name}</div>
    })
    
    }
              </div>
          </div>
          </div>
          <div style={{display:" flex",alignItems:"center"}}>
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
          </div>                
      </div>        
  </div>  
<div className="chat-head" id="messages_view">
  <div className="chat-body" id="messages_div">  
  </div>  
  <div className="footer_chatbox">
      <div className="footer_chatitems">
          <textarea type="text" rows="1" id="message" placeholder="Type message..." style={{outline: "none",border: "none",borderBottom: "1px solid #6c6565",width: "66%"}}></textarea>
          <i className="fa-sharp fa-solid fa-face-smile"></i>
          <i className="fa-solid fa-paperclip"></i>
          <i className="fa-sharp fa-solid fa-paper-plane" onClick={sendmessage}></i>                
      </div>
  </div>
  </div>  
  </div>  

    )
}

export default Chatwindow;
import React,{useEffect} from 'react'

import ToolbarComponent from "../components/Toolbar";
import DrawerComponent from "../components/Drawer";
import {useHistory} from 'react-router-dom';

function Home(props) {
  const user=JSON.parse(localStorage.getItem("token"));
  const history=useHistory();
  useEffect(()=>{
    if(!user){
      history.push('/Signin');
    }
  },[])
    return (
        <div>
           <ToolbarComponent openDrawerHandler={props.openDrawer} />
        <DrawerComponent
          left={props.left}
          toggleDrawerHandler={props.toggleDrawer}
        />
        </div>
    )
}

export default Home

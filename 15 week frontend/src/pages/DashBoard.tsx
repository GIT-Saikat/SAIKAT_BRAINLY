
import { useEffect, useState } from 'react'
import "../App.css"

import { Card } from '../componenets/Card'
import { CreateContentModal } from '../componenets/CreateContent'
import { PlusIcon } from '../icons/plus'
import { ShareIcon } from '../icons/share'
import { SideBar } from '../componenets/Sidebar'
import { Button } from '../componenets/Button'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'



function DashBoard() {
  
  const [modalOpen,setModalOpen]=useState(false);
  const {contents,refresh}=useContent();

  useEffect(()=>{
    refresh();
  },[modalOpen])

  return <div >

    <SideBar />
    <div className='p-4 ml-72 min-h-screen  bg-gray-100 border-2'>
      <CreateContentModal open={modalOpen} onClose={()=>{
        setModalOpen(false);
      }}/>


      <div className='flex justify-end gap-4'>
        <Button onClick={()=>{
          setModalOpen(true)
        }} variant="Primary" text="Add Content" startIcon={<PlusIcon />}></Button>

        <Button onClick={async ()=>{
          const response =  await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
            share:true
          },{
            headers:{
              "Authorization":localStorage.getItem("token")
            }
          });
          const  shareUrl = `http://localhost:5173/share/${response.data.hash}`;
          // Use copy to clipboard instead of alert[Symbol]...its  better
          alert(shareUrl);
        }} variant="Secondary" text="Share Brain" startIcon={<ShareIcon />}></Button>
      </div>


      <div className='flex gap-4 flex-wrap-reverse'>
        
        {contents.map(({type,link,title})=><Card 
          type={type}
          link={link} 
          title={title}/>)}
        {/* <Card type="youtube" link="https://www.youtube.com/embed/fh3G-K-kn3Q?si=x-Xy7t-O531O4Ieo" title="Random Motivation video"/> */}

        
      </div>
    </div>

    
  </div>
    
}  

export default DashBoard


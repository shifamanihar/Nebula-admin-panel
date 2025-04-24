import React, { useState } from 'react'
import './User.css'
import user from '../../../Images/Users/user.png'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

export default function User() {

    const tabs = ['Overview', 'Settings'];
  const [activeTab, setActiveTab] = useState('Overview');
  return (
    <>
        <div className='user-wrapper'>
           
           <div className="setting-list">
                {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`tab-btn mx-2 mt-2 ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                    >
                {tab}
                </button>
            ))}

            
           </div>

           <div className="content-container mt-4">
               <div className="user-details p-4">   
                    <div className="details-box1 d-flex justify-content-between ">
                        <h5>Shubham Musale</h5>
                        <img src={user} alt="" className='user-image'/>
                    </div>
                    <div className="details-box2 text-secondary ">
                        <AccountCircleOutlinedIcon/><span className='ms-2'>Admin</span>
                        <LocationOnOutlinedIcon className='ms-3'/><span className='ms-2'>SF, Bay Area</span>
                        <EmailOutlinedIcon className='ms-3'/><span className='ms-2'>shubhammusale111@gamil.com</span>
                    </div>
               </div>
           </div>
        </div>  
    </>
  )
}

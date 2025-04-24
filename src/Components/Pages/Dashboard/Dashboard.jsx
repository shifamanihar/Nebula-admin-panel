import React from 'react'
import './Dashboard.css'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Dashboard() {


    const courses = [
        { title: 'Total Courses', value: '21' },
        { title: 'Total Tutorial    ', value: '36'},
        { title: 'New Users', value: '56'},
        { title: 'Active Users', value: '23'},
      ];
  return (
    <>
        <div className='dashboard-wrapper mt-2'>

            <div className="welcome-card ">
                <h3>Hi, Shubham Musale</h3>
                <p>Welcome to Dashboard</p>
            </div>

            <div className="website-card">
                <div className="logo-wrapper">
                    <OpenInBrowserIcon className=' website-icon'/>
                </div>
                <div className="text-wrapper">
                    <h5>Visit Website</h5>
                    <div className='d-flex justify-content-between'>
                        <p>Visit</p>
                        <p><ContentCopyIcon className='copy-icon'/>Copy</p>
                    </div>
                </div>
                    <ArrowForwardIosIcon className='arrow-icon'/>
            </div>

            <div className="card-wrapper mt-5">
                {courses.map((course, index)=>(

                <div className='card-menu' key={index}>
                    <h5>{course.title}</h5>
                    <p>{course.value}</p>
                </div>

                ))}
            </div>
        </div>
    </>
  )
}

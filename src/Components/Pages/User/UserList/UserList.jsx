import React, { useState } from 'react'
import './UserList.css'

import EditIcon from "@mui/icons-material/Edit";
import { Form,Modal} from "react-bootstrap";
import { Button } from '@mui/material';

export default function UserList() {
    const [employees ,setEmployees] = useState(
        [
        {
            name:"Shubham Musale",
            userName:"shubhammusale111@gmail.com",
            roleCode:"Admin",

        }

        ]);
        const [show, setShow] = useState(false);

  // Functions to show/hide modal
  const handleShow = () => setShow(true);
  const handleClose = () =>{ 
    
    console.log()
    setShow(false)};
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const response = await createEmployee(formData, token);
          console.log(response);
    
        }
        catch (err) {
          console.log(err.response?.data?.message || "Failed to send message.");
        } 
    
     
      // You can send formData to backend API here
    };
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        about: ""
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
  return (
    <>
    <div className="user-list-wrapper">
        <div className="container row2">
            <div className='emp-list-contrainer mt-2'>
                <h5>Users List</h5>
                <div className="container-addemp">
            {/* Add Employee Button */}
            <Button  className="add-employee-btn" variant="warning" onClick={handleShow}>
              + Add Employee
            </Button>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} size="lg" centered className='add-userform'>
              <Modal.Header closeButton>
                <Modal.Title>Add New Employee</Modal.Title>
              </Modal.Header>
              
              <Modal.Body >
    
              <Form onSubmit={handleSubmit} >
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Username *</Form.Label>
                      <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </Form.Group>
                  </div>
               
                 
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Password *</Form.Label>
                      <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password *</Form.Label>
                      <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </Form.Group>
                  </div>
                 
                  <div className="col-12">
                    <Form.Group className="mb-3">
                      <Form.Label>About *</Form.Label>
                      <Form.Control as="textarea" rows={3} name="about" value={formData.about} onChange={handleChange} required />
                    </Form.Group>
                  </div>
                  <div className="col-12 text-center">
                  <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              </Form>
              </Modal.Body>

              {/* <Modal.Footer>
                
                <Button variant="warning">Save</Button>
              </Modal.Footer> */}
            </Modal>
          </div>
            </div>

            <div className="table-responsive emp-table mt-4">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={index}>

                                <td><p className='emp-title my-0'>{emp.name}</p></td>
                                <td style={{ color: 'gray' }}>{emp.userName}</td>
                                <td>
                                    <span
                                        className="badge"
                                        style={{
                                            backgroundColor: "#ffffff",
                                            fontSize: "14px",
                                            color: emp.roleCode === "HR" ? "#483b53f4" : "#a9064da5"
                                        }}
                                    >
                                        {emp.roleCode}
                                    </span>
                                </td>
                                <td>
                                    <EditIcon className="fs-5 me-2 cursor-pointer" onClick={() => openEditModal(emp)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-end align-items-end me-3">
                <button style={{ border: 'none', paddingRight: '10px', color: 'gray' }}>&lt;</button>
                <span style={{
                    backgroundColor: 'orangered',
                    borderRadius: '70px',
                    width: '25px',
                    color: 'white',
                    paddingLeft: '7px'
                }}> 1</span>
                <button style={{ border: 'none', paddingLeft: '10px', color: 'gray' }}>&gt;</button>
            </div>
        </div>
    </div>
    </>
  )
}
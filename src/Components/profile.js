import React,{useState} from "react";
import './profile.css'
import {Modal} from 'react-bootstrap'

const Profile =() =>{
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    var firstname='Hridyansh';
    var lastname='Khatri';
    var count=0;
    return(
        <>
        <div className="container h-100 mt-3">
        <div className="row align-items-center h-100">
        <div className="col-6 mx-auto ">
        <div className="card text-white justify-content-center bg-dark border-primary" >
        <div className='card-body'>
            <div className="text-center">
  <img src={`https://ui-avatars.com/api/?size=32&font-size=0.33&rounded=true&name=${firstname}+${lastname}`} alt="ava" style={{"width":"100px"}}/>
  </div>
  <hr></hr>
  <h4>{firstname} {lastname}</h4>
  <p onClick={handleShow} style={{"cursor":"pointer"}} id="followers">Followers: {count}</p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton closeVariant="white" className="bg-dark text-white">
          <Modal.Title>Followers</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
            <p>Allen</p>
        </Modal.Body>
      </Modal>
        </div>
        </div>
        </div>
        </div>
        </div>
   
        </>
    )
}
export default Profile;
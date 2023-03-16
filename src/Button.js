import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const Button = ({ data, onSave }) => {
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(data);
  const [editedData, setEditedData] = useState([]);

  // console.log("editedddddddddddd", editedData)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => {
    onSave(editData);
    handleClose();
  };
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  
  return (
    <>
      <button onClick={handleShow}>click</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>Edit Form</Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            name="make"
            value={editData.make}
            onChange={handleChange}
          />
          <input
            type="text"
            name="model"
            value={editData.model}
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            value={editData.price}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={handleSave}>Save</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Button;

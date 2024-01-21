import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserUpdate = (props) => {
    const [fname,setName]=useState(props.updateData.fname)
    const [lname,setLname]=useState(props.updateData.lname)
    const [email,setEmail]=useState(props.updateData.email)


    const update=async(id)=>{
       try {
        const url="http://localhost:3001/api/updateUser"
        const res=await fetch(`${url}/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"    
            },
            body:JSON.stringify({
                fname:fname,
                lname:lname,
                email:email
            })
        })
        await res.json()
        props.api.api()
        props.setShow(false)
        toast.success("User Updated Successfully");
       } catch (error) {
        console.log('error:', error)
       }
    }

    useEffect(()=>{
     setName(props.updateData.fname)
     setLname(props.updateData.lname)
     setEmail(props.updateData.email)
    },[props.updateData])
  return (
    <>
<div className="container main">
<div className="box">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header mb-3">
              <h1 className="modal-title" id="staticBackdropLabel">
                Edit User 😊
              </h1>
            </div>
            <div className="modal-body">
            <form className="row g-3">
        <div className="col-md-6">
          <div className="row g-3">
            <div className="col">
              <label htmlFor="fname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                aria-label="First name"
                id="fname"
                value={fname}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="lname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                aria-label="Last name"
                id="lname"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" className="btn btn-primary mt-2"
          onClick={()=>update(props.updateData._id)}
          >
            Update
          </button>
        </div>
      </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                // data-bs-dismiss="modal"
                onClick={()=>props.setShow(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
        </div>
</div>
    </>
  );
};

export default UserUpdate;

import React, { useEffect, useState } from "react";
import UserUpdate from "./UserUpdate";
import toast from "react-hot-toast";

export default function Tables(props) {
  const api = props.api;
  const [updateData, setUpdateData] = useState(undefined);
  const [show, setShow] = useState(false);
 

  // delete data
  const deleteItem = async (id) => {
    try {
      const url = "http://localhost:3001/api/deleteUser";
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data) {
        props.api.api();
        toast.success("User Deleted Successfully");
      }
    } catch (error) {
      console.log("erorr", error);
    }
  };

  //   update data
  const update = (item) => {
    setUpdateData(item);
    setShow(true);
  };

  useEffect(() => {
    props.api.api();
  }, []);
  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(props.api.data).map((item, i) => {
            return (
              <>
                <tr className="table-secondary">
                  <th scope="row" key={item.id}>
                    {i + 1}
                  </th>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => update(item)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      {show ? (
        <UserUpdate setShow={setShow} updateData={updateData} api={api} />
      ) : null}
    </div>
  );
}

import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function FormHandle(props) {
  const [fname, setName] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");

  const getApi = async () => {
    try {
      const apiUrl = "http://localhost:3001/api/newUser";
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: fname,
          lname: lname,
          email: email,
        }),
      });
      await res.json();
      toast.success("User Add Successfully");
      props.api();
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    props.api();
  }, []);
  return (
    <div>
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
          <button
            type="button"
            className="btn btn-primary mt-1"
            onClick={getApi}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

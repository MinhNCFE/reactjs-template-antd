import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function LoginAdmin() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/auth/login", credentials)
      .then((res) => {
        if (!res.data.roles || !res.data.roles.includes("ROLE_ADMIN")) {
          alert("Bạn không có quyền truy cập trang Admin!");
          return;
        }
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        localStorage.setItem("roles", JSON.stringify(res.data.roles));
        navigate("/admin");
      })

      .catch((err) => {
        console.log(err);
        alert("Login Failed");
      });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Login
                    </p>

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={credentials.email}
                            onChange={handleChangeInput}
                          />
                          <label className="form-label">Your Email</label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={credentials.password}
                            onChange={handleChangeInput}
                          />
                          <label className="form-label">Password</label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mb-3">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Login
                        </button>
                      </div>

                      <div className="text-center">
                        <NavLink to="/register" className="text-primary">
                          Don’t have an account? Register
                        </NavLink>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                      className="img-fluid"
                      alt="Sample"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginAdmin;

import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apirequest from '../../lib/apiRequest';
import { useState } from "react";
function Register() {
  const [error,seterror] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate =useNavigate();
  
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target); // ✅ Correct usage

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const res = await apirequest.post("/auth/register", {
            username,
            email,
            password
        });
        navigate("/login");
        console.log("Success:", res.data);
    } catch (error) {
        console.error(error);
        seterror(error.response?.data?.message || "Something went wrong");
    }
    finally {
      setIsLoading(false);
    }
};

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={HandleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading} >Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
  }


export default Register;

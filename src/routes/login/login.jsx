import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apirequest from '../../lib/apiRequest';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error,seterror] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate =useNavigate();
  const {updateUser} = useContext(AuthContext);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target); // ✅ Correct usage

    const username = formData.get("username");
    const password = formData.get("password");

    try {
        const res = await apirequest.post("/auth/login", {
            username,
            password
        });
        updateUser(res.data);
        navigate("/");

     
    } catch (error) {
        console.error(error);
        seterror(error.response?.data?.message || "Something went wrong");
    }
    finally {
      setIsLoading(false);
    }
};
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={HandleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;

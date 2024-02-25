import React, { useState } from "react";
import EmailVerification from "../EmailVerification/EmailVerification";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies, Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// TODO

const TwoFactorForm = () => {
  const [tfaCode, setTfaCode] = useState("");
  const navigate = useNavigate();
  const [cookies] = useCookies(["temp-session-token"]);
  const decodedToken = jwtDecode(cookies["temp-session-token"]);
  console.log(decodedToken.tfa);

  axios.defaults.withCredentials = true;
  const handleSubmit = () => {
    if (tfaCode) {
      event.preventDefault();
      axios
        .post("http://localhost:3001/verify-token/" + decodedToken.tfa, {
          token: tfaCode,
        })
        .then((res) => {
          if (res.data.login) {
            console.log("TFA passed");
            navigate("/dashboard");
          }
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Tfa failed");
    }
  };

  return (
    <div className="wrapper">
      <div>
        <h1>Enter your Two-Factor Authentication Code.</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter Code"
            required
            onChange={(e) => setTfaCode(e.target.value)}
          />
        </div>

        <button className="btn-login" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TwoFactorForm;

import React, { useState, useEffect } from "react";
import "./SignUp.scss";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import signUpp from "../../assets/images/sign3.svg";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { useUsersList } from "../../firebase/getFunctions";
import { handleSignUp } from "../../firebase/controllers";

const SignUp = () => {
  const { loggedUser } = useUsersList();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    mobile: null,
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { mobile, name, surname, username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    if (loggedUser) {
      navigate("/");
    }
  }, [loggedUser, navigate]);

  return (
    <div className="sign-field py-4 container">
      <div className="row">
        <div className="smartphone col-12 col-lg-6">
          <img className="w-100 h-100" src={signUpp} alt="signUp" />
        </div>
        <div className="col-12 col-lg-6 py-3 py-lg-0">
          <form
            onSubmit={(e) =>
              handleSignUp(e, name, surname, username, mobile, email, password)
            }
          >
            <h3 className="py-2">Qeydiyyat</h3>
            <div className="row">
              <div className="form-element col-12 col-md-6">
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Ad"
                  name="name"
                  className="sign-inputs"
                  required
                />
              </div>
              <div className="form-element col-12 col-md-6">
                <input
                  onChange={handleChange}
                  type="text"
                  placeholder="Soyad"
                  name="surname"
                  className="sign-inputs"
                  required
                />
              </div>
              <div className="form-element col-12">
                <input
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value.toLocaleLowerCase(),
                    })
                  }
                  type="text"
                  placeholder="İstifadəçi adı"
                  name="username"
                  className="sign-inputs"
                  required
                />
              </div>
              <div className="form-element col-12">
                <input
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value.toLocaleLowerCase(),
                    })
                  }
                  type="email"
                  placeholder="E-poçt"
                  name="email"
                  className="sign-inputs"
                  required
                />
              </div>
              <div className="form-element col-12">
                <InputMask
                  className="sign-inputs"
                  mask="+999\-99-999-99-99"
                  placeholder="+XXX-XX-XXX-XX-XX"
                  value={mobile || ""}
                  onChange={handleChange}
                  name="mobile"
                />
                <button
                  type="button"
                  className="clean-button tel-info btn-show"
                >
                  <AiOutlineInfoCircle />
                </button>
                <div className="tel-modal">
                  Şifrənizi itirdiyiniz zaman sizə doğrulama kodu göndərməyimiz
                  üçün vacibdir.
                </div>
              </div>
              <div className="form-element col-12">
                <input
                  onChange={handleChange}
                  type={showPass ? "text" : "password"}
                  placeholder="Şifrə"
                  name="password"
                  className="sign-inputs"
                  required
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  type="button"
                  className="clean-button btn-show"
                >
                  {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>
            <div className="sign-buttons">
              <button type="submit" className="btn-blue">
                Qeydiyyatı tamamla
              </button>
              <button
                onClick={() => navigate("/sign-in")}
                className="clean-button"
              >
                Zatən bir profilin var?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

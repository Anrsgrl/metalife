import React, { useEffect, useState } from "react";
import { auth, uploadProfilePhoto } from "../../firebase/config";
import { MdManageAccounts } from "react-icons/md";
import { updateProfile } from "@firebase/auth";
import "./UserSettings.scss";
import boy from "../../assets/images/boy.png";
import { sendVerification } from "../../firebase/controllers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

const Settings = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileUrl, setProfileUrl] = useState();
  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 512000) {
      setSelectedFile(file);
      setErrorMsg(false);
    } else {
      event.target.value = null;
      setSelectedFile(null);
      setErrorMsg(true);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const downloadURL = await uploadProfilePhoto(
          selectedFile,
          auth.currentUser
        );
        setProfileUrl(downloadURL);
        toast.success("Profil şəkli uğurla yükləndi!");
        navigate(-1);
      } catch (error) {
        toast.error("Profil şəkli yükləmə xətası");
        console.log("Profil şəkli yükləmə xətası:", error);
      }
    }
  };

  useEffect(() => {
    if (profileUrl) {
      updateProfile(auth.currentUser, {
        photoURL: profileUrl,
      }).catch((error) => {
        console.log("Profil fotoğrafı URL'sini güncelleme hatası:", error);
      });
    }
  }, [profileUrl]);

  return (
    <div className="settings container py-5">
      <h1 className="py-3 section-heading">Parametrlər</h1>
      <button
        onClick={() => navigate(-1)}
        type="button"
        className="clean-button back"
      >
        <TiArrowBack />
      </button>
      <div className="row py-2">
        <div className="setting-names col-lg-3">
          <ul className="names-content p-0">
            <li>
              <button type="button" className="clean-button btn-blue p-3">
                <MdManageAccounts />
                Profil parametrləri
              </button>
            </li>
          </ul>
        </div>
        <div className="col-lg-9 setting-content d-flex flex-column">
          <div className="pp-settings py-5">
            <h3 className="border-bottom pb-2">Profil şəkli</h3>
            <div className="change-profile">
              <div className="change-inputs">
                <input
                  className=""
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleFileChange}
                />
                <button
                  className={
                    selectedFile ? "btn-blue h-100" : "btn-disabled h-100"
                  }
                  onClick={handleUpload}
                  disabled={!selectedFile}
                >
                  Yüklə
                </button>
              </div>
              <div className="user-image">
                {auth?.currentUser?.photoURL ? (
                  <img src={auth?.currentUser?.photoURL} alt="profile" />
                ) : (
                  <img src={boy} alt="profile" />
                )}
              </div>
              {errorMsg && (
                <p className="text-danger">
                  Seçilən şəklin ölçüsü 500 kilobaytdan az olmalıdır.
                </p>
              )}
            </div>
          </div>
          <div className="email-settings">
            <h3 className="border-bottom pb-2">E-poçt</h3>
            <div className="change-profile">
              <p className="change-inputs">{auth?.currentUser?.email}</p>
              {auth?.currentUser?.emailVerified ? (
                <p className="text-success">E-poçtunuz təstiqlənmişdir.</p>
              ) : (
                <div className="d-flex flex-column">
                  <button
                    onClick={() => sendVerification()}
                    className="btn-blue"
                  >
                    E-poçtu təstiqlə
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

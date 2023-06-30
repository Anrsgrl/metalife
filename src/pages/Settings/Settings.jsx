import React, { useEffect, useState } from 'react';
import { auth, uploadProfilePhoto } from "../../firebase";
import { MdManageAccounts } from "react-icons/md";
import { updateProfile } from '@firebase/auth';
import "./components/UserSettings/UserSettings.scss";

const Settings = ({ loggedUser }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [profileUrl, setProfileUrl] = useState();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                const downloadURL = await uploadProfilePhoto(selectedFile, auth.currentUser);
                console.log("Profil fotoğrafı yüklendi. İndirme URL'si:", downloadURL);
                setProfileUrl(downloadURL);
            } catch (error) {
                console.log("Profil fotoğrafı yükleme hatası:", error);
            }
        }
    };

    useEffect(() => {
        if (profileUrl) {
            updateProfile(auth.currentUser, {
                photoURL: profileUrl
            })
                .then(() => {
                    console.log("Profil fotoğrafı URL'si güncellendi");
                })
                .catch((error) => {
                    console.log("Profil fotoğrafı URL'sini güncelleme hatası:", error);
                });
        }
    }, [profileUrl]);

    return (
        <div className="settings container py-5">
            <h1 className='py-3 section-heading'>Ayarlar</h1>
            <div className="row py-2">
                <div className="setting-names col-lg-3">
                    <ul className="names-content p-0">
                        <li>
                            <button
                                type='button'
                                className='clean-button btn-blue p-3'>
                                <MdManageAccounts />
                                Profil ayarları
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-9 setting-content d-flex flex-column">
                    <div className="pp-settings">
                        <h3 className='border-bottom pb-2'>Profil şəkli</h3>
                        <div className="change-profile">
                            <div className="change-inputs">
                                <input type="file" accept=".PNG, .JPEG, .JPG" onChange={handleFileChange} />
                                <button className='btn-blue ' onClick={handleUpload}>Yüklə</button>
                            </div>
                            <div className="user-image">
                                <img src={auth?.currentUser?.photoURL} alt="boy" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;
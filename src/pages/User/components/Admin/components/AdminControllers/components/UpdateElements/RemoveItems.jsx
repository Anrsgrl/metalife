import React, { useRef, useState } from 'react';
import { db, storage, useAuth } from '../../../../../../../../firebase';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const RemoveItems = () => {
    const [selectedItemId, setSelectedItemId] = useState("");
    const [status, setStatus] = useState("")
    const { blogs, videos, userData } = useAuth();
    const blogsCollectionRef = useRef(collection(db, "blogs"));
    const videosCollectionRef = useRef(collection(db, "videos"));
    const usersCollectionRef = useRef(collection(db, "users"));

    const removeItem = async (collectionRef, itemId) => {
        try {
            if (!itemId) return;

            const itemRef = doc(collectionRef.current, itemId);

            if (collectionRef.current === blogsCollectionRef.current) {
                const selectedData = blogs.find((e) => e.id === itemId);
                if (selectedData) {
                    const storageRef = ref(storage, selectedData.blog_image);
                    await deleteObject(storageRef);
                }
            }
            await deleteDoc(itemRef);

            // if (collectionRef.current === usersCollectionRef.current) {
            //     const selectedUser = userData.find((user) => user.id === itemId);
            //     if (selectedUser) {
            //         const userEmail = selectedUser.email;
            //         await deleteUser("6nWlAK9uwlZPVb65eQpTXhnV2Sh1");
            //     }
            // }

            setSelectedItemId("");
            setStatus("Uğurla silindi");
            setTimeout(() => {
                setStatus("");
            }, 3000);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };
    return (
        <div className="remove-items-field py-5">
            <h2 className='py-3'>Remove Items</h2>
            {status && <p className='text-success text-center'>Uğurla silindi!</p>}
            <div className="remove-items">
                <div className="row remove-blogs">
                    <select
                        defaultValue={"default"}
                        onChange={(e) => setSelectedItemId(e.target.value)}
                        className="col-12 col-md-5"
                    >
                        <option value="default" disabled hidden>
                            Bir blog seçin
                        </option>
                        {blogs?.map((e) => (
                            <option key={e?.id} value={e?.id}>
                                {e?.title}
                            </option>
                        ))}
                    </select>
                    <button
                        disabled={!selectedItemId}
                        onClick={() => removeItem(blogsCollectionRef, selectedItemId)}
                        className="btn btn-danger col-12 col-md-5"
                    >
                        sil
                    </button>
                </div>

                <div className="row remove-videos">
                    <select
                        defaultValue={"default"}
                        onChange={(e) => setSelectedItemId(e.target.value)}
                        className="col-12 col-md-5"
                    >
                        <option value="default" disabled hidden>
                            Bir video seçin
                        </option>
                        {videos?.map((e) => (
                            <option key={e?.id} value={e?.id}>
                                {e?.title}
                            </option>
                        ))}
                    </select>
                    <button
                        disabled={!selectedItemId}
                        onClick={() => removeItem(videosCollectionRef, selectedItemId)}
                        className="btn btn-danger col-12 col-md-5"
                    >
                        sil
                    </button>
                </div>

                <div className="row remove-users">
                    <select
                        defaultValue={"default"}
                        onChange={(e) => setSelectedItemId(e.target.value)}
                        className="col-12 col-md-5"
                    >
                        <option value="default" disabled hidden>
                            Bir istifadəçi seçin
                        </option>
                        {userData?.filter((e) => e?.userKey !== process.env.REACT_APP_ADMIN_KEY).map((user) => (
                            <option key={user?.id} value={user?.id}>
                                {user?.name} {user?.surname}
                            </option>
                        ))}
                    </select>
                    <button
                        disabled={!selectedItemId}
                        onClick={() => removeItem(usersCollectionRef, selectedItemId)}
                        className="btn btn-danger col-12 col-md-5"
                    >
                        sil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RemoveItems;

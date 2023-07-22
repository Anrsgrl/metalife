import React from 'react';
import { useAuth } from '../../../../../../../../firebase';

const RemoveItems = () => {
    const { blogs } = useAuth()
    return (
        <div className="remove-items py-5">
            <h2>Remove Items</h2>
            <div className="row remove-blogs">
                <select defaultValue={"default"} className="col-12 col-md-5">
                    <option value="default" disabled hidden>Blogu seç</option>
                    {blogs?.map((e) => (
                        <option value={e?.id}>{e?.title}</option>
                    ))}
                </select>
                <button className="btn btn-danger col-12 col-md-5">
                    sil
                </button>
            </div>
        </div>
    )
}

export default RemoveItems;
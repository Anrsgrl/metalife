import React, { useState } from "react";
import { removeItem } from "../../../../../../../../firebase/controllers";

const RemoveSingleItem = (props) => {
  const { colRef, name, array } = props;
  const [selectedItemId, setSelectedItemId] = useState("");
  return (
    <div className="row remove-blogs">
      <select
        defaultValue={"default"}
        onChange={(e) => setSelectedItemId(e.target.value)}
        className="col-12 col-md-5"
      >
        <option value="default" disabled hidden>
          Bir {name} seçin
        </option>
        {array?.map((e) => (
          <option key={e?.id} value={e?.id}>
            {name === "istifadəçi"
              ? e?.name + " " + e?.surname + " | " + e?.username
              : e?.title}
          </option>
        ))}
      </select>
      <button
        disabled={!selectedItemId}
        onClick={() => removeItem(colRef, selectedItemId)}
        className="btn btn-danger col-12 col-md-5"
      >
        sil
      </button>
    </div>
  );
};

export default RemoveSingleItem;

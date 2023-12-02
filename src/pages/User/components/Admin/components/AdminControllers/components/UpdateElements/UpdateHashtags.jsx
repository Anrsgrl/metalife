import React, { useState } from "react";
import {
  backendHashtags,
  frontendHashtags,
  fullstackHashtags,
  interiorDesignHashtags,
  threeDHashtags,
  uidesignHashtags,
} from "../../../../../../../../data/updateHashtags";
import { MdAdd, MdDeleteSweep, MdSettings } from "react-icons/md";

const UpdateHashtags = (props) => {
  const { state, setState, generalState, setGeneralState } = props;

  const [showHelperHash, setShowHelperHash] = useState(false);

  const handleHashtagsSubmit = (e) => {
    e.preventDefault();
    if (state !== "") {
      setGeneralState([...generalState, state.replace(/\s/g, "")]);
    }
    setState("");
  };

  return (
    <form
      className="py-3 col-12 updateHashtags"
      onSubmit={handleHashtagsSubmit}
    >
      <h3 className="py-2">Hashtag əlavə etmə</h3>
      <div className="hashtag-add">
        <input
          onChange={(e) => setState(e.target.value.toLocaleLowerCase())}
          type="text"
          placeholder="Hashtag"
          name="hashtags"
          className="sign-inputs m-0"
          value={state}
          required
        />
        <div className="hash-buttons">
          <button title="Əlavə et" type="submit" className="clean-button">
            <MdAdd />
          </button>
          <button
            title="Hamısını sil"
            className="clean-button"
            onClick={() => setGeneralState([])}
          >
            <MdDeleteSweep />
          </button>
          <button
            type="button"
            onClick={() => setShowHelperHash(!showHelperHash)}
            title="Köməkçi tagları göstər"
            className={`clean-button ${showHelperHash && "active"}`}
          >
            <MdSettings />
          </button>
        </div>
      </div>
      {showHelperHash && (
        <div className="helper-hashtags col-12 py-1">
          <button
            disabled={generalState.includes(frontendHashtags)}
            type="button"
            onClick={() =>
              setGeneralState([...generalState, ...frontendHashtags])
            }
          >
            Front
          </button>
          <button
            disabled={generalState.includes(backendHashtags)}
            type="button"
            onClick={() =>
              setGeneralState([...generalState, ...backendHashtags])
            }
          >
            Back
          </button>
          <button
            disabled={generalState.includes(fullstackHashtags)}
            type="button"
            onClick={() =>
              setGeneralState([...generalState, ...fullstackHashtags])
            }
          >
            Full
          </button>
          <button
            disabled={generalState.includes(uidesignHashtags)}
            type="button"
            onClick={() =>
              setGeneralState([...generalState, ...uidesignHashtags])
            }
          >
            UI/UIX
          </button>
          <button
            disabled={generalState.includes(interiorDesignHashtags)}
            type="button"
            onClick={() =>
              setGeneralState([...generalState, ...interiorDesignHashtags])
            }
          >
            Interior
          </button>
          <button
            disabled={generalState.includes(threeDHashtags)}
            type="button"
            onClick={() =>
              setGeneralState([...generalState, ...threeDHashtags])
            }
          >
            3D
          </button>
        </div>
      )}
      {generalState && (
        <p className="hashtag-list text-muted text-overflow-clamp clamp-2 pt-2 mb-0">
          {generalState?.map((tag) => `#${tag}`).join(", ")}
        </p>
      )}
    </form>
  );
};

export default UpdateHashtags;

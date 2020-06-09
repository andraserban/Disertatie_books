import React, { useState } from "react";
import firebase from "../firebase";

export default function Profile() {
  const [payload, setPayload] = useState(null);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => setPayload(currentUser), [currentUser]);
  return (
    <form>
      <div className="account__form">
        <div className="input__box">
          <label>
            Username<span></span>
          </label>
          <input type="text" />
        </div>
        <div className="input__box">
          <label>
            E-mail<span></span>
          </label>
          <input type="text" />
        </div>
        <div className="input__box">
          <label>
            Password<span>*</span>
          </label>
          <input type="password" />
        </div>
        <div className="form__btn">
          <button type="submit">Update</button>
        </div>
      </div>
    </form>
  );
}

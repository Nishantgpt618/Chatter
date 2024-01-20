import React, { useState } from "react";
import styles from "./LoginSignUp.module.css";
import { useDispatch } from "react-redux";
import { signUpUser } from "../toolkit/login";

function SignUp(props) {
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
  });
  const [active, setActive] = useState(true);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);

  const wait = () => {
    props.setShowSignUp(false);
  };

  return (
    <React.Fragment>
      <div className={active ? styles.centerActive : styles.centerClose}>
        <span className="text-xl font-medium w-full text-center block text-orange-400 my-2">SIGNUP FORM</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              signUpUser({
                ...signUpData,
                setShowSignUp: props.setShowSignUp,
                setActive: props.setActive
              })
            );
          }}
        >
          <div className="w-full flex items-center justify-between">
            <div className="mr-2 w-full">
              <label className="ml-1 w-full text-teal-300">First Name</label>
              <input
                required
                className="w-full pb-1 pt-2 px-2"
                value={signUpData.firstName}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div className="ml-2 w-full">
              <label className="ml-1 w-full text-teal-300">Last Name</label>
              <input
                required
                className="w-full pb-1 pt-2 px-2"
                value={signUpData.lastName}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="mr-2 w-full">
              <label className="ml-1 w-full text-teal-300">Email</label>
              <input
                required
                className="w-full pb-1 pt-2 px-2"
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="ml-2 w-full">
              <label className="ml-1 w-full text-teal-300">Contact Number</label>
              <input
                required
                className="w-full pb-1 pt-2 px-2"
                value={signUpData.contactNumber}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    contactNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="w-full">
            <label className="ml-1 w-full text-teal-300">Password</label>
            <input
              required
              className="w-full pb-1 pt-2 px-2"
              type={checked ? "password" : "text"}
              value={signUpData.passowrd}
              onChange={(e) => {
                setSignUpData({
                  ...signUpData,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex items-center my-3">
            <input className="mr-2 p-1" type="checkbox" onClick={() => setChecked(!checked)} />
            <label className="text-white">
              Show Password
            </label>
          </div>
          <div className="flex mt-4 justify-around items-center">
            <button className="px-7 py-2 text-black rounded-lg bg-orange-400 hover:bg-teal-300" name="submit" type="submit" value="Sign Up">Sign Up</button>
            <button
              className="px-7 py-2 text-black rounded-lg bg-orange-400 hover:bg-teal-300"
              onClick={() => {
                setActive(false);
                props.setActive(true);
                setTimeout(wait, 1000);
              }}
              name="button"
              type="button"
              value="Cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default SignUp;

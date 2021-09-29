import { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ref, set, onValue } from "firebase/database";
import Checkbox from "@material-ui/core/Checkbox";

import { toggleShowName } from "../../store/profile/actions";
import { ThemeContext } from "../../utils/ThemeContext";
import { db } from "../../services/firebase";
import "./style.css";

const withContext = (Component) => {
  return (props) => {
    const theme = useContext(ThemeContext);

    return <Component {...props} theme={theme} />;
  };
};

export const Profile = ({ onLogout }) => {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const theme = useContext(ThemeContext);
  const showName = useSelector((state) => state.profile.showName);
  const dispatch = useDispatch();

  const handleClick2 = () => {
    dispatch(toggleShowName);
  };

  const handleClick = () => {
    onLogout();
  };

  useEffect(() => {
    const profileDbRef = ref(db, "profile/login");
    const unsubscribe = onValue(profileDbRef, (snapshot) => {
      const data = snapshot.val();
      const showlogin = document.querySelector(".showlogin");
      const div = document.createElement("div");
      div.innerHTML = "Login:" + data.login;
      document.body.append(div);
      div.classList.add("userlogin");
      showlogin.before(div);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const profileDbRef = ref(db, "profile/username");
    const unsubscribe = onValue(profileDbRef, (snapshot) => {
      const data = snapshot.val();
      setName(data?.username || "");
    });
    return unsubscribe;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue("");
    set(ref(db, "profile/username"), {
      username: value,
    });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>
        <button onClick={handleClick}>Logout</button>
        <div className="box">
          <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} />
            <button type="submit">Submit</button>
          </form>
          <div>
            <div className="showlogin" />
            <h5 style={{ color: "blue" }}>Username: {name}</h5>
            <button onClick={theme.changeTheme}>Toggle theme</button>

            <h3 style={{ color: theme.theme === "light" ? "red" : "black" }}>
              This is change theme example
            </h3>
            <Checkbox
              onChange={handleClick2}
              inputProps={{ "aria-label": "primary checkbox" }}
            />

            <h4 style={{ color: "green" }}>
              {showName && <div className="SN">username: {name}</div>}
            </h4>
            <h4 style={{ color: "green" }}>Show Name</h4>
          </div>
        </div>
      </div>
      <img src="../images/profile.png" alt="logo"></img>
    </>
  );
};

export const ThemedProfile = withContext(Profile);

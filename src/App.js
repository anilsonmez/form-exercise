import { useState } from "react";
import "./App.css";
import StageOne from "./StageOne";
import StageTwo from "./StageTwo";
import StageThree from "./StageThree";

function App() {
  const [stage, setStage] = useState("StageOne");
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    birthday: "",
    features: [],
  });
  console.log(userInfo);
  return (
    <div className="App">
      {stage === "StageOne" && (
        <StageOne
          setStage={setStage}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      )}
      {stage === "StageTwo" && (
        <StageTwo
          setStage={setStage}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      )}
      {stage === "StageThree" && (
        <StageThree
          setStage={setStage}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      )}
    </div>
  );
}

export default App;

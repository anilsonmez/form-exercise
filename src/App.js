import { useState } from "react";
import "./App.css";
import StageOne from "./StageOne";

function App() {
  const [userInfo, setUserInfo] = useState({});
  console.log(userInfo);
  return (
    <div className="App">
      <StageOne setUserInfo={setUserInfo} userInfo={userInfo} />
    </div>
  );
}

export default App;

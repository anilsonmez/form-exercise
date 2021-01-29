import { useState } from "react";

const StageTwo = ({ setStage, userInfo, setUserInfo }) => {
  const [password, setPassword] = useState({
    content: userInfo.password,
    error: "",
    valid: userInfo.password ? true : false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  function handlePasswordValidation(content) {
    let errorMessage = "";
    let isValid = true;
    if (!content) {
      errorMessage = "Please enter your password";
      isValid = false;
    } else if (content.length < 8 || content.length > 16) {
      errorMessage =
        "Your password must contain at least 8, at most 16 characters";
      isValid = false;
    } else if (
      !content.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)
    ) {
      errorMessage =
        "Your password must contain at least 1 upper case, 1 lower case letter and a number";
      isValid = false;
    }
    setPassword({
      ...password,
      content: content,
      error: errorMessage,
      valid: isValid,
    });
  }

  return (
    <div className="Stage-two">
      <form>
        <label htmlFor="password">
          Password
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            value={password.content}
            onFocus={() => {
              setErrorVisible(false);
            }}
            onChange={(e) => {
              handlePasswordValidation(e.target.value);
            }}
            onBlur={() => {
              setErrorVisible(true);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setPasswordVisible(!passwordVisible);
            }}
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
          <p className="error">{errorVisible ? password.error : ""}</p>
        </label>
        <label htmlFor="confirm-password">
          Confirm Password
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setConfirmPasswordVisible(!confirmPasswordVisible);
            }}
          >
            {confirmPasswordVisible ? "Hide" : "Show"}
          </button>
        </label>
        <button
          onClick={() => {
            setStage("StageOne");
          }}
        >
          Previous
        </button>
        <button
          disabled={!(password.valid && password.content === confirmPassword)}
          onClick={(e) => {
            e.preventDefault();
            setUserInfo({ ...userInfo, password: password.content });
            setStage("StageThree");
          }}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default StageTwo;

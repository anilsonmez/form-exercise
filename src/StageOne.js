import { useState } from "react";

const StageOne = ({ setStage, userInfo, setUserInfo }) => {
  const [firstName, setFirstName] = useState({
    content: userInfo.name,
    error: "",
    valid: userInfo.name ? true : false,
  });
  const [lastName, setLastName] = useState({
    content: userInfo.lastName,
    error: "",
    valid: userInfo.lastName ? true : false,
  });
  const [email, setEmail] = useState({
    content: userInfo.email,
    error: "",
    valid: userInfo.email ? true : false,
  });

  const [errorVisible, setErrorVisible] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  function handleFirstNameValidation(content) {
    let errorMessage = "";
    let isValid = true;
    if (!content) {
      errorMessage = "Please enter your first name";
      isValid = false;
    } else if (!content.match(/^[a-zA-ZığĞüÜşŞİöÖçÇ]+$/)) {
      errorMessage = "First name must contain alpha characters only";
      isValid = false;
    } else if (content.length < 2 || content.length > 20) {
      errorMessage =
        "First name must contain at least 2, at most 20 characters";
      isValid = false;
    }
    setFirstName({
      ...firstName,
      content: content,
      error: errorMessage,
      valid: isValid,
    });
  }

  function handleLastNameValidation(content) {
    let errorMessage = "";
    let isValid = true;
    if (!content) {
      errorMessage = "Please enter your last name";
      isValid = false;
    } else if (!content.match(/^[a-zA-ZığĞüÜşŞİöÖçÇ]+$/)) {
      errorMessage = "Last name must contain alpha characters only";
      isValid = false;
    } else if (content.length < 2 || content.length > 20) {
      errorMessage = "Last name must contain at least 2, at most 20 characters";
      isValid = false;
    }
    setLastName({
      ...lastName,
      content: content,
      error: errorMessage,
      valid: isValid,
    });
  }

  function handleEmailValidation(content) {
    let errorMessage = "";
    let isValid = true;
    if (
      !content.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      errorMessage = "E-mail is not valid";
      isValid = false;
    }
    setEmail({
      ...email,
      content: content,
      error: errorMessage,
      valid: isValid,
    });
  }

  const allValid = firstName.valid && lastName.valid && email.valid;

  return (
    <div className="stage-one">
      <form>
        <label htmlFor="first-name" type="text">
          First Name
          <input
            id="first-name"
            value={firstName.content}
            onFocus={() => {
              setErrorVisible({ ...errorVisible, firstName: false });
            }}
            onChange={(e) => {
              handleFirstNameValidation(e.target.value);
            }}
            onBlur={() => {
              setErrorVisible({ ...errorVisible, firstName: true });
            }}
          />
          <p className="error">
            {errorVisible.firstName ? firstName.error : ""}
          </p>
        </label>
        <label htmlFor="last-name" type="text">
          Last Name
          <input
            id="last-name"
            value={lastName.content}
            onFocus={() => {
              setErrorVisible({ ...errorVisible, lastName: false });
            }}
            onChange={(e) => {
              handleLastNameValidation(e.target.value);
            }}
            onBlur={() => {
              setErrorVisible({ ...errorVisible, lastName: true });
            }}
          />
          <p className="error">{errorVisible.lastName ? lastName.error : ""}</p>
        </label>
        <label htmlFor="email" type="email">
          E-mail
          <input
            id="email"
            value={email.content}
            onFocus={() => {
              setErrorVisible({ ...errorVisible, email: false });
            }}
            onChange={(e) => {
              handleEmailValidation(e.target.value);
            }}
            onBlur={() => {
              setErrorVisible({ ...errorVisible, email: true });
            }}
          />
          <p className="error">{errorVisible.email ? email.error : ""}</p>
        </label>
        <button
          disabled={!allValid}
          onClick={(e) => {
            e.preventDefault();
            setUserInfo({
              ...userInfo,
              name: firstName.content,
              lastName: lastName.content,
              email: email.content,
            });
            setStage("StageTwo");
          }}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default StageOne;

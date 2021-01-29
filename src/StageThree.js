import { useState } from "react";

const StageThree = ({ setStage, userInfo, setUserInfo }) => {
  const [gender, setGender] = useState({
    content: userInfo.gender,
    error: "",
    valid: userInfo.gender ? true : false,
  });
  const [birthday, setBirthday] = useState({
    content: userInfo.birthday,
    error: "",
    valid: userInfo.birthday ? true : false,
  });
  const [errorVisible, setErrorVisible] = useState({
    gender: false,
    birthday: false,
  });

  function handleAgeValidation(birthdayString) {
    let isValid = true;
    let errorMessage = "";
    let birthdayToSet = new Date(birthdayString);
    let birthdaySplitted = birthdayString.split("-");
    let eighteenthBirthday = new Date(
      `${+birthdaySplitted[0] + 18}-${birthdaySplitted[1]}-${
        birthdaySplitted[2]
      }`
    );

    if (isNaN(eighteenthBirthday)) {
      errorMessage = "This is an invalid date";
      isValid = false;
      birthdayToSet = "";
    }

    let today = new Date();
    let diff = today - eighteenthBirthday;
    console.log("eighteenthBirthday");
    console.log(eighteenthBirthday);
    console.log("today");
    console.log(today);
    console.log("diff");
    console.log(diff);
    if (diff < 0) {
      errorMessage = "You must be 18 years old or older in order to submit";
      isValid = false;
      birthdayToSet = "";
    }
    setBirthday({
      ...birthday,
      content: birthdayToSet,
      error: errorMessage,
      valid: isValid,
    });
  }

  const allValid = gender.valid && birthday.valid;
  return (
    <div className="stage-three">
      <form>
        <label htmlFor="gender">
          Gender
          <select
            id="gender"
            required
            defaultValue={""}
            onFocus={() => setErrorVisible({ ...errorVisible, gender: false })}
            onChange={(e) => {
              setGender({ ...gender, content: e.target.value, valid: true });
            }}
            onBlur={() => setErrorVisible({ ...errorVisible, gender: true })}
          >
            <option disabled value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <p className="error">{errorVisible.gender ? gender.error : ""}</p>
        </label>
        <label htmlFor="birthday">
          Birthday
          <input
            type="date"
            id="birthday"
            onFocus={() =>
              setErrorVisible({ ...errorVisible, birthday: false })
            }
            onChange={(e) => {
              handleAgeValidation(e.target.value);
            }}
            onBlur={() => setErrorVisible({ ...errorVisible, birthday: true })}
          />
          <p className="error">{errorVisible.birthday ? birthday.error : ""}</p>
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
            setStage("StageTwo");
          }}
        >
          Previous
        </button>
        <button
          disabled={!allValid}
          onClick={(e) => {
            e.preventDefault();
            setUserInfo({
              ...userInfo,
              gender: gender.content,
              birthday: birthday.content,
            });
            console.log({
              ...userInfo,
              gender: gender.content,
              birthday: birthday.content,
            });
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StageThree;

import { useState } from "react";

let checkedFeatureCount = 0;

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
  const [features, setFeatures] = useState({
    featureA: false,
    featureB: false,
    featureC: false,
    featureD: false,
  });
  const [errorVisible, setErrorVisible] = useState({
    gender: false,
    birthday: false,
  });

  function handleAgeValidation(birthdayString) {
    let isValid = true;
    let errorMessage = "";
    let birthdayToSet = birthdayString;
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

  function handleCheckedFeatures(checked) {
    checked ? checkedFeatureCount++ : checkedFeatureCount--;
  }

  const allValid = gender.valid && birthday.valid && checkedFeatureCount >= 2;
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
        <label htmlFor="features">
          Features
          <div className="feature">
            <input
              type="checkbox"
              id="feature-a"
              name="featureA"
              onChange={(e) => {
                setFeatures({ ...features, featureA: e.target.checked });
                handleCheckedFeatures(e.target.checked);
              }}
            />
            <label htmlFor="feature-a">Feature A</label>
          </div>
          <div className="feature">
            <input
              type="checkbox"
              id="feature-b"
              onChange={(e) => {
                setFeatures({ ...features, featureB: e.target.checked });
                handleCheckedFeatures(e.target.checked);
              }}
            />
            <label htmlFor="feature-b">Feature B</label>
          </div>
          <div className="feature">
            <input
              type="checkbox"
              id="feature-c"
              onChange={(e) => {
                setFeatures({ ...features, featureC: e.target.checked });
                handleCheckedFeatures(e.target.checked);
              }}
            />
            <label htmlFor="feature-c">Feature C</label>
          </div>
          <div className="feature">
            <input
              type="checkbox"
              id="feature-d"
              onChange={(e) => {
                setFeatures({ ...features, featureD: e.target.checked });
                handleCheckedFeatures(e.target.checked);
              }}
            />
            <label htmlFor="feature-d">Feature D</label>
            <p className="error">
              {checkedFeatureCount >= 2
                ? ""
                : "You must select at least two features"}
            </p>
          </div>
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
            setStage("Results");
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StageThree;

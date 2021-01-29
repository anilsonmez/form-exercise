const Results = ({ setStage, userInfo }) => {
  return (
    <div className="results">
      <div className="first-name">First Name: {userInfo.firstName}</div>
      <div className="last-name">Last Name: {userInfo.lastName}</div>
      <div className="email">E-mail: {userInfo.email}</div>
      <div className="password">Password: {userInfo.password}</div>
      <div className="gender">Gender: {userInfo.gender}</div>
      <div className="birthday">Birthday: {userInfo.birthday}</div>
      <button
        onClick={() => {
          setStage("StageOne");
        }}
      >
        First Page
      </button>
    </div>
  );
};

export default Results;

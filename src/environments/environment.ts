const url = "https://backend-wico-formation.onrender.com";
// const url = "http://localhost:3000";
export const environment = {
  production: false,
  // serveur url
  serverUrl: "https://backend-wico-formation.onrender.com",
  // serverUrl: "http://localhost:3000",
  // loginurl
  loginUrl: url + "/public/login",
  //photo url
  photoUrl: url + "/photo",
  // user url
  recoveryUrl: url + "/user/recoverpassword",
  addUserUrl: url + "/user/create",
  allUsersUrl: url + "/user/getAll",
  countUrl: url + "/user/getState",
  deleteUserUrl: url + "/user/delete",
  updateUserUrl: url + "/user/update",
  // session url
  addSessionUrl: url + "/session/create",
  allSessionsUrl: url + "/session/getAll",
  deleteSessionUrl: url + "/session/delete",
  updateSessionUrl: url + "/session/update",
  // seance url
  addSeanceUrl: url + "/seance/create",
  allSeancesUrl: url + "/seance/getAll",
  deleteSeanceUrl: url + "/seance/delete",
  updateSeanceUrl: url + "/seance/update",
  // formation url
  addFormationUrl: url + "/formation/create",
  allFormationsUrl: url + "/formation/getAll",
  deleteFormationUrl: url + "/formation/delete",
  updateFormationUrl: url + "/formation/update",
  // temoignage url
  addTemoignageUrl: url + "/temoignage/create",
  allTemoignagesUrl: url + "/temoignage/getAll",
  deleteTemoignageUrl: url + "/temoignage/delete",
  updateTemoignageUrl: url + "/temoignage/update",

  // mailjs cord
  SERVICE_ID: "service_zor1cnl",
  TEMPLATE_ID: "template_stolkxc",
  USER_ID: "UOnDJ0Tt7O1iwHU1B",
};

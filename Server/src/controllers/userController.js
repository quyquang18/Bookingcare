import userServices from '../services/userService'

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email && !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter",
    });
  } else {
    let optionsCookie = { httpOnly: false, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 };
    let userData = await userServices.handleUserLogin(email, password);
    res.cookie("user_role", userData.refreshToken, optionsCookie, { domain: "http://localhost:3000" });
    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.message,
      user: userData.user ? userData.user : {},
    });
  }
};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.type;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameter",
      user: [],
    });
  }
  let users = await userServices.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    message: "OK",
    user: users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userServices.createNewUser(req.body);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let message = await userServices.deleteUser(req.body.id);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  if (!data.id) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let message = await userServices.updateUser(data);
  return res.status(200).json(message);
};
let handeGetAllCode = async (req, res) => {
  try {
    let message = await userServices.getAllCodeService(req.query.type);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let handleVerifyEmail = async (req, res) => {
  let id = req.params.id;
  let token = req.params.token;
  let message = await userServices.verifyEmail(id, token);
  return res.status(message.status).json(message);
};
let handleGetValueSensor = async (req, res) => {
  let type = req.params.type;
  let value = req.params.value;
  if (!type && !value) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  } else {
    let message = await userServices.getValueSensor(type, value);
    return res.status(200).json(message);
  }
};
let handleSendEmailWarning = async (req, res) => {
  let data = req.body;
  if (!data) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing required parameters",
    });
  }
  let message = await userServices.sendEmailWarning(data);
  return res.status(200).json(message);
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  handleVerifyEmail: handleVerifyEmail,
  handleGetValueSensor: handleGetValueSensor,
  handleSendEmailWarning: handleSendEmailWarning,
  handeGetAllCode: handeGetAllCode,
};
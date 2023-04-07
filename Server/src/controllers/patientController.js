import patientServices from "../services/patientServices";
let postBookAppointment = async (req, res) => {
  try {
    let response = await patientServices.postBookAppointment(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let postVerifyBookAppointment = async (req, res) => {
  try {
    let id = req.params.id;
    let token = req.params.token;
    let response = await patientServices.postVerifyBookAppointment(id, token);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};

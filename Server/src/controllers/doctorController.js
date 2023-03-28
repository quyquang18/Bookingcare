import doctorSevices from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit || 10;

  try {
    let response = await doctorSevices.handleGetTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorSevices.handleGetAllDoctor();
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let postInforDoctor = async (req, res) => {
  try {
    let response = await doctorSevices.handlePostInforDoctor(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getDetailDoctorById = async (req, res) => {
  try {
    let infor = await doctorSevices.getDetailDoctorById(req.query.id);
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getMarkdownDoctorById = async (req, res) => {
  try {
    let infor = await doctorSevices.getMarkdownDoctorById(req.query.id);
    return res.status(200).json(infor);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let response = await doctorSevices.bulkCreateSchedule(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    let response = await doctorSevices.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getExtraInforDoctorById = async (req, res) => {
  try {
    let response = await doctorSevices.getExtraInforDoctorById(
      req.query.doctorId
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInforDoctor: postInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  getMarkdownDoctorById: getMarkdownDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctorById: getExtraInforDoctorById,
};

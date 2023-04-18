import patientServices from "../services/specialtyService";

let createNewSpecialty = async (req, res) => {
  try {
    let response = await patientServices.createNewSpecialty(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let editInforSpecialty = async (req, res) => {
  try {
    let response = await patientServices.editInforSpecialty(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getAllSpecialty = async (req, res) => {
  try {
    let response = await patientServices.getAllSpecialty();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getDetailSpecialtyById = async (req, res) => {
  try {
    let response = await patientServices.getDetailSpecialtyById(req.query.id, req.query.location);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
module.exports = {
  createNewSpecialty: createNewSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
  editInforSpecialty: editInforSpecialty,
};

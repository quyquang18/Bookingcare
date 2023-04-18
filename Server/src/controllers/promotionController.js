import patientServices from "../services/promotionService";

let createNewPromotion = async (req, res) => {
  try {
    let response = await patientServices.createNewPromotion(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getAllPromotion = async (req, res) => {
  try {
    let response = await patientServices.getAllPromotion();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
module.exports = {
  createNewPromotion: createNewPromotion,
  getAllPromotion: getAllPromotion,
};

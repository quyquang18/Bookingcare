import db from "../models/index";

let createNewClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.desEndowMarkdow ||
        !data.desIntroMarkdown ||
        !data.desStrengthsMarkdown ||
        // !data.desEquipmentMarkdown ||
        // !data.desAddressMarkdown ||
        // !data.desProcedureMarkdown ||
        !data.image
      ) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          desEndowHtml: data.desEndowHtml,
          desEndowMarkdow: data.desEndowMarkdow,
          desIntroHtml: data.desIntroHtml,
          desIntroMarkdown: data.desIntroMarkdown,
          desStrengthsHtml: data.desStrengthsHtml,
          desStrengthsMarkdown: data.desStrengthsMarkdown,
          desEquipmentHtml: data.desEquipmentHtml,
          desEquipmentMarkdown: data.desEquipmentMarkdown,
          desAddressHtml: data.desAddressHtml,
          desAddressMarkdown: data.desAddressMarkdown,
          desProcedureHtml: data.desProcedureHtml,
          desProcedureMarkdown: data.desProcedureMarkdown,
          image: data.image,
        });
        resolve({
          errCode: 0,
          message: "Create new clinic succeed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllClinic = (mode) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      if (mode === "simple") {
        data = await db.Clinic.findAll({
          attributes: ["id", "name", "image", "address"],
        });
      } else {
        data = await db.Clinic.findAll({
          raw: true,
        });
      }
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          data: "Missing required parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
        });
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewClinic: createNewClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};

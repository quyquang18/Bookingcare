import db from "../models/index";

let createNewClinic = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.name ||
        !inputData.address ||
        !inputData.desEndowMarkdow ||
        !inputData.desIntroMarkdown ||
        !inputData.desStrengthsMarkdown ||
        !inputData.avatar ||
        !inputData.coverImage ||
        !inputData.actions
        // !data.desAddressMarkdown ||
        // !data.desProcedureMarkdown ||
      ) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        if (inputData.actions === "CREATE") {
          await db.Clinic.create({
            name: inputData.name,
            address: inputData.address,
            desEndowHtml: inputData.desEndowHtml,
            desEndowMarkdow: inputData.desEndowMarkdow,
            desIntroHtml: inputData.desIntroHtml,
            desIntroMarkdown: inputData.desIntroMarkdown,
            desStrengthsHtml: inputData.desStrengthsHtml,
            desStrengthsMarkdown: inputData.desStrengthsMarkdown,
            desEquipmentHtml: inputData.desEquipmentHtml,
            desEquipmentMarkdown: inputData.desEquipmentMarkdown,
            desAddressHtml: inputData.desAddressHtml,
            desAddressMarkdown: inputData.desAddressMarkdown,
            desProcedureHtml: inputData.desProcedureHtml,
            desProcedureMarkdown: inputData.desProcedureMarkdown,
            avatar: inputData.avatar,
            coverImage: inputData.coverImage,
            countBooking: 0,
          });
          resolve({
            errCode: 0,
            message: "Create new clinic succeed",
          });
        }
        if (inputData.actions === "EDIT") {
          if (inputData.clinicId) {
            let data = await db.Clinic.findOne({
              where: { id: inputData.clinicId },
            });
            data.name = inputData.name;
            data.address = inputData.address;
            data.desEndowHtml = inputData.desEndowHtml;
            data.desEndowMarkdow = inputData.desEndowMarkdow;
            data.desIntroHtml = inputData.desIntroHtml;
            data.desIntroMarkdown = inputData.desIntroMarkdown;
            data.desStrengthsHtml = inputData.desStrengthsHtml;
            data.desStrengthsMarkdown = inputData.desStrengthsMarkdown;
            data.desEquipmentHtml = inputData.desEquipmentHtml;
            data.desEquipmentMarkdown = inputData.desEquipmentMarkdown;
            data.desAddressHtml = inputData.desAddressHtml;
            data.desAddressMarkdown = inputData.desAddressMarkdown;
            data.desProcedureHtml = inputData.desProcedureHtml;
            data.desProcedureMarkdown = inputData.desProcedureMarkdown;
            data.avatar = inputData.avatar;
            data.coverImage = inputData.coverImage;

            await data.save();
            resolve({
              errCode: 0,
              message: "Update clinic succeed",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
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
          attributes: ["id", "name"],
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
      console.log(error);
      reject(error);
    }
  });
};
let getTopClinicHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!limitInput) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        let data = await db.Clinic.findAll({
          limit: +limitInput,
          attributes: ["id", "name", "avatar", "address"],
          order: [["countBooking", "DESC"]],
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      console.log(error);
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
          raw: true,
        });
        if (data) {
          let doctorClinic = await db.Doctor_infor.findAll({
            where: {
              clinicId: inputId,
            },
            attributes: ["doctorId", "provinceId"],
            raw: true,
          });
          data.listDoctor = doctorClinic;
        }
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
  getTopClinicHome: getTopClinicHome,
};

import db from "../models/index";

let createNewSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.nameSpecialtyVn || !data.descriptionMarkdownVn || !data.descriptionHtmlVn || !data.imageSpecialty) {
        resolve({
          errCode: 1,
          data: "Missing required parameter",
        });
      } else {
        await db.Specialty.create({
          nameVn: data.nameSpecialtyVn,
          nameEn: data.nameSpecialtyEn,
          descriptionMarkdownVn: data.descriptionMarkdownVn,
          descriptionMarkdownEn: data.descriptionMarkdownEn,
          descriptionHtmlVn: data.descriptionHtmlVn,
          descriptionHtmlEn: data.descriptionHtmlEn,
          image: data.imageSpecialty,
        });

        resolve({
          errCode: 0,
          data: "Create new specialty succeed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let editInforSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.idSpecialty) {
        resolve({
          errCode: 1,
          data: "Missing required parameter",
        });
      } else {
        let specialtyInfor = await db.Specialty.findOne({
          where: { id: data.idSpecialty },
          raw: false,
        });
        if (specialtyInfor) {
          specialtyInfor.nameVn = data.nameSpecialtyVn;
          specialtyInfor.nameEn = data.nameSpecialtyEn;
          specialtyInfor.descriptionHtmlVn = data.descriptionHtmlVn;
          specialtyInfor.descriptionHtmlEn = data.descriptionHtmlEn;
          specialtyInfor.descriptionMarkdownVn = data.descriptionMarkdownVn;
          specialtyInfor.descriptionMarkdownEn = data.descriptionMarkdownEn;
          if (data.imageSpecialty) {
            specialtyInfor.image = data.imageSpecialty;
          }
          await specialtyInfor.save();
          resolve({
            errCode: 0,
            message: `Update the user succeeds`,
          });
        } else {
          resolve({
            errCode: 1,
            message: `User's not found!`,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({
        raw: true,
      });
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          data: "Missing required parameter",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: ["nameVn", "nameEn", "descriptionHtmlVn", "descriptionHtmlEn", "image"],
          raw: true,
        });
        if (data) {
          let doctorSpecialty;
          if (location == "ALL") {
            doctorSpecialty = await db.Doctor_infor.findAll({
              where: {
                specialtyId: inputId,
              },
              attributes: ["doctorId", "provinceId"],
              include: [
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
              raw: true,
              nest: true,
            });
          } else {
            doctorSpecialty = await db.Doctor_infor.findAll({
              where: {
                specialtyId: inputId,
                provinceId: location,
              },
              attributes: ["doctorId", "provinceId"],
              raw: true,
            });
          }
          data.doctorSpecialty = doctorSpecialty;
        }

        if (!data) data = {};
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

module.exports = {
  createNewSpecialty: createNewSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
  editInforSpecialty: editInforSpecialty,
};

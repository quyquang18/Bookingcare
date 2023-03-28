import _, { reject } from "lodash";

import db from "../models/index";

require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let handleGetTopDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetAllDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let handlePostInforDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData) {
        resolve({
          errCode: 1,
          data: "Missing required parameter",
        });
      } else {
        if (inputData.options === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            doctorId: inputData.doctorId,
          });
          resolve({
            errCode: 0,
            data: "create infor detail doctor succeed",
          });
        }
        if (inputData.options === "EDIT") {
          let result = await db.Markdown.findOne({
            where: {
              doctorId: inputData.doctorId,
            },
          });
          if (result) {
            result.contentHTML = inputData.contentHTML;
            result.contentMarkdown = inputData.contentMarkdown;
            result.description = inputData.description;
            await result.save();
            resolve({
              errCode: 0,
              message: `Update infor doctor succeeds`,
            });
          }
        } else if (inputData.options === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            doctorId: inputData.doctorId,
          });
          resolve({
            errCode: 0,
            data: "create infor detail doctor succeed",
          });
        }
        let doctorInfor = await db.Doctor_infor.findOne({
          where: {
            doctorId: inputData.doctorId,
          },
          raw: false,
        });
        if (doctorInfor) {
          //Update
          doctorInfor.priceId = inputData.selectedPrice;
          doctorInfor.paymentId = inputData.selectedPayment;
          doctorInfor.provinceId = inputData.selectedProvince;

          doctorInfor.nameClinic = inputData.nameClinic;
          doctorInfor.addressClinic = inputData.addressClinic;
          doctorInfor.note = inputData.note;
          await doctorInfor.save();
        } else {
          //create
          await db.Doctor_infor.create({
            doctorId: inputData.doctorId,
            priceId: inputData.selectedPrice,
            paymentId: inputData.selectedPayment,
            provinceId: inputData.selectedProvince,
            addressClinic: inputData.addressClinic,
            nameClinic: inputData.nameClinic,
            note: inputData.note,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          data: "Missing required parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["contentHTML", "contentMarkdown", "description"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_infor,
              attributes: {
                exclude: ["id", "doctorId", "updatedAt", "createdAt"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
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
let getMarkdownDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          data: "Missing required parameter",
        });
      } else {
        let data = await db.Markdown.findOne({
          where: {
            doctorId: inputId,
          },
          attributes: [
            "contentHTML",
            "contentMarkdown",
            "description",
            "doctorId",
          ],

          // raw: true,
          // nest: true,
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
let bulkCreateSchedule = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        inputData &&
        inputData.arrSchedule &&
        inputData.doctorId &&
        inputData.formatedDate
      ) {
        let schedules = inputData.arrSchedule;

        if (schedules && schedules.length > 0) {
          schedules.map((item) => (item.maxNumber = +MAX_NUMBER_SCHEDULE));
        }
        let existing = await db.Schedule.findAll({
          where: {
            doctorId: inputData.doctorId,
            date: inputData.formatedDate,
          },
          attributes: ["maxNumber", "date", "doctorId", "timeType"],
          raw: true,
        });

        let toCreate = _.differenceWith(schedules, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });

        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
      } else {
        resolve({
          errCode: 1,
          data: "Missing required parameter",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getScheduleByDate = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId && !date) {
        resolve({
          errCode: 1,
          data: "Missing required parameter",
        });
      } else {
        let schedules = await db.Schedule.findAll({
          where: {
            doctorId,
            date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: true,
          nest: true,
        });
        if (!schedules) schedules = [];
        resolve({
          errCode: 0,
          data: schedules,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getExtraInforDoctorById = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: 1,
          data: "Missing required parameter",
        });
      } else {
        let data = await db.Doctor_infor.findOne({
          where: {
            doctorId: idInput,
          },
          attributes: {
            exclude: ["doctorId", "id"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
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
  handleGetTopDoctorHome: handleGetTopDoctorHome,
  handleGetAllDoctor: handleGetAllDoctor,
  handlePostInforDoctor: handlePostInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  getMarkdownDoctorById: getMarkdownDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctorById: getExtraInforDoctorById,
};

import db from "../models";

let createNewPromotion = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData.name || !inputData.image || !inputData.description || !inputData.typePromotion || !inputData.modal) {
        resolve({
          errCode: 1,
          inputData: "Missing required parameter",
        });
      } else {
        if (inputData.modal === "CREATE") {
          await db.Promotion.create({
            name: inputData.name,
            image: inputData.image,
            description: inputData.description,
            typePromotion: inputData.typePromotion,
          });
          resolve({
            errCode: 0,
            data: "Create Succeed",
          });
        }
        if (inputData.modal === "EDIT") {
          if (!inputData.idPromotion) {
            resolve({
              errCode: 1,
              data: "Missing required parameter",
            });
          } else {
            let dataPromotion = await db.Promotion.findOne({
              where: { id: inputData.idPromotion },
              raw: false,
            });
            dataPromotion.name = inputData.name;
            dataPromotion.image = inputData.image;
            dataPromotion.description = inputData.description;
            dataPromotion.typePromotion = inputData.typePromotion;
            await dataPromotion.save();
            resolve({
              errCode: 0,
              data: "Edit Succeed",
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
let getAllPromotion = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Promotion.findAll({
        include: [
          {
            model: db.Allcode,
            as: "promotionData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
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
module.exports = {
  createNewPromotion: createNewPromotion,
  getAllPromotion: getAllPromotion,
};

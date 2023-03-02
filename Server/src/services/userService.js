import db from '../models/index'
import bcrypt from 'bcryptjs'
const crypto = require("crypto");
const { Sequelize, Op } = require("sequelize");
import emailService from './emailService'
const salt = bcrypt.genSaltSync(10);

let handleUserLogin =(email,password)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let userData ={};
            let isExist = await checkUserEmail(email);
            if(isExist){
                let user =await db.User.findOne({
                    where:{email:email},
                    raw :true,
                });
                if(user){
                   let checkPass = await bcrypt.compareSync(password,user.password)
                   if(checkPass){
                    console.log(user)
                    // if(!user.verifed){
                    //     userData.errCode=4;
                    //     userData.message='Your account has not been verified. Please verify your account to continue'
                    // }else {
                        userData.errCode=0;
                        userData.message='Ok';
                        delete user.password;
                        userData.user =user;
                    // }
                   }
                   else {
                    userData.errCode=3;
                    userData.message='Wrong password'
                   }
                } else
                {
                    userData.errCode =2;
                    userData.message =`User's not found~`
                }

            }else {
                userData.errCode =1;
                userData.message = `Your's Email isn't exist in your system. Plz try other Email!`
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}
let hashUserPassword =(password)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let hashPassword = await bcrypt.hashSync(password,salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error)
        }
    })
}
let checkUserEmail = (userEmail)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user =await db.User.findOne({
                where:{email:userEmail}
            })
            if(user) {
                resolve(true)
            }else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllUsers =(userId) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users ='';
            if (userId==='ALL'){
                users =await db.User.findAll({
                    attributes: {
                        exclude:['password','R1']
                    }
                })
            }
            if(userId && userId !=='ALL') {
                users =await db.User.findOne({
                    where:{id:userId},
                    attributes: {
                        exclude:['password']
                    }
                })
            }
            resolve(users)

        } catch (error) {
            reject(error)
        }
    })
}
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = await checkUserEmail(data.email);
      if (checkEmail) {
        resolve({
          errCode: 1,
          message:
            "Email already exists in the system. Please try another email",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        let user = await db.User.create({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          gender: +data.gender,
          password: hashPasswordFromBcrypt,
          phonenumber: data.phonenumber,
          roleId: "R3",
          positionId: "R3",
          image: "iqweqw",
        });

        // let token = await db.Token.create({
        //     token: crypto.randomBytes(32).toString("hex"),
        //     userId: user.id,
        // });
        // const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;
        // await emailService.sendSimpleEmail({
        //     firstname:data.firstname,
        //     receiverEmail:data.email,
        //     username:data.username,
        //     url:url,
        // });
        resolve({
          errCode: 0,
          message: "Create user successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        resolve({
          errCode: 2,
          message: `The User isn't exist`,
        });
      }
      await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        message: `The user is deleted`,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.phonenumber = data.phonenumber;
        user.address = data.address;
        await user.save();
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
    } catch (error) {
      reject(error);
    }
  });
};
let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(typeInput);
      if (!typeInput) {
        resolve({
          errCode: 1,
          message: "Missing required parameters",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let verifyEmail = (inputId, inputToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: inputId },
        raw: false,
      });
      if (!user) {
        resolve({
          status: 400,
          errCode: 1,
          message: `Invalid link`,
        });
      }
      let token = await db.Token.findOne({
        where: {
          userId: user.id,
          token: inputToken,
        },
        raw: false,
      });
      if (!token) {
        resolve({
          status: 400,
          errCode: 1,
          message: `Invalid link`,
        });
      }
      user.verifed = true;
      await user.save();
      await db.Token.destroy({
        where: { userId: user.id },
      });
      resolve({
        status: 200,
        errCode: 0,
        message: `Email verified successfully`,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getValueSensor = (type, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      let values = "";
      if (type === "day") {
        values = await db.valueSensor.findAll({
          where: { date: value },
        });
        console.log(values);
      }
      if (type === "month") {
        values = await db.valueSensor.findAll({
          where: Sequelize.where(
            Sequelize.fn("month", Sequelize.col("date")),
            11
          ),
        });
      }
      resolve({
        errCode: 0,
        value: values,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let sendEmailWarning = async (data) => {
  await emailService.sendEmailWarning({
    firstname: data.firstname,
    receiverEmail: data.email,
    type: data.type,
    date: data.date,
    time: data.time,
    value: data.value,
  });
  return {
    errCode: 0,
    message: "Ok",
  };
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  verifyEmail: verifyEmail,
  getValueSensor: getValueSensor,
  sendEmailWarning: sendEmailWarning,
  getAllCodeService: getAllCodeService,
};
import db from "../models/index";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.date || !data.timeType || !data.fullName) {
        resolve({
          errCode: 1,
          data: "Missing required parameter",
        });
      } else {
        let token = uuidv4();
        let urlEmail = `${process.env.BASE_URL}/verify-booking?id=${data.doctorId}&token=${token}`;
        console.log(urlEmail);

        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          address: data.address,
          phoneNumber: data.phoneNumber,
          reason: data.reason,
          redirectLink: urlEmail,
        });
        //Upsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
          raw: true,
        });
        //create a booking record
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          data: "Succeed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let postVerifyBookAppointment = (inputId, inputToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(inputId, inputToken);
      if (!inputId || !inputToken) {
        resolve({
          errCode: 1,
          data: "Missing required parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: inputId,
            token: inputToken,
            statusId: "S1",
          },
          raw: false,
        });
        console.log(appointment);
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            data: "Update the appointment succeed",
          });
        } else {
          resolve({
            errCode: 2,
            data: "Appointment has been activated or does not exist",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};

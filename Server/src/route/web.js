import express from "express";
import userController from "../controllers/userController"
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/user/:id/verify/:token/", userController.handleVerifyEmail);
  router.get("/api/allcode/", userController.handeGetAllCode);
  router.post("/api/send-email-warning", userController.handleSendEmailWarning);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/post-infor-doctor", doctorController.postInforDoctor);
  router.get("/api/get-detail-doctor-by-id", doctorController.getDetailDoctorById);
  router.get("/api/get-markdown-doctor-by-id", doctorController.getMarkdownDoctorById);
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get("/api/get-schedule-by-date", doctorController.getScheduleByDate);
  router.get("/api/get-extra-infor-doctor-by-id", doctorController.getExtraInforDoctorById);
  router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDoctorById);

  router.post("/api/patient-book-appointment", patientController.postBookAppointment);
  router.get("/api/:id/verify-book-appointment/:token/", patientController.postVerifyBookAppointment);

  router.post("/api/create-new-speciaty", specialtyController.createNewSpecialty);
  router.get("/api/get-all-speciaty", specialtyController.getAllSpecialty);
  router.get("/api/get-detail-speciaty-by-id", specialtyController.getDetailSpecialtyById);
  router.post("/api/edit-infor-specialty", specialtyController.editInforSpecialty);

  router.post("/api/create-new-clinic", clinicController.createNewClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.get("/api/get-detail-clinic-by-id", clinicController.getDetailClinicById);
  router.post("/api/edit-infor-clinic", clinicController.editInforClinic);

  return app.use("/", router);
};

module.exports = initWebRoutes;
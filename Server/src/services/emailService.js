require('dotenv').config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Noname 👻" <noreply@example.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: dataSend.language === "vi" ? "Xác nhận đặt lịch khám bệnh ✔" : "Confirmation of medical appointment ✔", // Subject line
    html: getHtmlBodyEmail(dataSend), // html body
  });
};
let getHtmlBodyEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <div style="background-color:#eeebeb;padding:2px 22px 32px">
    <h3 style="font-size:32px;font-weight:600;color:#000;text-align:center">Xin chào ${dataSend.patientName}</h3>
    <p style="font-size:20px;text-align:left;padding:0 20px">Bạn nhận được email này vì đã đặt lịch khám bệnh trên trang Bookingcare </p>
    <div>
      <br> <strong>Thông tin cá nhân:</strong>
      <br>Họ và tên: ${dataSend.patientName}
      <br>Địa chỉ: ${dataSend.address}
      <br>Số điện thoại : ${dataSend.phoneNumber}<br>
    </div>
    <div>
      <br> <strong>Thông tin đặt lịch khám bệnh:</strong>
      <br>Thời gian : ${dataSend.time}
      <br>Lí do khám : ${dataSend.reason}
      <br>Bác sĩ : ${dataSend.doctorName}<br>
    </div>
    <p>Nếu các thông tin trên là đúng sự thật,vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh </p>
    <div style="color:black;background-color:#f47346;font-weight:700;font-size:18px;padding:12px 22px;text-align:center;margin:12px 60px"> 
    <a href="${dataSend.redirectLink}" target="_blank" style="text-decoration:none;" > 👉 Ấn vào đây để xác nhận</a>
    </div>
    <div>Nếu bạn không phải bạn vui lòng bỏ qua Email này</div>
    <div style="margin:22px 0">Xin trân trọng cảm ơn.</div>
    
    </div> `;
  }
  if (dataSend.language === "en") {
    result = `
    <div style="background-color:#eeebeb;padding:2px 22px 32px">
    <h3 style="font-size:32px;font-weight:600;color:#000;text-align:center">Dear ${dataSend.patientName} !</h3>
    <p style="font-size:20px;text-align:left;padding:0 20px">You received this email because you booked a medical appointment on Bookingcare </p>
    <div>
       <br> <strong>Personal Information:</strong>
       <br>First and last name: ${dataSend.patientName}
       <br>Address: ${dataSend.address}
       <br>Phone number : ${dataSend.phoneNumber}<br>
     </div>
     <div>
       <br> <strong>Medical appointment booking information:</strong>
       <br>Time : ${dataSend.time}
       <br>Reason for examination : ${dataSend.reason}
       <br>Doctor : ${dataSend.doctorName}<br>
    </div>
    <p>If the above information is true, please click on the link below to confirm and complete the medical appointment booking procedure. </p>
    <div style="color:black;background-color:#f47346;font-weight:700;font-size:18px;padding:12px 22px;text-align:center;margin:12px 60px"> 
    <a href="${dataSend.url}" target="_blank" style="text-decoration:none;" > 👉 Click here to confirm</a>
    </div>
    <div>If you are not, please ignore this email</div>
    <div style="margin:22px 0">Thank you very much.</div>
    
    </div> `;
  }
  return result;
};
let sendEmailWarning = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Noname 👻" <noreply@example.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    // subject: `Warning ${dataSend.type} !`, // Subject line
    html: `
      <div style="background-color:#eeebeb;padding:2px 22px 32px">
      <h3 style="font-size:32px;font-weight:600;color:#000;text-align:center">Hello ${dataSend.fullName}</h3>
      <p style="font-size:20px;text-align:left;padding:0 75px">Warning system </p>
      <div>
        <br> <strong>Thông tin chi tiết:</strong>
        <br>Day-Month-Year : ${dataSend.date}
        <br>Time : ${dataSend.time}
        <br>${dataSend.type} : ${dataSend.value}<br>
      </div>
      <br>
      <br>
      <div>Please check the devices again</div>
      <div style="margin:22px 0">Thank you very much.</div>
      </div>
      </div> `, // html body
  });
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
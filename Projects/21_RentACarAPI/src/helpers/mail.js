const nodemailer = require("nodemailer");
const dateToLocaleString = require("../helpers/dateToLocaleString");


function sendEmail(email,firstName,_id ,brand,plateNo,pickOfDate,dropOfDate,pickOfLocation,dropOfLocation,totalPrice) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alidrl26@gmail.com",
      pass: "byyh gygs ogji rtxs",
    },
  });

  const mailOptions = {
    from: { name: "DURUL RENT CAR", address: "alidrl26@gmail.com" },
    // attachments: [
    //     {
    //         filename: "deneme dosya",
    //         path: "C:\\Users\\Mehmet\\Desktop\\aaa.png",
    //     },
    // ],
    to: email,
    subject: "Reservation Confirmation and Rental Details",
    text: `
    Dear ${firstName},

Your reservation has been successfully confirmed. Below, you can find the details of your rental:

Reservation Number: ${_id}
Rental Dates: ${dateToLocaleString(pickOfDate)   } - ${ dateToLocaleString(dropOfDate) }
Rented Vehicle: ${brand}
Vehicle License Plate: ${plateNo}
Reservation Cost: ${totalPrice}

Some information to keep in mind during your rental period:

* The vehicle will be delivered to you at ${pickOfLocation} on the specified date.
* The vehicle should be returned to ${dropOfLocation} on the specified date.
* Please be prepared on the start date of your reservation. We will be in touch with you on the day of your rental.

If you have any questions or special requests, please don't hesitate to contact us at +260 970732144.

We wish you a safe and enjoyable journey!

Best regards,

Durul Rent a Car
+260 970732144
    `,
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      throw new Error("Email did not go trough!");
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmail;

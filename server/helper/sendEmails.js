const transporter = require("../config/email");
exports.sendOrderEmail = async (email, orderDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Order Confirmation",
    text: `Thank you for your order! Here are the details: ${JSON.stringify(orderDetails)}`,
  };
  await transporter.sendMail(mailOptions);
};

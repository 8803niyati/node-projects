const nodemailer = require('nodemailer');

exports.sendEmail = async (msg) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: "niyatidhanani05@gmail.com",
            pass: "oxnqhxxstgxiumut",
        },
    });

    const info = await transporter.sendMail(msg);
    console.log("Message sent:", info.messageId);
    return info;
};
 
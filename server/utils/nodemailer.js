const nodemailer = require("nodemailer");

module.exports = {
    sendEmail: function (email) {
        // node mailer
        // Create the transporter with the required configuration for Outlook
        // change the user and pass !
        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
                ciphers: 'SSLv3'
            },
            auth: {
                user: 'flower-shop-project-3@hotmail.com',
                pass: 'Flower.1234321'
            }
        });

        // setup e-mail data, even with unicode symbols
        var mailOptions = {
            from: '"The Flower Shop" <flower-shop-project-3@hotmail.com>', // sender address (who sends)
            to: email, // list of receivers (who receives)
            subject: 'The Flower Shop - New order confirmation.', // Subject line
            html: `this finally works`
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            console.log('Message sent');
        });
    }
}

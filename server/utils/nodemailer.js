const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');

module.exports = {
    sendEmail: function (email, emailData) {


        // node mailer
        // Create the transporter with the required configuration for Outlook
        // change the user and pass !
        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
                ciphers: 'SSLv3'
            },
            auth: {
                user: 'flower-shop-project-3@outlook.com',
                pass: 'Flower.1234321'
            }
        });

        var options = {
            viewEngine: {
                extname: '.handlebars',
                layoutsDir: '../server/views/',
                defaultLayout: 'index',
                partialsDir: '../server/views/partials/'
            },
            viewPath: '../server/views/'
        }

        transporter.use('compile', hbs(options));

        

        // setup e-mail data, even with unicode symbols
        let mailOptions = {
            from: '"Flower Shop" <flower-shop-project-3@outlook.com>', // sender address (who sends)
            to: email, // list of receivers (who receives)
            subject: 'Flower Shop - New order confirmation.', // Subject line
            template: ('index'),
            context: { 
                data: emailData }
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

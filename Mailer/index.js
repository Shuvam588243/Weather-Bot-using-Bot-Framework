const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

module.exports.sendMail = async(mail, body) => {
    const msg = {
        to: mail, // Change to your recipient
        from: process.env.MAIL, // Change to your verified sender
        subject: body.subject,
        text: body.description,
    }
    sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log("Mail Send.");
        })
        .catch((error) => {
            console.error(error)
        })
}
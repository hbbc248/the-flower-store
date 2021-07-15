

module.exports = {
    
    nodemailerMiddleware: async ({ req }) => {
    const { email, cart } = req.body
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
          user: "hank.miller@ethereal.email",
          pass:"wHRVJEvdPe9V464TbA"
      }
  })
    const msg = {
      from: '"Flower Shop" <flower-shop@email.com>',
      to:  `${email}` ,
      subject: 'Your recent order',
      text: `${cart}`
    }

  const info = await sendMail(msg)
  
  console.log("message sent", info.messageId)
  
  }
}
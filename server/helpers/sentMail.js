import nodemailer from 'nodemailer'


export default function sentMail(email,message1,subject){
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: 'amipk2001@gmail.com',
              pass: 'gzpenpqheyoeplcl',
            },
        })

        var mailOptions={
            from: 'amipk2001@gmail.com',
            to: email,
            subject: {subject},
            html: `
            <h1>Taskify</h1>
              <h2>${message1}</h2>
            
            `,
          }

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("error", error, info)
              reject(error)

            } else {
              console.log("success")
              resolve({success:true, message:"Email sent successfull"})
            }
          });
    })
}
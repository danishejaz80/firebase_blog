const mailjet = require('node-mailjet').connect('edbced363ed0d53b3b42638c9000256d', '7cc531278282b71964f92642f07fb7cc')

exports.sendEmail = (user) => {
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "danish.ejaz@invozone.com",
                        "Name": "Danish"
                    },
                    "To": [
                        {
                            "Email": `${user.email}`,
                            "Name": `${user.firstName} ${user.lastName}`
                        }
                    ],
                    "Subject": "Blog Account Verification",
                    "TextPart": "Activate your profile",
                    "HTMLPart": `<h3>Dear ${user.username},</h3><h5>Your account on firebase blog has been successfully created, now you're just one step away</h5><h6><a href='${user.link}'>Click on this link to activate your account</a></h6>`,
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        })

    request.then((result) => {
        console.log(result.body)
    }).catch((err) => {
        console.log(err.statusCode)
    })

}

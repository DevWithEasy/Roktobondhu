const transporter = require('./transporter')


exports.sendVerificaion=(userEmail,name,code)=>{
    const options = {
        from : process.env.EMAIL,
        to : userEmail,
        subject : 'Roktobondhu Account Verifcaion',
        html : `<div style="background: #fef2f2;padding: 12px;border-radius: 10px;">
        <h1 style="text-align: center; color:#ef4444;">Roktobondhu</h1>
        <hr>
        <p>Dear <strong>${name}</strong> ,</p>
        <p>Assalamualikum.</p>
        <p>Your account verification code is :  <span style="font-size: 20px;font-weight: 600; color:#ef4444;">${code}</span></p>
        <p>This code will be expire after 06 hours laters.</p>
        <h3>Thanks</h3>
        <p><strong>Roktobondhu Teams</strong></p>
    </div>`
    }
    transporter.sendMail(options,function(err,result) {
        if (err) {
            console.log(err)
        }
    })
}

exports.sendSuccessful=(userEmail,name)=>{
    const options = {
        from : process.env.EMAIL,
        to : userEmail,
        subject : 'Congratulations Roktobondhu Account successfully verified',
        html : `<div style="background: #e7e0e0;padding: 12px; border-radius: 10px;">
        <h1 style="text-align: center;">Roktobondhu</h1>
        <hr>
        <p>Dear <strong>${name}</strong> ,</p>
        <p>Assalamualikum.</p>
        <p style="line-height: 20px;">Welcome to Roktobondhu family.Your account suceessfully verified.Insallah we try to give the best service to our customer.If you feel any problem to use our service insallah you will notice us to use our cusotomer support service.Our team always ready to provide service to our valuable customer.</p>
        <h3>Thanks</h3>
        <p><strong>Roktobondhu Teams</strong></p>
    </div>`
    } 
    transporter.sendMail(options,function(err,result) {
        if (err) {
            console.log(err)
        }
    })
}

exports.sendForgetPassword=(userEmail,name,code)=>{
    const options = {
        from : process.env.EMAIL,
        to : userEmail,
        subject : 'Roktobondhu forget password',
        html : `<div style="background: #e7e0e0;padding: 12px;border-radius: 10px;">
        <h1 style="text-align: center;">Roktobondhu</h1>
        <hr>
        <p>Dear <strong>${name}</strong> ,</p>
        <p>Assalamualikum.</p>
        <p>Reset account password : <b>${code}</b></p>
        <p>This code will be expire after 06 hours laters.</p>
        <h3>Thanks</h3>
        <p><strong>Roktobondhu Teams</strong></p>
    </div>`
    }
    transporter.sendMail(options,function(err,result) {
        if (err) {
            console.log(err)
        }
    })
}

exports.passwordChangeSuccessfull=(userEmail,name)=>{
    const options = {
        from : process.env.EMAIL,
        to : userEmail,
        subject : 'Roktobondhu password changed successfully',
        html : `<div style="background: #e7e0e0;padding: 12px;border-radius: 10px;">
        <h1 style="text-align: center;">Roktobondhu</h1>
        <hr>
        <p>Dear <strong>${name}</strong> ,</p>
        <p>Assalamualikum.</p>
        <p>Your account password has been changed successfully</p>
        <p>Stay with us.</p>
        <h3>Thanks</h3>
        <p><strong>Roktobondhu Teams</strong></p>
    </div>`
    }
    transporter.sendMail(options,function(err,result) {
        if (err) {
            console.log(err)
        }
    })
}
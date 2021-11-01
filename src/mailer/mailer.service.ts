const nodemailer = require('nodemailer')

class MailerService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "adu24.market@gmail.com",
                pass: "Bgc39oVdALrvve"
            }
        })

    }

    async sendActivationMail(email:string, link: string) {
       await this.transporter.sendMail({
            from: "adu24.market@gmail.com",
            to:email,
            subject: "Активация аккаунта",
            text: '',
            html: `
             <div> 
                    <h1 style="color:red">Салам ниггер</h1>
                   <a href="${link}">${link}</a>
                   <img src="https://www.ivi.ru/titr/uploads/2017/04/10/3ca099c9f18a27a16caab75288dd634f.jpg/1400x0" alt="">
              </div>
             `
        })

    }
}
export default new MailerService()


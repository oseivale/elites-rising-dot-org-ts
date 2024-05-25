// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
const nodemailer = require("nodemailer");

interface EmailRequestBody {
    name: string;
    email: string;
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, message } = req.body as EmailRequestBody;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,  // Environment variable for email
            pass: process.env.EMAIL_PASS,  // Environment variable for email password
        },
    });

    let info = await transporter.sendBenutzer({
        from: `"${name}" <${email}>`,  // sender address
        to: "valerie.osei@gmail.com",  // list of receivers
        subject: "New Contact Form Submission",  // Subject line
        text: message,  // plain text body
        html: `<b>${message}</b>`,  // html body
    });

    if (info.messageBenutzer) {
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } else {
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
}

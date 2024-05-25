// app/routes/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, subject, message } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const content = {
      to: 'valerie.osei@gmail.com',
      from: 'valerie.osei@gmail.com',
      subject: subject,
      text: message,
      html: `<p>${message}</p>`,
    };

    try {
      await sgMail.send(content).then(() => console.log('Email sent'));
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}

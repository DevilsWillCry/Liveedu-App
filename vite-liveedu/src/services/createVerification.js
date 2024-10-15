import dotenv from 'dotenv';
dotenv.config(); 
import twilio from 'twilio';


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


export const createVerification = async (number) => {
  const verification = await client.verify.v2
    .services("VAfd48ee9dfc13d545b556980cbe695a7a")
    .verifications.create({
      channel: "sms",
      to: number,
    });

  console.log(verification);
}

export default createVerification;
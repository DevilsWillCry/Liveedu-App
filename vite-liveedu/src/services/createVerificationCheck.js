import dotenv from 'dotenv';
dotenv.config(); 
import twilio from 'twilio';


// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const createVerificationCheck = async (code) => {
  const verificationCheck = await client.verify.v2
    .services("VAfd48ee9dfc13d545b556980cbe695a7a")
    .verificationChecks.create({
      code: code,
      to: process.env.TWILIO_PHONE_NUMBER,
    });
  console.log(verificationCheck);
  return verificationCheck.status
}

export default createVerificationCheck;

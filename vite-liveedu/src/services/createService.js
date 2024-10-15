import dotenv from 'dotenv';
dotenv.config(); 
import twilio from 'twilio';

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


// Generar un código aleatorio de 4 dígitos


export const createService = async () => {
  const service = await client.verify.v2.services.create({
    friendlyName: "Verify-Services-Liveedu",
    customCodeEnabled: true,
    codeLength: 4,
    CustomMessage: "Liveedu Verification Code: (##CODE##)",
  });

  console.log(service.sid);
}
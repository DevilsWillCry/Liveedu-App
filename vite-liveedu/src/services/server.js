import express from 'express';
import dotenv from 'dotenv';
import twilio from 'twilio';
import cors from 'cors'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware para manejar CORS
app.use(cors()); // Habilitar CORS para todas las rutas


// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura Twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Crear un servicio de verificación
const createService = async () => {
  const service = await client.verify.v2.services.create({
    friendlyName: "Verify-Services-Liveedu",
    customCodeEnabled: true,
    codeLength: 4,
    customMessage: "Liveedu Verification Code: (##CODE##)",
  });
  return service.sid;
};

const service = await createService();
console.log(service)

// Endpoint para iniciar la verificación
app.post('/verify', async (req, res) => {
  const { number } = req.body;
  try {
    const serviceSid =  service; // Reemplaza con tu SID de servicio
    const verification = await client.verify.v2
      .services(serviceSid)
      .verifications.create({
        channel: 'sms',
        to: number,
      });

    res.json({ success: true, verification: verification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error en la verificación' });
  }
});

// Endpoint para comprobar el código de verificación
app.post('/verify-check', async (req, res) => {
  const { code, number } = req.body; // Cambié 'to' a 'number' para mayor claridad
  try {
    const serviceSid = service; // Reemplaza con tu SID de servicio
    const verificationCheck = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({
        code: code,
        to: number,
      });
    
    res.json({ success: true, status: verificationCheck.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error al comprobar el código' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

import React from 'react'
import {
    Card,
    Input,
    Textarea,
    Button,
    Typography,
  } from "@material-tailwind/react";

function ContactSection() {
    return (
        <div className='bg-white p-5 rounded-3xl animate-wave hover:animate-none'>
        <Card color="transparent" shadow={false} className='p-3'>
          <Typography variant="h4" color="blue-gray">
            Contacto
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            ¡Un placer conocerte!, introduce tus datos.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Tu nombre
              </Typography>
              <Input
                size="lg"
                placeholder="John Doe"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Tu correo
              </Typography>
              <Input
                size="lg"
                placeholder="Jhon@mail.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Información adicional
              </Typography>
              <Textarea
                size="lg"
                placeholder="Escribe algo..."
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button className="mt-6 bg-myColor" fullWidth type="submit">
              Enviar
            </Button>
          </form>
        </Card>

        </div>
      );
    }

export default ContactSection
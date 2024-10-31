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
            <Card
                color="transparent"
                shadow={false}
                className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl animate-wave hover:animate-none max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl max-sm:w-[90%] sm:h-[70%] sm:overflow-hidden sm:overflow-y-auto  mt-20 mb-10"
            >
                {/* Title */}
                <Typography variant="h4" color="blue-gray" className="text-center">
                    Contacto
                </Typography>
                <Typography color="gray" className="mt-1 font-normal text-center">
                    ¡Un placer conocerte! Por favor, introduce tus datos.
                </Typography>

                {/* Form */}
                <form className="mt-8 w-full">
                    <div className="mb-4 flex flex-col gap-4">
                        {/* Name Input */}
                        <Typography variant="h6" color="blue-gray" className="text-sm md:text-base">
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

                        {/* Email Input */}
                        <Typography variant="h6" color="blue-gray" className="text-sm md:text-base">
                            Tu correo
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="john@mail.com"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />

                        {/* Additional Information Textarea */}
                        <Typography variant="h6" color="blue-gray" className="text-sm md:text-base">
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

                    {/* Submit Button */}
                    <Button className="mt-6 bg-myColor w-full hover:bg-myColor-dark transition-all duration-300" type="submit">
                        Enviar
                    </Button>
                </form>
            </Card>
    );
}

export default ContactSection;
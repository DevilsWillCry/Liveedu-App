import React from "react";
import WaveText from "./WaveText";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import ImageHTML from "../assets/html-5-svgrepo-com.svg";
import ImageCSS from "../assets/css-3-svgrepo-com.svg"
import ImageJSS from "../assets/js-svgrepo-com.svg"
import ImageREACT from "../assets/react.svg"
import ImageREDUX from "../assets/redux-svgrepo-com.svg"
import ImagePYTHON from "../assets/python-svgrepo-com.svg"

const arrayElements = [
  {
    id: 1,
    name: "HTML",
    image: ImageHTML,
  },
  {
    id: 2,
    name: "CSS",
    image: ImageCSS,
  },
  {
    id: 3,
    name: "JavaScript",
    image: ImageJSS,
  },
  {
    id: 4,
    name: "React",
    image: ImageREACT,
  },
  {
    id: 5,
    name: "Redux",
    image: ImageREDUX,
  },
  {
    id: 6,
    name: "Python",
    image: ImagePYTHON,
  }
];

function TecnologiesSection() {
  return (
    <div className="relative h-[80%] w-[80%] mt-14 p-5 bg-white bg-opacity-90 rounded-xl animate-shadowDropCenter">
      <Card className="h-[100%] w-[20%] p-4 shadow-xl shadow-blue-gray-900/5 animate-shadowDropCenter border-2 max-sm:h-[35%] max-sm:w-full max-sm:overflow-y-auto " >
        <div className="mb-2 p-4">
          <Typography className="mb-3 text-[2vw] font-bold text-center w-full max-sm:text-[5vw] max-lg:text-[1.2vw]">
            <WaveText text={"Tecnologías"} />
          </Typography>
          <List className="grid grid-cols-3 gap-3 max-sm:gap-0 max-lg:grid-cols-1 ">
            {arrayElements.map((elemento) => (
              <ListItem key={elemento.id} className="flex flex-col items-center justify-center text-black font-bold gap-y-3 m-0 text-[1vw] max-sm:text-[3vw] ">
                <ListItemPrefix className="mr-0">
                  <img
                    className="h-[2vw] w-[2vw] max-sm:w-[6vw] max-sm:h-[6vw]"
                    src={elemento.image}
                    alt={elemento.name}
                  />
                {elemento.name}
                </ListItemPrefix>
              </ListItem>
            ))}
          </List>
        </div>
      </Card>
    </div>
  );
}

export default TecnologiesSection;

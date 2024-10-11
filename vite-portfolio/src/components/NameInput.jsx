import React, { useState, useEffect } from "react";

function NameInput() {
  const [name, setName] = useState(() => {
    return localStorage.getItem("name") || "";
  });

  useEffect(() => {
    if (name) {
      localStorage.setItem("name", name); 
    }
  }, [name]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="p-4">
      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
        Ingresa tu nombre:
      </label>
      <input
        type="text"
        id="name"
        onChange={handleChange}
        placeholder={name}
        className="shadow border rounded w-full py-2 px-3 text-gray-700"
      />
      <p className="mt-2 text-gray-600">Nombre ingresado: {name}</p>
    </div>
  );
}

export default NameInput;

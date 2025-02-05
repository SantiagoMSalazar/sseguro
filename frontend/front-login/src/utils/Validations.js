export const validateInput = (name, value) => {
    const patterns = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      telefono: /^[0-9]{10}$/,
      direccion: /^[a-zA-Z0-9\s\-#.,]{5,100}$/
    };
  
    const sanitize = (str) => {
      return str.replace(/[<>"/;'%]/g, ''); // Elimina caracteres peligrosos
    };
  
    value = sanitize(value);
  
    if (!patterns[name]) return { isValid: true, value };
    
    return {
      isValid: patterns[name].test(value),
      value,
      message: getErrorMessage(name)
    };
  };
  
  const getErrorMessage = (field) => {
    const messages = {
      email: "Correo electrónico inválido",
      telefono: "El teléfono debe tener 10 dígitos",
      direccion: "La dirección debe tener entre 5 y 100 caracteres alfanuméricos"
    };
    return messages[field];
  };
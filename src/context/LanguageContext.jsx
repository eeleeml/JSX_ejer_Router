import { createContext, useState } from "react";

export const traducciones = {
  es: {
    home: "EAcademia",
    rCourses: "Recomendar Cursos",
    admin: "Administración",
    perfil: "Mi sitio",
    login: "Iniciar sesión",
    welcome: "Bienvenido al portal de cursos",
    courseList: "Cursos",
  },
  en: {
    home: "EAcademy",
    rCourses: "Recommend Courses",
    admin: "Admin",
    perfil: "My site",
    login: "Login",
    welcome: "Welcome to the course portal",
    courseList: "Courses",
  },
};


export const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {

  const [language, setLanguage] = useState("en");
  
  const initialValue = {
    getTranslation: (key) => traducciones[language][key],
    setNewLanguage: (newLanguage) => {setLanguage(newLanguage)},
    getLanguage: () => language
  }

  return (
    <LanguageContext.Provider value={initialValue}>
      {children}
    </LanguageContext.Provider>
  );
};

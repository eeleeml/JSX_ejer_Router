import { createContext, useEffect, useState } from "react";

export const modos = {
    light: 'light',
    dark: 'dark'
}

export const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {

    const [modo, setModo] = useState(modos.light);
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || "light");

    const initialValue = {
        getModo: (key) => modos[key],
        setNewTheme: (newTheme) => { setCurrentTheme(newTheme); setModo(modos[newTheme]) },
        getTheme: () => currentTheme
    }

    useEffect(() =>{
        localStorage.setItem("theme",currentTheme)
    },[currentTheme])


    return (
        <ThemeContext.Provider value={initialValue}>
            {children}
        </ThemeContext.Provider>
    );
};

import { createContext, useState } from "react";

export const modos = {
    light: 'light',
    dark: 'dark'
}

export const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {

    const [modo, setModo] = useState(modos.light);
    const [currentTheme, setCurrentTheme] = useState("light");


    const initialValue = {
        getModo: (key) => modos[key],
        setNewTheme: (newTheme) => { setCurrentTheme(newTheme); setModo(modos[newTheme]) },
        getTheme: () => currentTheme
    }


    return (
        <ThemeContext.Provider value={initialValue}>
            {children}
        </ThemeContext.Provider>
    );
};

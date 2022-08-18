import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { darkThemeColours, lightThemeColours } from '../constants/colours';
import styles from './Header.module.css'

const Header = () => {
    const [theme, setTheme] = useState("")

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light")
    }
    const darkThemeStyling = darkThemeColours
    const lightThemeStyling = lightThemeColours

    useEffect( () => {
        const themeFromLS = localStorage.getItem('theme')
        if(!themeFromLS){
            setTheme("light")
            return
        }
        setTheme(themeFromLS)
    },[])

    useEffect( () => {
        if(theme === "") return
        localStorage.setItem('theme',theme === "light" ? "light" : "dark")
        setThemeBasedOnStyling(theme === "light" ? lightThemeStyling : darkThemeStyling)
    },[theme])

    type Styling = {
        [key:string] : string
    }

    const setThemeBasedOnStyling = (styling: Styling) => {
        const stylingKeys = Object.keys(styling)
        stylingKeys.forEach(stylingKey => document.documentElement.style.setProperty(stylingKey,styling[stylingKey]))
    }

    const navigate  = useNavigate()
    return (
        <div className={styles.header}>
            <div className={styles.headerLogo} onClick={() => {navigate('/')}}>
                Where in the world?
            </div>
            <div className={styles.themeMode} onClick={toggleTheme}>
                Set to {theme === "dark" ? "Light mode" : "Dark mode"}
            </div>
        </div>
    );
};

export default Header;
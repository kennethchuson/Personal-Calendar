import React, { useState }  from 'react'
import Calendar from './components/calendar.js';
import Settings from './components/settings.js'; 
import {ThemeProvider} from "styled-components";
import { GlobalThemes } from "./themes/global-themes"; 
import { LightTheme, DarkTheme } from "./themes/themes"; 
import DarkModeToggle from "react-dark-mode-toggle";
import Hamburger from 'hamburger-react'






const App = () => {

    const [theme, setTheme] = useState(() => false);
    const [settings, setShowSettings] = useState(false); 

    const clickSettings = () => {
        setShowSettings(true); 
    }


    return (
        <ThemeProvider theme={theme === false ? LightTheme : DarkTheme}>
            <>
            <GlobalThemes/>
                <div className="App">
                    <h1 className="App-title">Personal Calendar</h1>
                    <DarkModeToggle onChange={setTheme} checked={theme} size={65}/>
                    <Hamburger toggled={settings} toggle={setShowSettings} />
                    { settings? <Settings value_one={setTheme} value_two={theme} /> : null }
                    <Calendar/>
                </div>
            </>
        </ThemeProvider>
    )
}


export default App; 

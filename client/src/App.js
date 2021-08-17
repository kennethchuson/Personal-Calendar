import React, { useState }  from 'react'
import Calendar from './components/calendar.js';
import {ThemeProvider} from "styled-components";
import { GlobalThemes } from "./themes/global-themes"; 
import { LightTheme, DarkTheme } from "./themes/themes"; 
import DarkModeToggle from "react-dark-mode-toggle";



const App = () => {

    const [theme, setTheme] = useState(() => false);



    return (
        <ThemeProvider theme={theme === false ? LightTheme : DarkTheme}>
            <>
            <GlobalThemes/>
                <div className="App">
                    <h1 className="App-title">Personal Calendar</h1>
                    <DarkModeToggle onChange={setTheme} checked={theme} size={50}/>
                    <Calendar/>
                </div>
            </>
        </ThemeProvider>
    )
}


export default App; 

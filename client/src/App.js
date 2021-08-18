import React, { useState }  from 'react'
import Calendar from './components/calendar.js';
import {ThemeProvider} from "styled-components";
import { GlobalThemes } from "./themes/global-themes"; 
import { LightTheme, DarkTheme } from "./themes/themes"; 
import DarkModeToggle from "react-dark-mode-toggle";
import Hamburger from 'hamburger-react'






const App = () => {

    //App 
    const [theme, setTheme] = useState(() => false);
    const [settings, setShowSettings] = useState(false); 

    const clickSettings = () => {
        setShowSettings(true); 
    }


    //Settings
    const [start_time, set_start_time] = useState(0); 
    const [end_time, set_end_time] = useState(0); 
    const [get_start_time, set_get_start_time] = useState(6);
    const [get_end_time, set_get_end_time] = useState(24);  
    const [description_access, set_description_access] = useState(true); 

    

    const start_time_func = (e) => {
        set_start_time(e.target.value); 
    }

    const end_time_func = (e) => {
        set_end_time(e.target.value); 
    }

    const description_access_func = (e) => {
        set_description_access(!e.target.checked); 
    }


    const handleSubmit = (e) => {
        set_get_start_time(Number(start_time)); 
        set_get_end_time(Number(end_time)); 
        e.preventDefault(); 
    }



    return (

        <ThemeProvider theme={theme === false ? LightTheme : DarkTheme}>
            <>
            <GlobalThemes/>
                <div className="App">
                    <h1 className="App-title">Personal Calendar</h1>
                    <DarkModeToggle onChange={setTheme} checked={theme} size={65}/>
                    <Hamburger toggled={settings} toggle={setShowSettings} />
                    { settings? 
                        <div className="settings-wrapper">
                            <h3 className="settings-title">Settings</h3>
                                <div className="settings-parentContainer">
                                    <div className="settings-container">
                                        <p className="settings-text">start time</p>
                                        <input type="number" min="6" max="30" onChange={start_time_func}></input>
                                        <p className="settings-text">end time</p>
                                        <input type="number" min="6" max="30" onChange={end_time_func}></input>
                                    </div>
                                    <div className="settings-container">
                                        <p className="settings-text">Access Description</p> 
                                        <label className="switch_one">
                                            <input onClick={description_access_func} className="settings-toggle-one" type="checkbox"/>
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            <div>
                               <button className="settings-button-one" onClick={handleSubmit}>DONE</button>
                            </div>
                        </div>
                        : 
                       null 
                       }
                    <Calendar startTime={get_start_time} endTime={get_end_time} descriptionToggle={description_access}/>
                </div>
            </>
        </ThemeProvider>
    )
}


export default App; 

import React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { v4 as uuidv4 } from 'uuid';

import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
  } from '@devexpress/dx-react-scheduler-material-ui';


 export default class calendar extends React.PureComponent {


    constructor(props) {
      super(props);
  
      this.state = {
        data: [],
        currentDate: new Date().toJSON().slice(0,10).replace(/-/g,'-'),

      };

      this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    convertDate_to_Object(dataAsString) {
    
        const firsPartOfStartDate = dataAsString.split("T");
        const dateOfStartDate = firsPartOfStartDate[0].split("-");
        const hoursAndMin = firsPartOfStartDate[1].split(":");
        const [year, month,day]=dateOfStartDate;
        const [hour,min]=hoursAndMin;
        const convertedDate= new Date(year,month - 1,day,hour,min);
        return convertedDate;
    }

    convertDate_to_hour(dataAsString) {
      const firsPartOfStartDate = dataAsString.split("T");
      const dateOfStartDate = firsPartOfStartDate[0].split("-");
      const hoursAndMin = firsPartOfStartDate[1].split(":");
      const [year, month,day]=dateOfStartDate;
      const [hour,min]=hoursAndMin;
      return hour; 
    }

    convertDate_to_minute(dataAsString) {
      const firsPartOfStartDate = dataAsString.split("T");
      const dateOfStartDate = firsPartOfStartDate[0].split("-");
      const hoursAndMin = firsPartOfStartDate[1].split(":");
      const [year, month,day]=dateOfStartDate;
      const [hour,min]=hoursAndMin;
      return min; 
    }

    handleChange(event) {
  
      this.setState({
        [event.target.name]: event.target.value
      }); 
  
    }


    errorHandling(title, startDate, endDate, location) {
        if (typeof title === 'undefined' || title === "") {
          alert("please enter the title field"); 
          return false; 
        }
        if (Object.keys(startDate).length === 0 && startDate.constructor === Object) {
          alert("please enter the start date field"); 
          return false; 
        }
        if (Object.keys(endDate).length === 0 && endDate.constructor === Object) {
          alert("please enter the end date field"); 
          return false; 
        }
        if (typeof location === 'undefined' || location === "") { 
          alert("please enter the location field"); 
          return false; 
        }
        return true; 
    }


    handleSubmit(event) {

  
        const id =uuidv4();
        const {title, startDate, endDate, location } = this.state;

        console.log(title); 

        if (this.errorHandling(title, startDate, endDate, location)) {
          const finalStartDate= this.convertDate_to_Object(startDate);
          const finalEndDate= this.convertDate_to_Object(endDate);
          let scheduleData = { title: this.state.title, startDate: finalStartDate, endDate: finalEndDate, location: this.state.location,id };
  
          this.setState(prevState => ({
              data: [ ...prevState.data, scheduleData ] 
          })); 
        }
        else {
          alert("cannot able to submit your note due to your input error(s)"); 
        }




        event.preventDefault();
    }


    deleteHandle(id) {
        const updateData = this.state.data.filter((datas) => { return datas.id !== id})
      
        this.setState({
          data: updateData 
        });
        
    }

  
    render() {
      
      const { data, currentDate } = this.state;

      
  
      return (
        <div className="setUp-Schedule-wrapper">
            <h1>Set Up Schedule</h1>
            <div className="setUp_Schedule-containerOne">
                <Paper>
                <Scheduler data={data} height={660}>
                    <ViewState currentDate={currentDate} onCurrentDateChange={this.currentDateChange}/>
                    <WeekView startDayHour={6} endDayHour={24}/>
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                </Scheduler>
                </Paper>
            </div>
            <div className="setUp_Schedule_containerTwo">
              <h3>Set Up</h3>
              <div className="calendar_inputs">
                <input placeholder="Title" className="calendar_input_one" name="title" value={this.state.title} onChange={this.handleChange} type="text"/>
                <input placeholder="Start Date" className="calendar_input_two" name="startDate" value={this.state.startDate} onChange={this.handleChange} type="datetime-local"/>
                <input placeholder="End Date" className="calendar_input_three" name="endDate" value={this.state.endDate} onChange={this.handleChange} type="datetime-local"/>
                <input placeholder="Location" className="calendar_input_four" name="location" value={this.state.location} onChange={this.handleChange} type="text"/>
              </div>
              <div className="calendar_buttons">
                <button className="calendar_button_one" onClick={this.handleSubmit}>Submit</button>
              </div>
              <h3>Planning Notes</h3>
              <div className="listsMeetingNotes_container">
                {this.state.data==null?
                  <div></div> : 
                  this.state.data.map((datas) => 
                    <div className="listsMeetingNotes">
                      <li key={datas.id} className="itemMeetingNotes">{datas.title} <button className="listsMeetingsNotes_button" onClick={() => this.deleteHandle(datas.id)}>Delete</button></li>
                    </div>
                )}
              </div>
            </div>
        </div>
      );
    }
  }

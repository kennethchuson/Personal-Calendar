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
        data: [   
        ],

        currentDate: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
      };

      this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


  
    convertDate(dataAsString) {
    
        const firsPartOfStartDate = dataAsString.split("T");
        const dateOfStartDate = firsPartOfStartDate[0].split("-");
        const hoursAndMin = firsPartOfStartDate[1].split(":");
        const [year, month,day]=dateOfStartDate;
        const [hour,min]=hoursAndMin;
        const convertedDate= new Date(year,month - 1,day,hour,min);
        return convertedDate;
    }

    handleChange(event) {

      this.setState({
        [event.target.name]: event.target.value
      }); 
  
    }

    handleSubmit(event) {
        const id =uuidv4();
        const {title, startDate, endDate, location } = this.state;

        const finalStartDate= this.convertDate(startDate);
        const finalEndDate= this.convertDate(endDate);
        let scheduleData = { title: this.state.title, startDate: finalStartDate, endDate: finalEndDate, location: this.state.location,id };

        this.setState(prevState => ({
            data: [ ...prevState.data, scheduleData ] 
        })); 


        event.preventDefault();
    }


    deleteHandle(id) {
        console.log(id);
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
              <div>
                <input placeholder="Title" className="buyerInput-Settings" name="title" value={this.state.title} onChange={this.handleChange} type="text"/>
                <input placeholder="Start Date" className="buyerInput-Settings" name="startDate" value={this.state.startDate} onChange={this.handleChange} type="datetime-local"/>
                <input placeholder="End Date" className="buyerInput-Settings" name="endDate" value={this.state.endDate} onChange={this.handleChange} type="datetime-local"/>
                <input placeholder="Location" className="buyerInput-Settings" name="location" value={this.state.location} onChange={this.handleChange} type="text"/>
                <button className="sellerSettingsButtons" onClick={this.handleSubmit}>Submit</button>
              </div>
              <h3>Meeting Notes</h3>
              <div className="listsMeetingNotes_container">
                {this.state.data==null?<div></div>: this.state.data.map((datas) => <div className="listsMeetingNotes" >
                    <li key={datas.id} className="itemMeetingNotes">{datas.title} <button className="listsMeetingsNotes_button" onClick={() => this.deleteHandle(datas.id)}>Delete</button></li>
                </div>)}
              </div>
            </div>
        </div>
      );
    }
  }

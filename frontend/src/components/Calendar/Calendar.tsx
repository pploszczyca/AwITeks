import React from 'react';
import {Container, Row, Col, ListGroup} from "react-bootstrap";
import styled from "styled-components";
import {faArrowLeft, faArrowRight, faDisplay} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card"
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Grid, List } from '@material-ui/core';


let Day = styled.div`
  //background-color: red;
  height: 5em;
  text-align: center;
  //border: solid 1px black;
  width: 100%;
  font-size: 20px;
  box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);

  &.day-name:hover{
    background-color: white;
  }
  &.day-name{
    height: 2em;
    font-weight: bold;
  }
  &.clickable:hover{
    cursor: pointer;
    background-color: #0FC2C0;
  }
`

let CalendarCol = styled(Col)`
    padding: 1px;
`

let CalendarService = styled.div`
  height: 100%;
  background-color: #0FC2C0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  
  & div:first-child{
    font-size: 70px;
  }
  
  & div:nth-child(2), & div:last-child{
    font-size: 25px;
  }
  & div:nth-last-child(2){
    font-size: 25px;
  }
  
  & div:nth-child(2){
    display: flex;
    
    & p{
      width: 150px;
    }
  }
`

let Display = styled.div`
  &.show{
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #0FC000;
    width: 40%;
    height: 40%;


  }
  display: none;
`

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 10px;
  border-radius: 5px;
  margin: 0px 0px;
  cursor: pointer;
`;


function export_calendar() {
    alert('Export button clicked!');
}


class Calendar extends React.Component<{}, {days: any[], weeks: any[], months: string[], displayedDate: Date}>{
    constructor(props: any) {
        super(props);
        this.state = {
            days: Array.from(Array(7).keys()),
            weeks: Array.from(Array(6).keys()),
            months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
            displayedDate: new Date()
        }
        this.getActualDay = this.getActualDay.bind(this)
        this.nextMonth = this.nextMonth.bind(this)
        this.prevMonth = this.prevMonth.bind(this)
        this.getAlert = this.getAlert.bind(this)
        this.showAlerts = this.showAlerts.bind(this)
        this.exitDetails = this.exitDetails.bind(this)
    }

    getAlert(iconColor='red'){
        return(
            <div style={{width: '9rem', height:'1rem', border: "none"}}>
                <FontAwesomeIcon icon={faCircleExclamation} className="px-1" style={{color: iconColor}}/>
                <FontAwesomeIcon icon={faCircleExclamation} className="px-1" style={{color: iconColor}}/>
            </div>
            )
    }

    showAlerts(dayNum: number){
        // alert('Alert ' + dayNum + ' clicked!');
        // this.alerts = true
        let displayDiv = document.getElementById("display")
        if(displayDiv !== null){
            displayDiv.classList.add("show")
        }
    }

    exitDetails(){
        let displayDiv = document.getElementById("display")
        if(displayDiv !== null){
            displayDiv.classList.remove("show")
        }
    }

    // getAlertInfo(){
    //     return(
    //         <List></>
    //     )

    // }

    // showDetails(dayNum: number){

    // }

    getActualDay(fieldNumber: number, date: Date){
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
        if(firstDay === 0){
            firstDay = 7; // sunday is 7th day in calendar
        }
        let actualDayNumber = fieldNumber - firstDay + 1;
        let today = false;
        let currentDate = new Date();
        if(actualDayNumber == currentDate.getDate() && date.getMonth() == currentDate.getMonth() && date.getFullYear() == currentDate.getFullYear()){
            today = true;
        }

        console.log(date.getFullYear(), date.getMonth(), 0)
        console.log(lastDay, actualDayNumber)

        if(actualDayNumber <= 0 || actualDayNumber > lastDay){
            return (<Day/>);
        }
        else {
            // return (<Day>{actualDayNumber}</Day>
            return (<Day className="clickable" onClick = {() => this.showAlerts(actualDayNumber)} style={{backgroundColor: today ? '#008f8f' : 'none'}}>
                        {actualDayNumber}
                        <div style={{width: '9rem', height:'4rem', textAlign: 'right', fontSize: 11, border: "none"}}>
                            {this.getAlert("red")}
                            {this.getAlert("yellow")}
                            {this.getAlert("black")}
                        </div>
                    </Day>)
        }
    }

    nextMonth(){
        let day = 1;
        let month = this.state.displayedDate.getMonth() + 1;
        let year = this.state.displayedDate.getFullYear();

        if(month >= 12) {
            month = 0;
            year++;
        }

        this.setState({
            displayedDate: new Date(year, month, day)
        })
    }

    prevMonth(){
        let day = 1;
        let month = this.state.displayedDate.getMonth() - 1;
        let year = this.state.displayedDate.getFullYear();

        if(month < 0) {
            month = 11;
            year--;
        }

        this.setState({
            displayedDate: new Date(year, month, day)
        })
    }

    render(){
        return (
            <Container>
                <Row className="m-0 mt-5">
                
                    <CalendarCol xs={2}>
                        <CalendarService>
                            <div>{this.state.displayedDate.getDate()}</div>
                            <div>
                                <FontAwesomeIcon icon={faArrowLeft} className="px-1" onClick={() => this.prevMonth()}/>
                                <p>{this.state.months[this.state.displayedDate.getMonth()]}</p>
                                <FontAwesomeIcon icon={faArrowRight} className="px-1" onClick={() => this.nextMonth()}/>
                            </div>
                            <div>{this.state.displayedDate.getFullYear()}</div>
                            <div>
                                <br/>
                                <Button onClick={export_calendar}>
                                    Export
                                </Button>
                            </div>
                            
                           
                        </CalendarService>
                        
                    </CalendarCol>
                    <CalendarCol xs={10} >
                        <Row className="m-0">
                            <CalendarCol><Day className="day-name">Pon</Day></CalendarCol>
                            <CalendarCol><Day className="day-name">Wt</Day></CalendarCol>
                            <CalendarCol><Day className="day-name">Śr</Day></CalendarCol>
                            <CalendarCol><Day className="day-name">Czw</Day></CalendarCol>
                            <CalendarCol><Day className="day-name">Pt</Day></CalendarCol>
                            <CalendarCol><Day className="day-name">Sob</Day></CalendarCol>
                            <CalendarCol><Day className="day-name">Nd</Day></CalendarCol>
                        </Row>
                        {this.state.weeks.map(weekNr => (
                            <Row className="m-0">
                                {this.state.days.map(day => (
                                    <CalendarCol>
                                        <Card style={{ width: '10rem' }}>
                                            { this.getActualDay((weekNr*7) + (day + 1), this.state.displayedDate)}
                                            
                                        </Card>
                                    </CalendarCol>
                                    
                                ))}
                            </Row>
                        ))}
                    </CalendarCol>
                </Row>
                <Display id="display">
                    Display
                    <Button onClick={this.exitDetails} style={{bottom: 0, right: 0}}>
                        Exit
                    </Button>
                </Display>
                
                
            </Container>
        );
    }
}

export default Calendar;


// toggle
// z-index
// position absolute

//zrobic rebase
//wstaw diva do funkcji


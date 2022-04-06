import React from 'react';
import {Container, Row, Col, ListGroup} from "react-bootstrap";
import styled from "styled-components";
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card"


let Day = styled.div`
  //background-color: red;
  height: 5em;
  text-align: center;
  //border: solid 1px black;
  width: 100%;
  font-size: 20px;
  box-shadow: 0 0 7px -3px rgba(0, 0, 0, 1);

  &:hover{
    background-color: #0FC2C0;
  }
  &.day-name:hover{
    background-color: white;
  }
  &.day-name{
    height: 2em;
    font-weight: bold;
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
    }

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
            return (<Day style={{border: today ? '2px solid rgba(245, 40, 255, 1)' : 'none'}}>
                        {actualDayNumber}<ListGroup style={{width: '9rem', height:'3rem', textAlign: 'left', fontSize: 11 }} variant="flush">
                            <ListGroup.Item style={{backgroundColor: '#ccff99'}}>
                                {/* <FontAwesomeIcon icon="fa-solid fa-exclamation" /> */}
                                <Card.Link href="#">water plant</Card.Link>
                                </ListGroup.Item>
                            <ListGroup.Item style={{backgroundColor: '#99ccff'}}><Card.Link href="#">change soil</Card.Link></ListGroup.Item>
                        </ListGroup>
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
                
                
            </Container>
        );
    }
}

export default Calendar;

import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import styled from "styled-components";
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


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
  
  & div:last-child{
    font-size: 25px;
  }
  
`

class Calendar extends React.Component<{}, {days: any[], weeks: any[], months: string[], displayedDate: Date}>{
    constructor(props: any) {
        super(props);
        this.state = {
            days: Array.from(Array(7).keys()),
            weeks: Array.from(Array(5).keys()),
            months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
            displayedDate: new Date()
        }
        this.getActualDay = this.getActualDay.bind(this)
    }

    getActualDay(fieldNumber: number, date: Date){
        let lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
        let actualDayNumber = fieldNumber - new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 1;

        if(actualDayNumber <= 0 || actualDayNumber >= lastDay){
            return (<Day/>);
        }
        else {
            return (<Day>{actualDayNumber}</Day>);
        }
    }

    render(){
        return (
            <Container>
                <Row className="m-0 mt-5">
                    <CalendarCol xs={2}>
                        <CalendarService>
                            <div>{this.state.displayedDate.getDate()}</div>
                            <div>
                                <FontAwesomeIcon icon={faArrowLeft} className="px-1"/>
                                {this.state.months[this.state.displayedDate.getMonth()]}
                                <FontAwesomeIcon icon={faArrowRight} className="px-1"/>
                                <br/> {this.state.displayedDate.getFullYear()}
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
                                        { this.getActualDay((weekNr*7) + (day + 1), this.state.displayedDate) }
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

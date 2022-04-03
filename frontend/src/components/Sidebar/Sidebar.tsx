import React from 'react';
import {Container, Navbar, Nav} from "react-bootstrap";
import styled from "styled-components";
import {Link} from "react-router-dom";

let NavbarEdit = styled(Navbar)`
  height: 100vh;
  background-color: #023535;
  
  & > *{
    position: absolute;
    top: 10%;
  }
  
  & #menu-options{
    font-size: 20px;
    margin-top: 50px;
  }
  
  & #logo {
    position: relative;
    color: white;
    padding: 0.2em 0.5em;
    font-size: 48px;
    
    &::before, &::after, &>:first-child::before, &>:first-child::after{
      position:absolute; 
      content:' ';
      width:30px; 
      height: 30px;
      border: solid #0FC2C0;
    }
    &::before {
      top:0;
      left:0;
      border-width: 0.2em 0 0 0.2em
    }
    &::after {
      top:0;
      right:0;
      border-width: 0.2em 0.2em 0 0
    }
    &>:first-child:before {
      bottom:0;
      right:0;
      border-width: 0 0.2em 0.2em 0
    }
    &>:first-child:after {
      bottom:0;
      left:0;
      border-width: 0 0 0.2em 0.2em
    }
  }
`

class Sidebar extends React.Component<{}, { newUrl: string , oldUrl: string}>{
    constructor(props: any) {
        super(props);
        this.state = {newUrl: window.location.pathname, oldUrl: ""}
        this.setUsedLinkColor = this.setUsedLinkColor.bind(this);
        this.updateUrl = this.updateUrl.bind(this);
    }

    componentDidMount() {
        this.setUsedLinkColor();
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
        this.setUsedLinkColor();
    }

    updateUrl(newUrl: string){
        this.setState(() => ({
            oldUrl: this.state.newUrl,
            newUrl: newUrl
        }));
    }
    
    setUsedLinkColor(){
        let childNumbersMap = new Map<string, number>([
            ["/", 0],
            ["/my_plants", 1],
            ["/calendar", 2],
            ["/forum", 3],
            ["/settings", 4]
        ]);

        let newId: number | undefined = childNumbersMap.get(this.state.newUrl);
        let oldId: number | undefined = childNumbersMap.get(this.state.oldUrl);

        if(newId != undefined){
            let newLink = document.getElementsByClassName("nav-item").item(newId) as HTMLElement;
            if(newLink != null)
                newLink.style.color = "#0FC2C0";
        }

        if(oldId != undefined){
            let oldLink = document.getElementsByClassName("nav-item").item(oldId) as HTMLElement;
            if(oldLink != null)
                oldLink.style.color = "rgba(255,255,255,.55)";
        }
    }

    render(){
        return (
            <NavbarEdit variant="dark">
                <Container className="d-flex flex-column">
                    <div id="logo"><p>awITex</p></div>
                    <Nav className="me-auto d-flex flex-column" id="menu-options">
                        <Nav.Link as={Link} to="/" className="nav-item" onClick={() => this.updateUrl("/")}>Strona Główna</Nav.Link>
                        <Nav.Link as={Link} to="/my_plants" className="nav-item" onClick={() => this.updateUrl("/my_plants")}>Moje rośliny</Nav.Link>
                        <Nav.Link as={Link} to="/calendar" className="nav-item" onClick={() => this.updateUrl("/calendar")}>Kalendarz</Nav.Link>
                        <Nav.Link as={Link} to="/forum" className="nav-item" onClick={() => this.updateUrl("/forum")}>Forum</Nav.Link>
                        <Nav.Link as={Link} to="/settings" className="nav-item" onClick={() => this.updateUrl("/settings")}>Ustawienia</Nav.Link>
                    </Nav>
                </Container>
            </NavbarEdit>
        );
    }

}

export default Sidebar;

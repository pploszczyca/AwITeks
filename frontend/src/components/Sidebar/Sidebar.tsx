import React from 'react';
import {Container, Navbar, Nav} from "react-bootstrap";
import styled from "styled-components";
import {Link} from "react-router-dom";

let NavbarEdit = styled(Navbar)`
  height: 100vh;
  width: 15vw;
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
    border: 0.2em solid #0FC2C0;
    padding: 0.4em 0.5em;
    position: relative;
    color: white;
    font-size: 48px;

    &::before, &::after {
      content: '';
      display: block;
      position: absolute;
      background: #023535;
    }

    &::before {
      top: -0.3em;
      bottom: -0.3em;
      left: 0.5em;
      right: 0.5em;
    }

    &::after{
      left: -0.3em;
      right: -0.3em;
      top: 0.5em;
      bottom: 0.5em;
    }
    
    #logo-text {
      position: relative;
      z-index: 1;
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
                    <h1 id="logo">
                        <span id="logo-text">awITex</span>
                    </h1>
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

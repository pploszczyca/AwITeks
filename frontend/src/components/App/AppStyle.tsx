import styled from "styled-components";
import {Container} from "react-bootstrap";

export const ContentContainer = styled(Container)`
  position: absolute;
  left: var(--sidebar-width);
  width: var(--content-width)!important;
  max-width: calc(var(--content-width) - 2*var(--content-margin-x))!important;;
  margin: var(--content-margin-y) var(--content-margin-x);
  padding: 0;
  
  @media(max-width: 767px){
    left: 50%!important;
    transform: translateX(-50%)!important;
    width: 90vw!important;
    max-width: 90vw!important;
    margin: 0;
  }
`

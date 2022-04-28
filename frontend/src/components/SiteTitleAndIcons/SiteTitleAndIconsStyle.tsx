import styled from "styled-components";

export const PageTitle = styled.h1`
  color: #0FC2C0;
`;

export const FixedContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 15px;

  position: relative;
  left: var(--sidebar-width);

  width: var(--content-width);
  margin: var(--content-margin-y) var(--content-margin-x);
  
  & .icons{
    position: absolute;
    left: 100%;
    transform: translateX(-100%);
    padding-right: var(--content-margin-x);
  }

  @media(max-width: 767px){
    left: 50%;
    transform: translateX(-50%);
    width: 90vw!important;
    max-width: 90vw!important;
    margin: 0;
  }
`

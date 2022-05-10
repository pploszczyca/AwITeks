import styled from "styled-components";
import {Row} from "react-bootstrap";

export const ThreadInfo = styled(Row)`
  background-color: #023535;
  color: white;
  border-radius: 10px;
  padding: 10px;
  
  & p{
    text-align: center;
    margin: 0;
  }
  
  & p:first-child{
    font-size: larger;
    font-weight: bold;
  }
`;

export const ChatWindow = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 1px black solid;
  padding: 0 20px 20px 20px;
  max-height: 70vh;
`;

export const PostDetails = styled.p`
  margin: 0;
`;

export const PostContent = styled.div`
  background-color: #008F8C;
  color: white;
  padding: 10px 10px 10px 30px;
  border-radius: 0 30px 30px 30px;
`;

export const SenderArea = styled.textarea`
  width: 100%;
  //height: 45px;
  height: 100%;
  border-radius: 30px;
  padding: 10px 20px;
  resize: none;
  overflow-y: hidden;
`;

export const SendButton = styled.button`
  background-color: #023535;
  color: white;
  border-radius: 50px;
  border: none;
  padding: 10px;
  height: 45px;
  width: 100%;
  position: relative;
  top: 100%;
  transform: translateY(-100%);
  
  &:hover{
    background-color: #008F8C;
  }
`;

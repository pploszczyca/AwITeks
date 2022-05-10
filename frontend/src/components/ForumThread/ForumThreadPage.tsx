import React, {useEffect, useState} from "react";
import {ContentContainer} from "../App/AppStyle";
import {ChatWindow, PostContent, PostDetails, SendButton, SenderArea, ThreadInfo} from "./ForumThreadStyle";
import {useNavigate, useParams} from "react-router-dom";
import {PageRoutes} from "../../utils/constants";
import {Threads} from "./threadExample";
import {ForumThread} from "../../api";
import Loader from "../Loader/Loader";
import {Col, Row} from "react-bootstrap";


function getThread(id: number){
    return Threads[id];
}


function fitAreaToContent(){
    const maxHeight = 300; // px
    let text = document.getElementById('text-field')!;
    let row = document.getElementById('send-elements')!;

    text.style.height = "0";
    text.style.height = Math.min(text.scrollHeight, maxHeight) + "px";
    row.style.height = text.style.height;

    if(parseInt(text.style.height) >= maxHeight){
        text.style.overflowY = "scroll";
    } else{
        text.style.overflowY = "hidden";
    }
}

const ForumThreadPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const { threadId } = useParams();
    const [thread, setThread] = useState<ForumThread>();

    useEffect(() => {
        if (threadId == null) {
            navigate(PageRoutes.FORUM)
        } else{
            setThread(getThread(+threadId))
        }
    }, [])

    return(
     <ContentContainer>
         {thread === undefined ? (
             <Loader/>
         ) : (
             <>
                 <ThreadInfo className="mt-3">
                     <p>{thread.title}</p>
                     <p>Autor: {thread.creator.username}</p>
                     <p>Data założenia tematu: {thread.forumPosts[0].date}</p>
                 </ThreadInfo>

                 <ChatWindow className="mt-2">
                     {thread.forumPosts.map(post => (
                         <div key={post.id} className="mt-3">
                             <PostDetails>{post.author.username}, {post.date}</PostDetails>
                             <PostContent>{post.content}</PostContent>
                         </div>
                     ))}
                 </ChatWindow>

                 <Row id='send-elements' style={{height: 45}}>
                     <Col lg={10} className="h-100 mt-2">
                        <SenderArea id='text-field' onInput={() => fitAreaToContent()}/>
                     </Col>
                     <Col lg={2} className="mt-2">
                        <SendButton>Wyślij</SendButton>
                     </Col>
             </Row>
             </>
         )}
     </ContentContainer>
    )
}

export default ForumThreadPage;

import React, {useEffect, useRef} from "react";
import {ContentContainer} from "../App/AppStyle";
import {ChatWindow, PostContent, PostDetails, SendButton, SenderArea, ThreadInfo} from "./ForumThreadStyle";
import {useLocation, useNavigate} from "react-router-dom";
import {PageRoutes, ThreadDetails} from "../../utils/constants";
import Loader from "../Loader/Loader";
import {Col, Row} from "react-bootstrap";
import {posts} from "./threadExample";
import {ForumPost} from "../../api";


function fitAreaToContent(text: HTMLTextAreaElement, row: HTMLDivElement){
    const maxHeight = 300; // px

    text.style.height = "0";
    text.style.height = Math.min(text.scrollHeight, maxHeight) + "px";
    row.style.height = text.style.height;

    if(parseInt(text.style.height) >= maxHeight){
        text.style.overflowY = "scroll";
    } else{
        text.style.overflowY = "hidden";
    }
}

function getPosts(){
    // return posts.map(post =>
    //     new Map()
    //         .set("author", "Janusz")
    //         .set("date", post.date)
    //         .set("id", post.id)
    //         .set("content", post.content)
    // )
    []
}

const ForumThreadPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const location = useLocation(); // bo nie chcę żeby mój nickname, data, tytuł i id były przekazywane w paramsach urla
    const threadInfo = location.state as ThreadDetails;
    const textFieldRef: React.RefObject<HTMLTextAreaElement> = useRef(null);
    const sendRow: React.RefObject<HTMLDivElement> = useRef(null);
    const posts: ForumPost[] = getPosts(); // todo

    useEffect(() => {
        if (!threadInfo) {
            navigate(PageRoutes.FORUM)
        }
    }, [navigate, threadInfo])

    return(
     <ContentContainer>
         {!posts ? (
             <Loader/>
         ) : (
             <>
                 <ThreadInfo className="mt-3">
                     <p>{threadInfo.title}</p>
                     <p>Autor: {threadInfo.creator}</p>
                     <p>Data założenia tematu: {threadInfo.creationDate}</p>
                 </ThreadInfo>

                 <ChatWindow className="mt-2">
                     {posts.map(post => (
                         <div key={post.id} className="mt-3">
                             <PostDetails>{post.author.username}, {post.date || new Date().toDateString()}</PostDetails>
                             <PostContent>{post.content}</PostContent>
                         </div>
                     ))}
                 </ChatWindow>

                 <Row ref={sendRow} style={{height: 45}}>
                     <Col lg={10} className="h-100 mt-2">
                        <SenderArea ref={textFieldRef}
                                    onInput={() => fitAreaToContent(textFieldRef.current!, sendRow.current!)}/>
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

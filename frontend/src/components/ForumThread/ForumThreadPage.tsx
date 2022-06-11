import React, {useEffect, useRef} from "react";
import {ContentContainer} from "../App/AppStyle";
import {ChatWindow, PostContent, PostDetails, SendButton, SenderArea, ThreadInfo} from "./ForumThreadStyle";
import {useLocation, useNavigate} from "react-router-dom";
import {errorMsg, PageRoutes, ThreadDetails} from "../../utils/constants";
import Loader from "../Loader/Loader";
import {Col, Row} from "react-bootstrap";
import {useMutation, useQuery} from "react-query";
import {getApis} from "../../api/initializeApis";
import moment from "moment";
import 'moment/locale/pl';
import {AddPostRequestBody, ForumPost} from "../../api";
import {queryClient} from "../../Store/store";


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

const ForumThreadPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const location = useLocation(); // bo nie chcę żeby mój nickname, data, tytuł i id były przekazywane w paramsach urla
    const threadInfo = location.state as ThreadDetails;
    const textFieldRef: React.RefObject<HTMLTextAreaElement> = useRef(null);
    const sendRow: React.RefObject<HTMLDivElement> = useRef(null);

    const {data: posts, isLoading: postsLoading, isError: postsError} = useQuery(
        ['forum', threadInfo.id, 'posts'],
        () => getApis().forumApi.getPostsUserIncludedFromThread(threadInfo.id).then(resp => resp.data),
        {onError: (error) => errorMsg()}
    );

    const addPostMutation = useMutation((post: AddPostRequestBody) => getApis().forumApi.addPostToThread(threadInfo.id, post), {
        onSuccess: (post) => {
            queryClient.setQueryData(['forum', threadInfo.id, post.data?.id], post.data);
            queryClient.setQueryData(['forum', threadInfo.id, "posts"], (oldPosts: ForumPost[] | undefined) =>
                oldPosts ? [...oldPosts, post.data] : [post.data]);
            queryClient.invalidateQueries(['forum', threadInfo.id, "posts"]);
        },
        onError: (error) => {
            errorMsg()
        }
    });

    const addPost = async () => {
        if (textFieldRef.current && textFieldRef.current.textLength > 0) {
            const msg = textFieldRef.current.value;
            await addPostMutation.mutateAsync({content: msg});
            textFieldRef.current.value = "";
        }
    }

    useEffect(() => {
        if (!threadInfo) {
            navigate(PageRoutes.FORUM)
        }
    }, [navigate, threadInfo])

    if(postsLoading || postsError) return <Loader/>;

    return(
     <ContentContainer>
         <ThreadInfo className="mt-3">
             <p>{threadInfo.title}</p>
             <p>Autor: {threadInfo.creator}</p>
             <p>Data założenia tematu: {moment(threadInfo.creationDate).calendar()}</p>
         </ThreadInfo>

         <ChatWindow className="mt-2">
             {posts?.map(post => (
                 <div key={post.id} className="mt-3">
                     <PostDetails>{post.userName}, {moment(post.creationDate).add(2, 'hours').calendar()}</PostDetails>
                     <PostContent>{post.content}</PostContent>
                 </div>
             ))}
         </ChatWindow>

         <Row ref={sendRow} style={{height: 45}}>
             <Col lg={10} className="h-100 mt-2">
                 <SenderArea ref={textFieldRef}
                             maxLength={255}
                             onInput={() => fitAreaToContent(textFieldRef.current!, sendRow.current!)}/>
             </Col>
             <Col lg={2} className="mt-2">
                 <SendButton onClick={() => addPost()}>Wyślij</SendButton>
             </Col>
         </Row>
     </ContentContainer>
    )
}

export default ForumThreadPage;

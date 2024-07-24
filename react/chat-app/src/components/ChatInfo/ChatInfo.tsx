import {Stack} from "@mui/material";
import {ChatHeader} from "./ChatHeader.tsx";
import {ChatMessages} from "./ChatMessages.tsx";
import {ChatFooter} from "./ChatFooter.tsx";
import {useContext, useEffect, useState} from "react";
import {getConversationById} from "../../services/chat.ts";
import {useLocation} from "react-router-dom";
import {LoggedInUserContext} from "../UserContext.tsx";

const ChatInfo = () => {
    const location = useLocation();
    const conversationId = location.pathname.slice(6);
    const [conversation, setConversation] = useState(null);
    const [otherUser, setOtherUser] = useState({});
    const [loggedInUser] = useContext(LoggedInUserContext);
    useEffect(() => {
        const response = getConversationById(conversationId);
        Promise.all([response]).then((result) => {
            setConversation(result[0].response.data)
            if (result[0].response.data.participants[0].id == loggedInUser.id) {
                setOtherUser(result[0].response.data.participants[1])
            } else {
                setOtherUser(result[0].response.data.participants[0])
            }
        })
    }, [conversationId])
    return <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>
        <ChatHeader conversationType={conversation?.active} userName={otherUser.full_name}/>
        <ChatMessages/>
        <ChatFooter conversationId={conversation?.id}/>
    </Stack>
}
export default ChatInfo
import {Stack} from "@mui/material";
import {ChatHeader} from "./ChatHeader.tsx";
import {ChatMessages} from "./ChatMessages.tsx";
import {ChatFooter} from "./ChatFooter.tsx";
import {useEffect, useState} from "react";
import {getConversationById} from "../../services/chat.ts";
import {useLocation} from "react-router-dom";

const ChatInfo = () => {
    const location = useLocation();
    const conversationId = location.pathname.slice(6);
    const [conversation, setConversation] = useState(null);
    useEffect(() => {
        const response = getConversationById(conversationId);
        Promise.all([response]).then((result) => {
            setConversation(result[0].response.data)
        })
    }, [conversationId])
    return <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>
        <ChatHeader conversationType={conversation?.active} userName={conversation?.users[0].full_name}/>
        <ChatMessages/>
        <ChatFooter/>
    </Stack>
}
export default ChatInfo
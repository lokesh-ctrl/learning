import { Box } from "@mui/material";
import ChatItem, {ChatItemProps} from "../ChatItem/ChatItem.tsx";
import './ChatList.css'
import {useState} from "react";
import {useLocation} from "react-router-dom";

type ChatListProps = {
    chatListType: string
    chats: ChatItemProps[]
}

const ChatList = ({chatListType, chats}: ChatListProps) => {
    const location = useLocation();
    const [selectedConvId, setSelectedConvID] = useState(location.pathname.slice(6));
    return (
        <div className={"chat-list"}>
            <Box sx={{padding: "5px 0", color: "grey"}}>{chatListType}</Box>
            {
                chats.map((chat) => {
                    return <ChatItem key={chat.name} name={chat.name}
                                     lastMessage={chat.lastMessage.slice(0, 20)}
                                     lastMessageTime={chat.lastMessageTime}
                                     newMessagesCount={chat.newMessagesCount}
                                     conversationId={chat.conversationId}
                                     isSelected={selectedConvId == chat.conversationId.toString()}
                                     onClickHandler={() => {
                                         setSelectedConvID(chat.conversationId.toString())
                                     }}
                    />
                })
            }
        </div>
    )
}

export default ChatList
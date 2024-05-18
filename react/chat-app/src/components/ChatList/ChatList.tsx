import { Box } from "@mui/material";
import ChatItem, {ChatItemProps} from "../ChatItem/ChatItem.tsx";
import './ChatList.css'

type ChatListProps = {
    chatListType: string
    chats: ChatItemProps[]
}

const ChatList = ({chatListType, chats}: ChatListProps) => {
    return (
        <div className={"chat-list"}>
            <Box sx={{padding: "5px 0", color: "grey"}}>{chatListType}</Box>
            {
                chats.map((chat) => {
                    return <ChatItem key={chat.name} name={chat.name} lastMessage={chat.lastMessage.slice(0, 20)}
                                     lastMessageTime={chat.lastMessageTime}
                                     newMessagesCount={chat.newMessagesCount}/>
                })
            }
        </div>
    )
}

export default ChatList
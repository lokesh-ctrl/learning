import ChatItem from "../ChatItem/ChatItem.tsx";
import './ChatList.css'

const ChatList = () => {
    return (
        <div className={"chat-list"}>
            <ChatItem name={"Tessie"} lastMessage={"Call me".slice(0, 20)} lastMessageTime={"9:36"}
                      newMessagesCount={10}/>
            <ChatItem name={"Tessie"} lastMessage={"Call me".slice(0, 20)} lastMessageTime={"9:36"}
                      newMessagesCount={10}/>
            <ChatItem name={"Tessie"} lastMessage={"Call me".slice(0, 20)} lastMessageTime={"9:36"}
                      newMessagesCount={10}/>
            <ChatItem name={"Tessie"} lastMessage={"Call me".slice(0, 20)} lastMessageTime={"9:36"}
                      newMessagesCount={10}/>
        </div>
    )
}

export default ChatList
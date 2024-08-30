import {Box, Divider, IconButton, Stack, TextField, useTheme} from "@mui/material";
import {CircleDashed, MagnifyingGlass} from "phosphor-react";
import './Sidebar.css';
import ChatList from "../../ChatList/ChatList.tsx";
import {useContext, useEffect, useState} from "react";
import {getConversations} from "../../../services/chat.ts";
import {LoggedInUserContext} from "../../UserContext.tsx";

const Sidebar = () => {
    const theme = useTheme();
    const [pinnedConversations, setPinnedConversations] = useState([]);
    const [allConversations, setAllConversations] = useState([]);
    const [userContext, setUserContext] = useContext(LoggedInUserContext);
    useEffect(() => {
        const response = getConversations();
        Promise.all([response]).then((result) => {
            const loggedInUser = result[0].response.data.user;
            setUserContext(loggedInUser);
            const loggedInUserId = result[0].response.data.user.id;
            const pinnedConvs = [];
            const allConvs = [];
            console.log(result[0].response.data)

            result[0].response.data.conversations.forEach((conv) => {
                let otherUserName = "";
                if (conv.participants[0].id == loggedInUserId) {
                    otherUserName = conv.participants[1].full_name
                } else {
                    otherUserName = conv.participants[0].full_name
                }
                let lastMessage = '';
                let lastMessageTime = '';
                if (conv.lastMessage) {
                    lastMessage = conv.lastMessage.content;
                    lastMessageTime = Intl.DateTimeFormat('en', {
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZone: 'ist'
                    }).format(new Date(conv.lastMessage.createdAt))
                }

                if (conv.active == 'pinned') {
                    pinnedConvs.push({
                        conversationId: conv.id,
                        lastMessage: lastMessage,
                        lastMessageTime: lastMessageTime,
                        name: otherUserName
                    })
                } else {
                    allConvs.push({
                        conversationId: conv.id,
                        lastMessage: lastMessage,
                        lastMessageTime: lastMessageTime,
                        name: otherUserName
                    })
                }
            })
            setPinnedConversations(pinnedConvs);
            setAllConversations(allConvs);
        })
    }, [])
    return (
        <Box sx={{backgroundColor: theme.palette.primary["50"], height: "100vh", width: "25vw", padding: "20px"}}>
            <Stack flexDirection={"row"} justifyContent={"space-between"} width={"100%"}>
                <h3>Chats</h3>
                <IconButton>
                    <CircleDashed size={20}/>
                </IconButton>
            </Stack>
            <TextField sx={{padding: 0}} InputProps={{
                startAdornment: <MagnifyingGlass/>
            }} className={"search-input"} placeholder={"Search..."}/>
            <Divider sx={{marginTop: "10px"}}/>
            <ChatList chatListType={"Pinned"} chats={pinnedConversations}/>
            <ChatList chatListType={"All chats"} chats={allConversations}/>
        </Box>)
}

export default Sidebar
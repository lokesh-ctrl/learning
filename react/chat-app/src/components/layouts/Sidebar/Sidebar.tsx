import {Box, Divider, IconButton, Stack, TextField, useTheme} from "@mui/material";
import {CircleDashed, MagnifyingGlass} from "phosphor-react";
import './Sidebar.css';
import ChatList from "../../ChatList/ChatList.tsx";
import {useEffect, useState} from "react";
import {getConversations} from "../../../services/chat.ts";

const Sidebar = () => {
    const theme = useTheme();
    const [pinnedConversations, setPinnedConversations] = useState([]);
    const [allConversations, setAllConversations] = useState([]);
    useEffect(() => {
        const response = getConversations();
        Promise.all([response]).then((result) => {
            const loggedInUserId = result[0].response.data.user.id;
            const pinnedConvs = [];
            const allConvs = [];

            result[0].response.data.conversations.forEach((conv) => {
                let otherUserName = "";
                if (conv.users[0].id == loggedInUserId) {
                    otherUserName = conv.users[1].full_name
                } else {
                    otherUserName = conv.users[0].full_name
                }
                const lastMessage = conv.lastMessage[0].content;
                const lastMessageTime = Intl.DateTimeFormat('en', {
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'ist'
                }).format(new Date(conv.lastMessage[0].createdAt))

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
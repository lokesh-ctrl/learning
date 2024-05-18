import {Box, IconButton, Stack, TextField, useTheme} from "@mui/material";
import {CircleDashed, MagnifyingGlass} from "phosphor-react";
import './Sidebar.css';
import ChatList from "../../ChatList/ChatList.tsx";
import {ChatItemProps} from "../../ChatItem/ChatItem.tsx";

const pinnedChats: ChatItemProps[] = [{
    name: "User 1",
    lastMessage: "Hello",
    lastMessageTime: "7:40"
}]

const allChats: ChatItemProps[] = [
    {
        name: "User 1",
        lastMessage: "Hello",
        lastMessageTime: "7:40"
    },
    {
        name: "User 2",
        lastMessage: "How are you doing",
        lastMessageTime: "10:40"
    }
]


const Sidebar = () => {
    const theme = useTheme();
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
            <ChatList chatListType={"Pinned"} chats={pinnedChats}/>
            <ChatList chatListType={"All chats"} chats={allChats}/>
        </Box>)
}

export default Sidebar
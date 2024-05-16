import {Box, IconButton, Stack, TextField, useTheme} from "@mui/material";
import {CircleDashed, MagnifyingGlass} from "phosphor-react";
import './Sidebar.css';
import ChatItem from "../../ChatItem/ChatItem.tsx";
import ChatList from "../../ChatList/ChatList.tsx";

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
            <ChatList/>
        </Box>)
}

export default Sidebar
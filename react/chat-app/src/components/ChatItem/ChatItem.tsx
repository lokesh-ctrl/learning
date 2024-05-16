import {Avatar, Box, Stack, useTheme} from "@mui/material";
import './ChatItem.css';

type ChatItemProps = {
    name: string;
    lastMessage: string;
    lastMessageTime: string;
    newMessagesCount?: number;
}
const ChatItem = ({name, lastMessage, lastMessageTime, newMessagesCount}: ChatItemProps) => {
    const theme = useTheme();
    return (
        <Box sx={{
            backgroundColor: "white",
            height: "5vh",
            padding: "20px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "row"
        }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
            <Stack justifyContent={"space-between"} flexDirection={"row"} width={"100%"}>
                <Stack flexDirection={"column"} sx={{paddingLeft: "5px"}}>
                    <div><b>{name}</b></div>
                    <div>{lastMessage}</div>
                </Stack>
                <Stack>
                    <div>{lastMessageTime}</div>
                    {newMessagesCount &&
                        <Box sx={{
                            backgroundColor: theme.palette.secondary.dark,
                            borderRadius: '50%',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            height: '24px',
                            width: '24px'
                        }}>{newMessagesCount}</Box>}
                </Stack>
            </Stack>
        </Box>
    )
}
export default ChatItem
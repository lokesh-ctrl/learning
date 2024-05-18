import {Avatar, Box, useTheme, Stack, TextField, IconButton} from "@mui/material";
import {PaperPlaneRight} from "phosphor-react";

const ChatInfo = () => {
    const theme = useTheme();
    return <div>
        <Box sx={{
            height: "8vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexGrow: "3",
            padding: "10px"
        }}>
            <Stack flexDirection={"row"}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                <Stack flexDirection={"column"} sx={{marginLeft: "20px"}}>
                    <div style={{fontWeight: "600"}}>User 1</div>
                    <div style={{fontSize: "0.8rem"}}>Online</div>
                </Stack>
            </Stack>
        </Box>
        <Box sx={{height: "80vh", backgroundColor: theme.palette.grey["200"]}}>
            Message display here
        </Box>
        <Box sx={{display: "flex", flexDirection: "row"}}>
            <TextField placeholder={"Send message here"}/>
            <Box
                sx={{backgroundColor: theme.palette.primary.dark, height: "50px", width: "50px", borderRadius: "10px"}}>
                <IconButton>
                    <PaperPlaneRight size={32} color={"white"}/>
                </IconButton>
            </Box>
        </Box>
    </div>
}
export default ChatInfo
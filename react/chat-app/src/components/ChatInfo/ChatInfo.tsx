import {Avatar, Box, useTheme, Stack, TextField, IconButton} from "@mui/material";
import {PaperPlaneRight} from "phosphor-react";
import {styled} from "@mui/material/styles";

const StyledInput = styled(TextField)(() => ({
    "& .MuiInputBase-input": {
        paddingTop: '12px',
        paddingBottom: '12px',
        backgroundColor: 'white'
    }
}));

const ChatInfo = () => {
    const theme = useTheme();
    return <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>
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
        <Box sx={{flexGrow: 1, height: '100%', overflowY: 'scroll', backgroundColor: theme.palette.grey["200"]}}>
            Message display here
        </Box>
        <Box sx={{display: "flex", flexDirection: "row"}}>
            <StyledInput fullWidth placeholder='Write a message...' variant='filled'/>
            <Box
                sx={{backgroundColor: theme.palette.primary.dark, height: "50px", width: "50px", borderRadius: "10px"}}>
                <IconButton>
                    <PaperPlaneRight size={32} color={"white"}/>
                </IconButton>
            </Box>
        </Box>
    </Stack>
}
export default ChatInfo
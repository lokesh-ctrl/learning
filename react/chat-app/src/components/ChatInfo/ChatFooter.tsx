import {Box, IconButton, TextField, useTheme} from "@mui/material";
import {PaperPlaneRight} from "phosphor-react";
import {styled} from "@mui/material/styles";
import {sendMessageIntoConversation} from "../../services/chat.ts";
import {useState} from "react";

const StyledInput = styled(TextField)(() => ({
    "& .MuiInputBase-input": {
        paddingTop: '12px',
        paddingBottom: '12px',
        backgroundColor: 'white'
    }
}));
export const ChatFooter = ({conversationId}) => {
    const theme = useTheme();
    const [message, setMessage] = useState("")
    const sendMessage = async (message) => {
        const response = await sendMessageIntoConversation(conversationId, message)
        setMessage("");
    }

    return <Box sx={{display: "flex", flexDirection: "row"}}>
        <StyledInput fullWidth placeholder='Write a message...' variant='filled' value={message}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                         setMessage(event.target.value);
                     }}/>
        <Box
            sx={{backgroundColor: theme.palette.primary.dark, height: "50px", width: "50px", borderRadius: "10px"}}>
            <IconButton onClick={() => {
                sendMessage(message)
            }}>
                <PaperPlaneRight size={32} color={"white"}/>
            </IconButton>
        </Box>
    </Box>
}
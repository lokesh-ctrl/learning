import {Box, IconButton, TextField, useTheme} from "@mui/material";
import {PaperPlaneRight} from "phosphor-react";
import {styled} from "@mui/material/styles";

const StyledInput = styled(TextField)(() => ({
    "& .MuiInputBase-input": {
        paddingTop: '12px',
        paddingBottom: '12px',
        backgroundColor: 'white'
    }
}));
export const ChatFooter = () => {
    const theme = useTheme();
    return <Box sx={{display: "flex", flexDirection: "row"}}>
        <StyledInput fullWidth placeholder='Write a message...' variant='filled'/>
        <Box
            sx={{backgroundColor: theme.palette.primary.dark, height: "50px", width: "50px", borderRadius: "10px"}}>
            <IconButton>
                <PaperPlaneRight size={32} color={"white"}/>
            </IconButton>
        </Box>
    </Box>
}
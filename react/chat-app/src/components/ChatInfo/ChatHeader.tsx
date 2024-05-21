import {Avatar, Box, Stack} from "@mui/material";

export const ChatHeader = () => {
    return (
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
    )
}
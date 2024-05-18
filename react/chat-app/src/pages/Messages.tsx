import Sidebar from "../components/layouts/Sidebar/Sidebar.tsx";
import ChatInfo from "../components/ChatInfo/ChatInfo.tsx";
import {Stack} from "@mui/material";

const Messages = () => {
    return (
        <Stack flexDirection={"row"}>
            <Sidebar/>
            <div style={{flexGrow: 3}}>
                <ChatInfo/>
            </div>
        </Stack>
    )
}
export default Messages
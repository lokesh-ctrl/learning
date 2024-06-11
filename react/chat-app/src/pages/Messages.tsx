import Sidebar from "../components/layouts/Sidebar/Sidebar.tsx";
import ChatInfo from "../components/ChatInfo/ChatInfo.tsx";
import {Stack} from "@mui/material";
import {useLocation} from "react-router-dom";

const Messages = () => {
    const location = useLocation();
    const conversationId = location.pathname.slice(6);
    return (
        <Stack flexDirection={"row"}>
            <Sidebar/>
            <div style={{flexGrow: 3}}>
                {conversationId && <ChatInfo/>}
            </div>
        </Stack>
    )
}
export default Messages
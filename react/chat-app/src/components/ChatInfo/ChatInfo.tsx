import {Stack} from "@mui/material";
import {ChatHeader} from "./ChatHeader.tsx";
import {ChatMessages} from "./ChatMessages.tsx";
import {ChatFooter} from "./ChatFooter.tsx";

const ChatInfo = () => {
    return <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>
        <ChatHeader/>
        <ChatMessages/>
        <ChatFooter/>
    </Stack>
}
export default ChatInfo
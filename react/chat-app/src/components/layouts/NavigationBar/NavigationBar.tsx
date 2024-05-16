import {Avatar, Box, Divider, Icon, Stack, useTheme} from '@mui/material';
import {Chats, Phone, Users, Gear, ChatCircleText} from "phosphor-react";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import {LinkIcon} from "../../LinkIcon.tsx";

import './NavigationBar.css'

const NavigationBar = () => {
    const theme = useTheme();
    const location = useLocation();

    const [selectedItem, setSelectedItem] = useState(location.pathname.slice(1))


    const menuIcons = [
        {
            icon: () => <Chats size={32}/>, name: "chat"
        },
        {icon: () => <Users size={32}/>, name: "contacts"},
        {icon: () => <Phone size={32}/>, name: "calls"}
    ]

    return (
        <Box sx={{backgroundColor: theme.palette.grey[50], height: "100vh", width: "5vw", padding: "20px"}}>
            <Stack direction={"column"} alignItems={"center"} spacing={4}>
                <Stack alignItems={"center"} spacing={4}>
                    <Box sx={{
                        backgroundColor: theme.palette.primary.dark,
                        height: "75px",
                        width: "75px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <ChatCircleText size={32} color={"white"}/>
                    </Box>
                </Stack>
                {menuIcons.map((menuIcon) => {
                    return (<LinkIcon key={menuIcon.name} theme={theme} IconComponent={menuIcon.icon}
                                      isSelected={selectedItem == menuIcon.name} link={menuIcon.name}
                                      handleClick={() => {
                                          setSelectedItem(menuIcon.name)
                                      }}/>)
                })}
            </Stack>
            <Divider orientation="horizontal"/>
            <div className={"flex-col"}>
                <Stack alignItems={"center"} marginTop={"5vh"}>
                    <LinkIcon theme={theme} IconComponent={() => <Gear size={32}/>}
                              isSelected={selectedItem == "settings"}
                              link={"settings"} handleClick={() => {
                        setSelectedItem("settings")
                    }}/>
                </Stack>
                <Stack alignItems={"center"}>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>
                </Stack>
            </div>
        </Box>
    )
}

export default NavigationBar
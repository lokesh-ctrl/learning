import {Container, Stack} from "@mui/material";
import {Outlet} from "react-router-dom";
import SideBar from "../components/layouts/NavigationBar/Sidebar.tsx";

export const HomeLayout = () => {
  return <Container sx={{mt: 5}} maxWidth="sm">
    <Stack direction='row'>
      <SideBar/>
      <Outlet/>
    </Stack>
  </Container>;
};

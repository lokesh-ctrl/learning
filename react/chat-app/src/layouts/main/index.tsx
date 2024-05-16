import { Container, Stack } from "@mui/material";
import {Outlet} from "react-router-dom";
import NavigationBar from "../../components/layouts/NavigationBar/NavigationBar.tsx";


const MainLayout = () => {
  return (
      <Stack direction='row'>
          <NavigationBar/>
          <Outlet/>
      </Stack>
  );
};

export default MainLayout;

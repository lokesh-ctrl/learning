import {Stack} from "@mui/material";
import {Outlet} from "react-router-dom";
import NavigationBar from "../../components/layouts/NavigationBar/NavigationBar.tsx";


const MainLayout = () => {
  return (
      <Stack direction='row'>
          <NavigationBar/>
          <div style={{flexGrow: 2}}>
          <Outlet/>
          </div>
      </Stack>
  );
};

export default MainLayout;

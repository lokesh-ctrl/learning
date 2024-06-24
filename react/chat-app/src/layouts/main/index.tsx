import {Stack} from "@mui/material";
import {Outlet} from "react-router-dom";
import NavigationBar from "../../components/layouts/NavigationBar/NavigationBar.tsx";
import {LoggedInUserContext} from "../../components/UserContext.tsx";
import {useEffect, useState} from "react";
import {getMe} from "../../services/auth.ts";


const MainLayout = () => {
    const [user, setUser] = useState({});

    function updateUserContext(user){
        setUser(user)
    }

    useEffect(() => {
        const response = getMe();
        Promise.all([response]).then((result) => {
            setUser(result[0].response.data)
        })
    }, [])

  return (
      <Stack direction='row'>
          <LoggedInUserContext.Provider value={[user,updateUserContext]}>
          <NavigationBar/>
          <div style={{flexGrow: 2}}>
          <Outlet/>
          </div>
          </LoggedInUserContext.Provider>
      </Stack>
  );
};

export default MainLayout;

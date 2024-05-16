import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";

export const LinkIcon = ({theme, IconComponent, isSelected, link, handleClick}) => {
    return (isSelected ? <Box sx={{
            backgroundColor: theme.palette.primary.dark,
            padding: "6px",
            borderRadius: "10px",
            color: theme.palette.grey[50]
        }}>
            <IconComponent/>
        </Box>
        :
        <Link to={link}>
            <IconButton key={link} onClick={() => {
                handleClick()
            }}>
                <IconComponent/>
            </IconButton>
        </Link>)
}
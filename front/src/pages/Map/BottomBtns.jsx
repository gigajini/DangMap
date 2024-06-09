import { Paper, Button, Box, Typography } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import VerifiedIcon from "@mui/icons-material/Verified";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";
import Mobile from "../../components/filter/Mobile";
import FilterPopup from "../FilterGroup/FilterPopup";

const BottomBtns = () => {
    const [openPopup, setOpenPopup] = useState([true, false, false]);
    const [open, setOpen] = useState(false);

    const handleButtonClick = (index) => {
        const updatedOpenPopup = openPopup.map((value, i) => i === index);
        setOpenPopup(updatedOpenPopup);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const btnStyle = {
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    };

    return (
        <>
            <Paper square elevation={4} sx={{ position: "fixed", bottom: "0", width: "100%" }}>
                <Box sx={{ width: "100%", display: "flex" }}>
                    <Button
                        sx={{ ...btnStyle, color: openPopup[0] ? "primary" : "grey.800" }}
                        onClick={() => handleButtonClick(0)}
                    >
                        <ManageSearchIcon fontSize="large" />
                        <Typography>검색</Typography>
                    </Button>
                    <Button
                        sx={{ ...btnStyle, color: openPopup[1] ? "primary" : "grey.800" }}
                        onClick={() => handleButtonClick(1)}
                    >
                        <VerifiedIcon fontSize="large" />
                        <Typography>MY충전소</Typography>
                    </Button>
                    {/* <Button sx={{...btnStyle, color: openPopup[2] ? 'primary' : 'grey.800'}} onClick={() => setOpen(true)}>
                        <FilterAltIcon fontSize="large" />
                        <Typography>필터검색</Typography>
                    </Button> */}
                    {/* <Mobile /> */}
                </Box>
            </Paper>
            <FilterPopup open={true} />
        </>
    );
};

export default BottomBtns;

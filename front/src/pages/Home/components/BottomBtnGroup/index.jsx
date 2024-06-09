import { Paper, Button, Box, Typography } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import VerifiedIcon from "@mui/icons-material/Verified";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useEffect, useState } from "react";
import FilterPopup from "../FilterGroup/FilterPopup";
import { FilterContent } from "./FilterContent";
import { SearchContent } from "./SearchContent";
import FavContent from "./FavContent";

export const BottomBtnGroup = () => {
    const buttonValue = [
        { label: "검색", icon: <ManageSearchIcon fontSize="large" />, content: <SearchContent /> },
        { label: "My충전소", icon: <VerifiedIcon fontSize="large" />, content: <FavContent /> },
        { label: "필터", icon: <FilterAltIcon fontSize="large" />, content: <FilterContent /> },
    ];

    const [activeButtons, setActiveButtons] = useState(new Array(buttonValue.length).fill(false));
    const [open, setOpen] = useState(false);

    const togglePopup = (index) => {
        setActiveButtons((prev) => {
            const newBtnArr = [...prev];
            newBtnArr[index] = !newBtnArr[index];
            setOpen(true);
            return newBtnArr;
        });
    };

    //팝업 닫을 때 버튼 색 초기화
    useEffect(() => {
        if (open === false) {
            setActiveButtons((prev) => {
                const findTrue = activeButtons.indexOf(true);
                const newBtnArr = [...prev];
                newBtnArr[findTrue] = !newBtnArr[findTrue];
                return newBtnArr;
            });
        }
    }, [open]);

    const btnStyle = {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    };

    return (
        <>
            <Paper square elevation={4} sx={{ position: "fixed", bottom: 0, width: "100%" }}>
                <Box sx={{ width: "100%", display: "flex" }}>
                    {buttonValue.map((btn, idx) => (
                        <Button
                            key={idx}
                            tabIndex={idx}
                            sx={{ ...btnStyle, color: activeButtons[idx] ? "primary" : "grey.800" }}
                            onClick={() => togglePopup(idx)}
                        >
                            {btn.icon}
                            <Typography>{btn.label}</Typography>
                        </Button>
                    ))}
                </Box>
            </Paper>
            {activeButtons.map((bool, idx) => {
                if (bool === true) {
                    return (
                        <FilterPopup key={idx} title={buttonValue[idx].label} open={open} setOpen={setOpen} >
                            {buttonValue[idx].content}
                        </FilterPopup>
                    );
                }
            })}
        </>
    );
};

import { Box, Button, TextField } from "@mui/material";
import React from "react";

const SearchInput = ({ width, onClick, handleSearchChange }) => {
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onClick();
        }
    };

    return (
        <Box width={width} sx={{ display: "flex", gap: "4px" }}>
            <TextField
                sx={{ flexGrow: "1" }}
                placeholder="검색어를 입력하세요."
                size="small"
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress} // Enter 키 입력 감지
            />
            <Button variant="contained" color="primary" onClick={onClick}>
                검색
            </Button>
        </Box>
    );
};

export default SearchInput;

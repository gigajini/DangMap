//후기 작성시 작성하고자 하는 충전소를 검색하는 팝업
import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchInput from "../../../components/input/SearchInput";
import { MapContext } from "../../../contexts/MapContext";
import { externalApi } from "../../../api/services/external";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function SearchPopup({
    title,
    width = 500,
    height = 500,
    station,
    setStation,
    buttonWidth,
    buttonHeight,
}) {
    const { setStations } = useContext(MapContext);
    const [open, setOpen] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 추가

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchWord(event.target.value);
    };

    const handleSearch = async () => {
        const pageIdx = 1;
        const count = 1580;

        try {
            const response = await externalApi.getAllStation(count, pageIdx);
            const datas = response.data?.items || [];

            if (response.status === 200) {
                const filteredStations = datas.filter((station) =>
                    station.chrstnNm.toUpperCase().includes(searchWord.toUpperCase().replace(/\s+/g, ""))
                );
                if (searchWord) {
                    if (filteredStations.length > 0) {
                        setStations(filteredStations);
                        setSearchResults(filteredStations); // 검색 결과 업데이트
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleResultClick = (station) => {
        setStation(station.chrstnNm);
        setOpen(false);
    };

    const dialogContentProps = {
        sx: { width: "430px", height: height },
        ...(title && { dividers: true }),
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ width: buttonWidth, height: buttonHeight }}>
                {station || "찾아보기"}
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                    내가 다녀온 충전소 찾기
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent {...dialogContentProps}>
                    <SearchInput onClick={handleSearch} handleSearchChange={handleSearchChange} />
                    {/* 검색 결과를 표시할 리스트 추가 */}
                    {searchResults.length > 0 ? (
                        <List>
                            {searchResults.map((station, index) => (
                                <ListItem button key={index} onClick={() => handleResultClick(station)}>
                                    <ListItemText primary={station.chrstnNm} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography>검색 결과를 찾을 수 없습니다.</Typography>
                    )}
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}

// 마커 클릭 시 위치에 맞는 충전소의 상세정보를 담고 있는 팝업창
import React, { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { MapContext } from "../../../../contexts/MapContext";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import "@fontsource/roboto/300.css";
import { Box, Typography } from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsIcon from "@mui/icons-material/Directions";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

const Detail = ({ open, handleClose, detailIndex }) => {
    const { stations } = useContext(MapContext);
    const stationInfo = stations.length > 0 ? stations[detailIndex] : null;

    const dialogContentProps = {
        sx: { width: "430px", height: "auto", maxHeight: "400px" },
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600, marginLeft: "1vw" }} id="customized-dialog-title">
                상세 정보
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
            </DialogTitle>
            <DialogContent {...dialogContentProps}>
                {stationInfo && (
                    <List
                        sx={{ width: "100%", bgcolor: "background.paper", p: 0 }} // 여백 제거
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="h5">
                                <Typography
                                    variant="h6"
                                    sx={{
                                        textAlign: "center",
                                        border: "1px solid #fff",
                                        backgroundColor: "secondary.main",
                                        color: "black",
                                        fontFamily: "Arial, sans-serif",
                                        fontWeight: "bolder",
                                        paddingTop: "2px",
                                        paddingBottom: "2px",
                                    }}
                                >
                                    {stationInfo.chrstnNm}
                                </Typography>
                            </ListSubheader>
                        }
                    >
                        <Box sx={{ p: 2 }}>
                            <Box sx={{ display: "flex" }}>
                                <AccessTimeIcon sx={{ marginTop: "0.6vw" }} />
                                <ListItemText
                                    primary="운영시간"
                                    secondary={stationInfo.useOpenTime}
                                    sx={{ marginLeft: "3px" }}
                                />
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <DirectionsIcon sx={{ marginTop: "0.6vw" }} />
                                <ListItemText
                                    primary="도로명 주소"
                                    secondary={stationInfo.rdnmadr}
                                    sx={{ marginLeft: "3px" }}
                                />
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <ApartmentIcon sx={{ marginTop: "0.6vw" }} />
                                <ListItemText
                                    primary="운영기관"
                                    secondary={stationInfo.manage_entrps_nm}
                                    sx={{ marginLeft: "3px" }}
                                />
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <ElectricalServicesIcon sx={{ marginTop: "0.6vw" }} />
                                <ListItemText
                                    primary="충전기 타입"
                                    secondary={stationInfo.chrstnType}
                                    sx={{ marginLeft: "3px" }}
                                />
                            </Box>
                        </Box>
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default Detail;

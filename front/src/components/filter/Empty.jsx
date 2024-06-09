import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Brand from './Brand';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function Empty({ title, children }) {
    const [open, setOpen] = React.useState(false);
    const [selectedBrand, setSelectedBrand] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const dialogContentProps = {
        sx: { width: "500px", height: "500px" },
        ...(title && { dividers: true }),
    };

    const arr = [
        "티비유",
        "투루차저(휴맥스EV)",
        "나이스차저(한국전자금융)",
        "딜라이브",
        "서울시",
        "스타코프",
        "유니이브이"
    ]

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                브랜드
            </Button>

            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                    충전기 브랜드 
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
                    <Box display={"flex"}>
                        <StyledInput type="text" className="underline-input" placeholder="브랜드명 검색" />
                        <SearchIcon type='submit' 
                            sx={{
                                fontSize: 40,
                                color: 'primary.main'
                            }}>검색
                        </SearchIcon>
                    </Box>
                    <Card>
                        <CardContent>
                               <Brand brands={arr} setSelectedBrand={setSelectedBrand} selectedBrand={selectedBrand} />
                        </CardContent>
                    </Card>
                        
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}

const StyledInput = styled('input')`
    border: none;
    border-bottom: 2px solid black;
    outline: none;
    padding: 5px 10px;
    margin-top: 10px;
    margin-left: 10px;
    width: 80%
`;

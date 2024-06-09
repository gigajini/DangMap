import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import { useState } from "react"; 

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function Pay({ title, width = 500, height = 100, children }) {
    const [open, setOpen] = React.useState(false);
    const [selectedPay, setSelectedPay] = useState(''); 

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const dialogContentProps = {
        sx: { width: width, height: height },
        ...(title && { dividers: true }),
    };

    const handlePayClick = (pay) => {
        setSelectedPay(pay); 
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                결제 방법   
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                    결제
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
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Button
                                variant={selectedPay === '현금 충전' ? 'contained' : 'outlined'} 
                                size="large"
                                color="primary"
                                onClick={() => handlePayClick('현금 충전')}
                            >
                                현금 충전
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant={selectedPay === 'QR 충전' ? 'contained' : 'outlined'} 
                                size="large"
                                color="primary"
                                onClick={() => handlePayClick('QR 충전')}
                            >
                                QR 충전
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant={selectedPay === '모두 보기' ? 'contained' : 'outlined'} 
                                size="large"
                                color="primary"
                                onClick={() => handlePayClick('모두 보기')}
                            >
                                모두 보기
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}

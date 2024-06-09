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

export default function Using({ title, width = 500, height = 100, children }) {
    const [open, setOpen] = React.useState(false);
    const [selectedUsing, setSelectedUsing] = useState(''); 

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

    const handleUsingClick = (speed) => {
        setSelectedUsing(speed); 
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                사용 여부
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                    사용 여부
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
                                variant={selectedUsing === '사용가능' ? 'contained' : 'outlined'} 
                                size="large"
                                color="primary"
                                onClick={() => handleUsingClick('사용가능')}
                            >
                                사용 가능
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant={selectedUsing === '사용중' ? 'contained' : 'outlined'} 
                                size="large"
                                color="primary"
                                onClick={() => handleUsingClick('사용중')}
                            >
                                사용 중
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant={selectedUsing === '사용 불가' ? 'contained' : 'outlined'} 
                                size="large"
                                color="primary"
                                onClick={() => handleUsingClick('사용 불가')}
                            >
                                사용 불가
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}

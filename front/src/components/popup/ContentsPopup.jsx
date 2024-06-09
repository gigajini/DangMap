import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// 제목 넣고 싶을 때 -> <ContentsPopup title="title"></ContentsPopup>
// 내용 넣고 싶을 때 -> <ContentsPopup>안녕하세요</ContentsPopup>

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function ContentsPopup({ title, width = 500, height = 500, children }) {
    const [open, setOpen] = React.useState(false);

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

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                카드
                {/* 카드 만들어지면 import 하기 */}
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                    {title}
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
                <DialogContent {...dialogContentProps}>{children}</DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}

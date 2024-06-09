import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function Local({ title, children }) {
    const [open, setOpen] = React.useState(false);

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

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} sx={{
                backgroundColor:'primary'
            }}>
                지역
                {/* 카드 만들어지면 import 하기 */}
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title"></DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "grey.500",
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box display={"flex"}>
                    <StyledInput type="text" className="underline-input" placeholder="예) 판교역166" />
                    <SearchIcon
                        type="submit"
                        sx={{
                            fontSize: 40,
                            color: "primary.main",
                        }}
                    >
                        검색
                    </SearchIcon>
                </Box>

                <DialogContent {...dialogContentProps}>
                    <div>
                        <Typography variant="h3" gutterBottom>
                            tip
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            아래와 같은 조합으로 검색을 하시면 <br />
                            더욱 정확한 결과가 검색됩니다.
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            도로명 + 건물 번호
                        </Typography>
                        <Typography variant="body1" gutterBottom color="primary.main">
                            예) 판교역로 166, 제주 첨단로242
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            지역명(동/리) + 번지
                        </Typography>
                        <Typography variant="body1" gutterBottom color="primary.main">
                            예) 백현동 532, 제주 영평동 2181
                        </Typography>
                    </div>
                </DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}

const StyledInput = styled("input")`
    border: none;
    border-bottom: 2px solid black;
    outline: none;
    padding: 5px 10px;
    margin-top: 10px;
    margin-left: 10px;
    width: 80%;
`;

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export default function FilterPopup({ title, children, open, setOpen }) {
    const theme = useTheme();
    const tabletWidth = useMediaQuery(theme.breakpoints.up("md"));

    const dialogContentProps = {
        sx: {
            width: tabletWidth ? 500 : "100%",
            height: "auto",
        },
        ...(title && { dividers: true }),
    };

    //스크롤 감지
    const [isScroll, setIsScroll] = React.useState(false);
    const contentRef = React.useRef(null);

    React.useEffect(() => {
        const contBoxElement = contentRef.current;
        const handleScroll = () => {
            console.log(contBoxElement.scrollTop);
            contBoxElement.scrollTop > 0 ? setIsScroll(true) : setIsScroll(false);
        };

        if (contBoxElement) {
            contBoxElement.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (contBoxElement) {
                contBoxElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isScroll]);

    //children 컴포넌트에 상속(팝업 닫기, 스크롤 여부 )
    const enhancedChildren = React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child, { setOpen, isScroll }) : child
    );


    return (
        <React.Fragment>
            <BootstrapDialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }} id="customized-dialog-title">
                    {title}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent {...dialogContentProps} ref={contentRef}>{enhancedChildren}</DialogContent>
            </BootstrapDialog>
        </React.Fragment>
    );
}

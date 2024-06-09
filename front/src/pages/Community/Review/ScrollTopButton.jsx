//화면의 가장 위로 가도록 하는 버튼(모바일 무한 스크롤에 사용)
import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const StyledButton = styled(Button)({
    position: 'fixed',
    bottom: 16,
    right: 16,
    borderRadius: '50%',
    minWidth: 56,
    minHeight: 56,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

const ScrollToTopButton = ({ onClick }) => {
  return (
    <StyledButton 
      variant="contained" 
      color="primary" 
      onClick={onClick}
    >
      <ArrowUpwardIcon />
    </StyledButton>
  );
};

export default ScrollToTopButton;

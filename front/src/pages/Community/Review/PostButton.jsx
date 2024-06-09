//작성하기 버튼
import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ReviewButton = ({ handleWriteButtonClick }) => {
  return (
    <Button variant="outlined" onClick={handleWriteButtonClick} size='small'>
      <EditIcon />작성하기
    </Button>
  );
};

export default ReviewButton;

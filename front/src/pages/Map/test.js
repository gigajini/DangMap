<>
<Button 
    aria-label="memo" 
    size="small" 
    sx={{color:'primary.main',bgcolor:'#E9EFFF'}}
    onClick={handleMemoBtnClick}
>
    <Typography sx={{fontSize:"14px",marginRight:"2px"}}>메모추가</Typography>
    <RateReviewIcon fontSize="small"/>
</Button>
{write && !complete &&
    <Box>
        <TextField 
            size="small"
            onChange={handleInputComplete} 
        />
        <Button>완료</Button>
    </Box> 
}
{!write && complete &&
    <Box sx={{display:'flex',gap:'4px',alignItems:"center"}}>
        <Typography color="primary" sx={{fontWeight:'bold'}}>작성완료</Typography>
        <IconButton color="primary" onClick={handleTextEdit}>
            <RateReviewIcon color="primary" fontSize="small"/>
        </IconButton>
    </Box>
}
</>

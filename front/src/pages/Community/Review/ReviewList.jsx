//Review.jsx에서 작성된 후기를 보여주는 리스트
import React, { useEffect, useState } from "react";
import { List, Typography, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    ...theme.typography.body2,
    backgroundColor: "#eeeeee",
}));

const ReviewList = ({ isDesktop, reviews, page, reviewsPerPage = 3 }) => {
    const [currentReviews, setCurrentReviews] = useState([]);

    useEffect(() => {
        const cr = isDesktop
            ? reviews?.slice((page - 1) * reviewsPerPage, page * reviewsPerPage)
            : reviews?.slice(0, page * reviewsPerPage);
        setCurrentReviews(cr);
    }, [page, reviews, isDesktop]);

    return (
        <List sx={{ width: "100%", margin: "0 auto" }}>
            {currentReviews?.length > 0 ? (
                currentReviews.map((review, index) => (
                    <DemoPaper key={index} elevation={5}>
                        <Box
                            sx={{
                                display: "inline-block",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Typography variant="h6">{review.station}</Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="body2"> 
                                    {/*회원 탈퇴를 한 사람이 작성한 후기는 작성자를 알 수 없음으로 나타냄*/}
                                    작성자: {review.User ? review.User.username : "알 수 없음"}
                                </Typography>
                                <Typography variant="body2">
                                    작성일: {new Date(review.createdAt).toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                width: "100%",
                            }}
                        >
                            <Typography variant="body1" component="span">
                                {"⭐".repeat(review.starscore)}
                            </Typography>
                            <Typography component="span" variant="subtitle1">
                                {review.content}
                            </Typography>
                        </Box>
                    </DemoPaper>
                ))
            ) : (
                <Typography variant="body1" align="center">
                    리뷰를 작성해주세요.
                </Typography>
            )}
        </List>
    );
};

export default ReviewList;

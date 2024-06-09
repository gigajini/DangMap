//모바일일 때 리스트 무한 스크롤로 보여주기
import { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "./../../../hooks/useIntersectionObserver";
import ReviewList from "./ReviewList";
import PostButton from "./PostButton";
import ScrollToTopButton from "./ScrollTopButton";
import { Container, ListItem, Typography } from "@mui/material";

const MobileReview = ({ handleWriteButtonClick, reviews, reviewsPerPage }) => {
    const intersectionRef = useRef(null);
    const intersectionObserver = useIntersectionObserver({ ref: intersectionRef, options: {} });

    const [page, setPage] = useState(1);
    const maxPage = Math.ceil(reviews?.length / reviewsPerPage);

    useEffect(() => {
        if (intersectionObserver?.isIntersecting) {
            setPage((prevPage) => (prevPage += 1));
        }
    }, [intersectionObserver]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        //한 번의 스크롤로 모여지는 리스트 개수
        <Container maxWidth="sm" sx={{ p: 3 }}>
            <PostButton handleWriteButtonClick={handleWriteButtonClick} />
            <ReviewList reviews={reviews} page={page} reviewsPerPage={reviewsPerPage} />
            {page >= maxPage && (
                <ListItem alignItems="center" sx={{ flexDirection: "column", py: 3 }}>
                    <Typography>✔️ 모든 목록을 다 읽었어요.</Typography>
                </ListItem>
            )}
            <div ref={intersectionRef}></div>
            {/*무한 스크롤 중 제일 처음 화면으로 이동할 수 있도록 하는 버튼*/}
            <ScrollToTopButton onClick={scrollToTop} />
        </Container>
    );
};

export default MobileReview;

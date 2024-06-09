import { reviewApi } from '../../../api/services/review';

async function getReview(pageIndex = 0, pageSize = 3) {
  const token = localStorage.getItem('token');
  const res = await reviewApi.getAll(token, {pageIndex, pageSize});
  const data = res.data.payload;
  const startIndex = pageIndex * pageSize;

  return {
    page: {
      pageIndex,
      pageSize,
      totalElementCount: data.length,
      totalPageCount: Math.ceil(data.length / pageSize),
    },
    data: data.slice(startIndex, startIndex + pageSize),
  };
}

export default {
  getReview,
};

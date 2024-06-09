const express = require('express');
const router = express.Router();
const path = require('path');
const { addStation, getStation, deleteStation, writeMemo } = require('../controllers/station');

//즐겨찾기 조회(/v1/stations/list)
router.get('/list', getStation);

//즐겨찾기 등록(/v1/stations/add)
router.post('/add',addStation);

//즐겨찾기 삭제(/v1/stations/delete:id)
router.delete('/remove',deleteStation);

//메모등록
router.put('/memo', writeMemo)


module.exports = router;
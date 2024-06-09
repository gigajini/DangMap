const { User, LikeStation } = require('../models');
const op = require('sequelize').Op;
const db = require('../models');

exports.getStation = async(req, res, next) => {
    try{
        const likeStations = await LikeStation.findAll({
            where : {userId : req.user.id},
            attributes: ['chrstn_id','memo']
        })
        res.json({
            code:200,
            payload: likeStations
        })
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.addStation = async(req, res, next) => {
    try{
        const likeStation = await LikeStation.create({
            chrstn_id : req.body.chrstn_id,
            UserId : req.user.id
        })
        res.json({
            code:200,
            payload: likeStation
        })
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.deleteStation = async(req, res, next) => {
    try{
        await LikeStation.destroy({
            where: {
                chrstn_id : req.body.chrstn_id,
                UserId : req.user.id
            }
        })
        res.json({
            code:200,
            message: "즐겨찾기가 해제되었습니다."
        })
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.writeMemo = async(req, res, next) => {
    try{
        const station = await LikeStation.update({
            memo: req.body.memo
        },{
            where : {
                chrstn_id : req.body.chrstn_id,
                UserId : req.user.id  
            }
        })
        res.json({
            code:200,
            payload: '등록이 완료되었습니다.'
        });

    }catch(err){
        console.error(err);
        next(err);
    }
}
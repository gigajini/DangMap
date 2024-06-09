const { User, Report } = require("../models");

exports.getReport = async (req, res, next) => {
    try {
        let reports = [];
        console.log(req.query.userId);
        reports = await Report.findAll({
            where: { userId: req.query.userId },
            include: {
                model: User,
                attributes: ["id", "username"],
            },
            order: [["createdAt", "DESC"]],
        });
        res.json({
            code: 200,
            payload: reports,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.writeReport = async (req, res, next) => {
    try {
        const { carNum, station, content, UserId } = req.body;

        const newReport = await Report.create({
            carNum,
            station,
            content,
            UserId,
        });

        res.status(200).json({
            code: 200,
            payload: newReport,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

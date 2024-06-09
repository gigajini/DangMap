const { Review, User } = require("../models");

exports.writeReview = async (req, res, next) => {
    try {
        const { station, starScore, content } = req.body;

        const newReview = await Review.create({
            station,
            starscore: starScore,
            content,
            UserId : req.user.id,
        });

        res.status(200).json({
            code: 200,
            payload: newReview,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.getReview = async (req, res, next) => {
    try {
        let reviews;
        if (JSON.stringify(req.query) !== "{}") {
            reviews = await Review.findAll({
                // where: { UserId: req.user.id},
                attributes: ['station', 'createdAt', 'starscore', 'content'],
                include: [
                    {
                        model: User
                    }
                ],
                limit: parseInt(req.query.pageSize),
                offset: parseInt(req.query.pageIndex)
            });
        } else {
            reviews = await Review.findAll({
                // where: { UserId: req.user.id},
                attributes: ['station', 'createdAt', 'starscore', 'content'],
                include: [
                    {
                        model: User
                    }
                ]
            });
        }
        res.json({
            code: 200,
            payload: reviews
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

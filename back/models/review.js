const Sequelize = require("sequelize");

class Review extends Sequelize.Model {
    static initiate(sequelize) {
        Review.init(
            {
                station: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                starscore:{
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    validate: {
                        min: 1,
                        max: 5,
                    },
                },
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
            },
            {
                sequelize,
                charset: "utf8",
                collate: "utf8_general_ci",
                timestamps: true, //createdAt 자동 생성 막아둠, 컨트롤러에 직접 생성을 선택함
            }
        );
    }

    static associate(db) {
        db.Review.belongsTo(db.User);
    }
}

module.exports = Review;

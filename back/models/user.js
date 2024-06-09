const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init(
            {
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                    unique: true,
                },
                username: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                provider: {
                    type: Sequelize.ENUM("local", "kakao"),
                    allowNull: false,
                    defaultValue: "local",
                },
                kakaoId: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
                refreshToken: {
                    type: Sequelize.STRING(1024),
                    allowNull: true,
                },
            },
            {
                sequelize,
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
                timestamps: true,
            }
        );
    }
    static associate(db) {
        db.User.hasMany(db.LikeStation);
        db.User.hasMany(db.Review);
    }
}

module.exports = User;

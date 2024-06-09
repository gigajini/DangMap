const Sequelize = require("sequelize");

class LikeStation extends Sequelize.Model {
    static initiate(sequelize) {
        LikeStation.init({
            chrstn_id: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            memo: {
                type: Sequelize.STRING(100),
                allowNull: true,
            }
        },{
            sequelize,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
        db.LikeStation.belongsTo(db.User);
    }
}

module.exports = LikeStation;
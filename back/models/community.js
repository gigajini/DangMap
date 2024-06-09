const Sequelize = require("sequelize");

class Report extends Sequelize.Model {
    static initiate(sequelize) {
        Report.init(
            {
                carNum: {
                    type: Sequelize.STRING(15),
                    allowNull: true,
                },
                station: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
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
            }
        );
    }

    static associate(db) {
        db.Report.belongsTo(db.User);
    }
}

module.exports = Report;

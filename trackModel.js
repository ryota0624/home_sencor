const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "node",
    "root",
    "",
    {host: "localhost", port: "3306"}
)

global.db = {
    Sequelize: Sequelize,
    sequelize: Sequelize,
    Message: sequelize.import(__dirname + "/track")
}

module.exports = global.db
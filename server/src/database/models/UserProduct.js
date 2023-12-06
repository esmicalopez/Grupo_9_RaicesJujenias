module.exports = (sequelize, dataTypes) => {
    const UserProduct = sequelize.define("UserProduct", {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }
    }, {
        tableName: "user_product",
        timestamps: false
    })

    return UserProduct
}

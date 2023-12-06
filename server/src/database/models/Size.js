module.exports = (sequelize, dataTypes) => {
    const Size = sequelize.define("Size", {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(150),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: "sizes"
    })

    Size.associate = models => {
        Size.hasMany(models.ProductDetail, {
            as: "product_detail",
            foreignKey: "size_id"
        })
    }

    return Size
}

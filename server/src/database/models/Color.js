module.exports = (sequelize, dataTypes) => {
    const Color = sequelize.define("Color", {
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
        tableName: "colors"
    })

    Color.associate = models => {
        Color.hasMany(models.ProductDetail, {
            as: "product_detail",
            foreignKey: "color_id"
        })
    }

    return Color
}

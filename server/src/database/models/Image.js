module.exports = (sequelize, dataTypes) => {
    const Image = sequelize.define("Image", {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
        product_detail_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }

    }, {
        timestamps: false,
        tableName: "images"
    })

    Image.associate = models => {
        Image.belongsTo(models.ProductDetail, {
            as: "product_detail",
            foreignKey: "product_detail_id"
        })
    }

    return Image
}

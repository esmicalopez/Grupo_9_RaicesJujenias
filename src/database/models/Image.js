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
        color_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }

    }, {
        timestamps: false,
        tableName: "images"
    })

    Image.associate = models => {
        Image.belongsTo(models.Product, {
            as: "producto",
            foreignKey: "product_id"
        })

        Image.belongsTo(models.Color, {
            as: "colorProducto",
            foreignKey: "color_id"
        })
    }

    return Image
}

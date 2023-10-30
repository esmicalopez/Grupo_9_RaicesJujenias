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
        },
    }, {
        timestamps: false, 
        tableName: "colors",
    })

    Color.associate = models => {
        Color.hasMany(models.Image, {
            as: "imagenes",
            foreignKey: "color_id"
        })

        Color.belongsToMany(models.Product, {
            as: "productos",
            through: "product_color",
            foreignKey: "color_id",
            otherKey: "product_id",
            timestamps: false
        })
    }

    return Color
}

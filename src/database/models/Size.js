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
        },
    }, {
        timestamps: false, 
        tableName: "sizes",
    })

    Size.associate = models => {
        Size.belongsToMany(models.Product, {
            as: "productos",
            through: "product_size",
            foreignKey: "size_id",
            otherKey: "product_id",
            timestamps: false
        })
    }

    return Size
}

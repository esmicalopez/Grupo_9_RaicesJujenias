module.exports = (sequelize, dataTypes) => {
    const Category = sequelize.define("Category", {
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
        ranking: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true
        }
    }, {
        timestamps: false,
        tableName: "categories"
    })

    Category.associate = models => {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id"
        })
    }

    return Category
}

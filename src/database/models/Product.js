module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define("Product", {
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
        description: {
            type: dataTypes.STRING(350)
        },
        category_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        paranoid: true,
        timestamps: true,
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    })

    Product.associate = models => {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        })

        Product.hasMany(models.ProductDetail, {
            as: "product_detail",
            foreignKey: "product_id"
        })

        Product.belongsToMany(models.User, {
            as: "users",
            through: models.UserProduct,
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false
        })
    }

    return Product
}

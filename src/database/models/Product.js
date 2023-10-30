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
        price: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(350)
        },
        offer: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            defaultValue: null
        },
        stock: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
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
            as: "categoria",
            foreignKey: "category_id"
        })

        Product.hasMany(models.Image, {
            as: "imagenes",
            foreignKey: "product_id"
        })

        Product.belongsToMany(models.Color, {
            as: "colores",
            through: "product_color",
            foreignKey: "product_id",
            otherKey: "color_id",
            timestamps: false
        })

        Product.belongsToMany(models.Size, {
            as: "tamaños",
            through: "product_color",
            foreignKey: "product_id",
            otherKey: "size_id",
            timestamps: false
        })

        Product.belongsToMany(models.User, {
            as: "usuarios",
            through: models.UserProduct,
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false
        })
    }

    return Product
}

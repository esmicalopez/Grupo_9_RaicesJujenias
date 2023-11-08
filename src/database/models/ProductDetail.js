module.exports = (sequelize, dataTypes) => {
    const ProductDetail = sequelize.define("ProductDetail", {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        price: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        offer: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            defaultValue: null
        },
        stock: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        color_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        size_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        tableName: "product_detail",
        timestamps: false
    })

    ProductDetail.associate = models => {
        ProductDetail.hasMany(models.Image, {
            as: "images",
            foreignKey: "product_detail_id"
        })
        ProductDetail.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        })

        ProductDetail.belongsTo(models.Color, {
            as: "color",
            foreignKey: "color_id"
        })

        ProductDetail.belongsTo(models.Size, {
            as: "size",
            foreignKey: "size_id"
        })
    }

    return ProductDetail
}
// Asociación con carrito
/*
Product.belongsToMany(models.Cart, {
            as: "carts",
            through: models.CartProduct,
            foreignKey: "product_id",
            otherKey: "cart_id"
        }) */

module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define("User", {
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
        lastName: {
            type: dataTypes.STRING(150),
            allowNull: false,
            field: "last_name"
        },
        email: {
            type: dataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(400),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(400),
            defaultValue: "default-avatar.png"
        },
        preference_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        rol_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }

    }, {
        paranoid: true,
        timestamps: false,
        tableName: "users",
        createdAt: "registered_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    })

    User.associate = models => {
        User.belongsTo(models.Preference, {
            as: "preference",
            foreignKey: "preference_id"
        })

        User.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "rol_id"
        })

        User.belongsToMany(models.Product, {
            as: "products",
            through: models.UserProduct,
            foreignKey: "user_id",
            otherKey: "product_id",
            timestamps: false
        })
    }

    return User
}

// Asociación con carrito
/* User.hasMany(models.Cart, {
            as: "carts",
            foreignKey: "user_id"
        }) */

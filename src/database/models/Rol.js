module.exports = (sequelize, dataTypes) => {
    const Rol = sequelize.define("Rol", {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: "roles",
        timestamps: false
    })

    Rol.associate = models => {
        Rol.hasMany(models.User, {
            as: "users",
            foreignKey: "rol_id"
        })
    }

    return Rol
}

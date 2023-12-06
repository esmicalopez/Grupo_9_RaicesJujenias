module.exports = (sequelize, dataTypes) => {
    const Preference = sequelize.define("Preference", {
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
        tableName: "preferences",
        timestamps: false
    })

    Preference.associate = models => {
        Preference.hasMany(models.User, {
            as: "users",
            foreignKey: "preference_id"
        })
    }

    return Preference
}

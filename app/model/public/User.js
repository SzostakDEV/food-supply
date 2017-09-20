module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        login: DataTypes.TEXT,
        password: DataTypes.TEXT,
        role: DataTypes.TEXT,
    }, {
        timestamps: false,
        tableName: 'user',
        schema: 'public',
        freezeTableName: true
    });
};
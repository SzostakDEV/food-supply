module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Food', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        available__c: DataTypes.BOOLEAN,
        price__c: DataTypes.FLOAT,
        description__c: DataTypes.TEXT,
        name: DataTypes.TEXT
    }, {
        timestamps: false,
        tableName: 'food__c',
        schema: 'salesforce',
        freezeTableName: true
    });
};
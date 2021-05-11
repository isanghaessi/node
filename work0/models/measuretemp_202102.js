const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('measuretemp_202102', {
    rid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    group_id: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    patient_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    temp: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    humid: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    reg_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'measuretemp_202102',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rid" },
        ]
      },
    ]
  });
};

export default (sequelize, DataTypes) => {
  const patientOrder = sequelize.define('PatientOrder', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true
      }
    },
    patientId: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    medicineId: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    supplierId: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.ENUM({
        values: ['pending', 'confirmed', 'delivered']
      }),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  patientOrder.associate = models => {
    const { Patient, Medicine, Supplier } = models;

    patientOrder.belongsTo(Patient, {
      foreignKey: 'patientid',
      targetKey: 'id'
    });

    patientOrder.hasMany(Medicine, {
      foreignKey: 'medicineId',
      sourceKey: 'id'
    });

    patientOrder.hasOne(Supplier, {
      foreignKey: 'supplierId',
      sourceKey: 'id'
    });
  };
  return patientOrder;
};

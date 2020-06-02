export default (sequelize, DataTypes) => {
  const patientOrder = sequelize.define('PatientOrder', {
    orderId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      validate: {
        notEmpty: true
      }
    },
    patientId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    medicineId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  patientOrder.associate = models => {
    const { Patient, Medicine } = models;

    patientOrder.belongsTo(Patient, {
      foreignKey: 'patientId',
      targetKey: 'patientId'
    });

    patientOrder.hasMany(Medicine, {
      foreignKey: 'medicineId',
      sourceKey: 'medicineId'
    });
  };
  return patientOrder;
};

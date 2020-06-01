export default (sequelize, DataTypes) => {
  return sequelize.define('Medicine', {
    medicineId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true
      }
    },
    medicineName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    manufacturingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    pricePerTablet: {
      type: DataTypes.FLOAT,
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
    }
  });
};

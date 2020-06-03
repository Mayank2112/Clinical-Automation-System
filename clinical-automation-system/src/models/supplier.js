export default (sequelize, DataTypes) => {
  const supplier = sequelize.define('Supplier', {
    id: {
      type: DataTypes.UUID,
      unique: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    companyAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.ENUM({
        values: ['registered', 'pending', 'approved']
      }),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });
  return supplier;
};

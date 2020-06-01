export default (sequelize, DataTypes) => {
  const patientHistory = sequelize.define('PatientHistory', {
    historyId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true
      }
    },
    appotmentId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true
      }
    },
    disease: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    tablets: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    patientReport: {
      type: DataTypes.STRING
    }
  });

  return patientHistory;
};

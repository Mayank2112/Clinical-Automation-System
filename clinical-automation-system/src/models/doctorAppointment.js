export default (sequelize, DataTypes) => {
  const doctorAppointment = sequelize.define('DoctorAppointment', {
    appointmentId: {
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
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING
    },
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  doctorAppointment.associate = models => {
    const { PatientHistory } = models;

    doctorAppointment.hasOne(PatientHistory, {
      foreignKey: 'appointmentId',
      sourceKey: 'appointmentId'
    });
  };
  return doctorAppointment;
};

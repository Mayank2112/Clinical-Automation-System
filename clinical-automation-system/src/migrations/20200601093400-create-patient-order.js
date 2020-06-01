'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('PatientOrders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    orderId: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    patientId: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    medicineId: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    quantity: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    orderDate: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export function down(queryInterface, Sequelize) {
  return queryInterface.dropTable('PatientOrders');
}

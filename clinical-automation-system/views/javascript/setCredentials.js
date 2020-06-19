const setDoctor = email => {
  document.getElementById('doctorEmail').value = email;
};

const setAppointment = id => {
  document.getElementById('appointmentId').value = id;
  document.getElementById('appointment').innerHTML = 'Selected';
};

const setSupplier = (id, name) => {
  document.getElementById('supplierId').value = id;
  document.getElementById('supplierName').value = name;
};

module.exports = {
  setAppointment,
  setDoctor,
  setSupplier
};

/**
 * Checks addtional informations of doctor
 * @param {Object} doctor
 */
export const isValidTypes = doctor => !(isNaN(doctor.startTime)
  || isNaN(doctor.endTime)
  || isNaN(doctor.appointmentFee)
  || !doctor.experienceFrom
  || typeof doctor.degree !== 'string');

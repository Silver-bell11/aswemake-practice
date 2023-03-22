const nameValidation = async (name) => {
  if (!(name.length === 3)) {
    const error = new Error('PLEASE INPUT YOUR REAL FULL NAME!!');
    error.statusCode = 400;
    throw error;
  }
};

const phoneNumberValidation = async (phoneNumber) => {
  if (!(phoneNumber.length === 10 || phoneNumber.length === 11)) {
    const error = new Error('PLEASE CHECK YOUR PHONE NUMBER DIGITS!!');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  nameValidation,
  phoneNumberValidation,
};

const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');

const {
  nameValidation,
  phoneNumberValidation,
} = require('../utils/userInfoValidation');

const {
  createAccessToken,
  createRefreshToken,
} = require('../utils/tokenValidation');

const signUp = async (
  identification,
  password,
  name,
  birth,
  phoneNumber,
  gender,
  zipCode,
  address,
  detailAddress
) => {
  try {
    const [userInfo] = await userDao.getUser(identification);

    if (userInfo.identification) {
      const error = new Error('THIS ID ALREADY EXISTS!!');
      error.statusCode = 400;
      throw error;
    }

    await nameValidation(name);
    await phoneNumberValidation(phoneNumber);

    const saltRounds = 12;
    const hashedPw = await bcrypt.hash(password, saltRounds);

    return await userDao.signUp(
      identification,
      hashedPw,
      name,
      birth,
      phoneNumber,
      gender,
      zipCode,
      address,
      detailAddress
    );
  } catch (error) {
    throw error;
  }
};

const login = async (identification, password) => {
  try {
    const [userInfo] = await userDao.getUserInfoForLogin(identification);
    const userId = userInfo.id;

    if (!userInfo) {
      const error = new Error('YOU NEED SIGNUP!!');
      error.statusCode = 400;
      throw error;
    }
    const checkPw = await bcrypt.compare(password, userInfo.password);

    if (!checkPw) {
      const error = new Error('PLEASE CHECK YOUR PASSWORD');
      error.statusCode = 400;
      throw error;
    }

    const accessToken = createAccessToken(userId);

    const refreshToken = createRefreshToken();

    await userDao.login(userId, refreshToken);

    return [accessToken, refreshToken];
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  return await userDao.getUserById(userId);
};

module.exports = { signUp, login, getUserById };

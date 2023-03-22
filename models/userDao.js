const appDataSource = require('./dataSource');

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
    const usersQuery = `
      INSERT INTO users (
        identification,
        password,
        name,
        birth,
        phone_number,
        gender
      ) 
      VALUES(?,?,?,?,?,?)`;

    const userInfo = await appDataSource.query(usersQuery, [
      identification,
      password,
      name,
      birth,
      phoneNumber,
      gender,
    ]);

    const userId = userInfo.insertId;

    const userAddressQuery = `
      INSERT INTO user_address (
        user_id,
        zip_code,
        address,
        detail_address
      )
      VALUES(?,?,?,?)`;

    await appDataSource.query(userAddressQuery, [
      userId,
      zipCode,
      address,
      detailAddress,
    ]);

    return;
  } catch (err) {
    const error = new Error('INVALID DATA INPUT!!');
    error.statusCode = 500;
    console.error(err.stack);
    throw error;
  }
};

const getUserInfoForLogin = async (identification) => {
  const rawQuery = `
  SELECT 
    id,
    identification,
    password
  FROM users
  WHERE identification = ?
  `;
  return await appDataSource.query(rawQuery, [identification]);
};

const login = async (userId, refreshToken) => {
  const rawQuery = `
    UPDATE users
    SET refresh_token = ?
    WHERE id = ?
  `;
  await appDataSource.query(rawQuery, [refreshToken, userId]);
  return;
};

//로그인 유지 기능 테스트용
const getUserById = async (userId) => {
  const rawQuery = `
    SELECT 
      id,
      identification,
      gender
    FROM users
    WHERE id = ?
  `;
  return await appDataSource.query(rawQuery, [userId]);
};

const getRefreshTokenByUser = async (userId) => {
  const rawQuery = `
    SELECT 
      id,
      identification,
      refresh_token as refreshToken
    FROM users
    WHERE id = ?
  `;
  return await appDataSource.query(rawQuery, [userId]);
};

module.exports = {
  signUp,
  getUserInfoForLogin,
  login,
  getUserById,
  getRefreshTokenByUser,
};

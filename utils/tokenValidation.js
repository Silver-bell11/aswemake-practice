const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
const accessTokenInfo = {
  algorithm: process.env.ALGORITHM,
  expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
};
const refreshTokenInfo = {
  algorithm: process.env.ALGORITHM,
  expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

const createAccessToken = (userId) => {
  const payLoad = {
    id: userId,
  };

  return jwt.sign(payLoad, secretKey, accessTokenInfo);
};

const accessTokenVerify = (token) => {
  try {
    const decode = jwt.verify(token, secretKey);

    return {
      ok: true,
      id: decode.id,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message,
    };
  }
};

const createRefreshToken = () => {
  return jwt.sign({}, secretKey, refreshTokenInfo);
};

const refreshTokenVerify = async (refreshToken, userRefreshToken) => {
  try {
    if (refreshToken === userRefreshToken) {
      jwt.verify(refreshToken, secretKey);

      return { ok: true };
    } else {
      return { ok: false, message: 'INVALID TOKEN' };
    }
  } catch (err) {
    return { ok: false, message: err.message };
  }
};

module.exports = {
  createAccessToken,
  accessTokenVerify,
  createRefreshToken,
  refreshTokenVerify,
};

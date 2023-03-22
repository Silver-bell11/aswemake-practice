const jwt = require('jsonwebtoken');
const userDao = require('../models/userDao');

const {
  createAccessToken,
  createRefreshToken,
  accessTokenVerify,
  refreshTokenVerify,
} = require('../utils/tokenValidation');
const { catchAsync } = require('../utils/error');

const validateTokens = catchAsync(async (req, res, next) => {
  const accessToken = req.headers.authorization;
  const refreshToken = req.cookies.refreshToken;

  // access token과 refresh token의 존재 유무를 체크합니다.
  if (accessToken && refreshToken) {
    const authResult = accessTokenVerify(accessToken); // access token 검증

    const decoded = jwt.decode(accessToken);
    const userId = decoded.id;

    if (decoded === null) {
      const error = new Error('YOU NEED ACCESS TOKEN');
      error.statusCode = 400;
      throw error;
    }

    //refresh token 검증
    const [getRefreshTokenByUser] = await userDao.getRefreshTokenByUser(userId);
    const userRefreshToken = getRefreshTokenByUser.refreshToken;

    const refreshResult = await refreshTokenVerify(
      refreshToken,
      userRefreshToken
    );

    if (authResult.ok === false && authResult.message === 'jwt expired') {
      // 1. access token이 만료 && refresh token도 만료 => 새로 로그인 필요
      if (
        refreshResult.ok === false &&
        refreshResult.message === 'jwt expired'
      ) {
        const error = new Error('YOU NEED LOGIN AGAIN');
        error.statusCode = 400;
        throw error;
      } else if (
        //2. access token 만료 && 올바르지 않은 refresh token(userRefreshToken !=== cookieRefreshToken) => 에러 반환
        refreshResult.ok === false &&
        refreshResult.message === 'INVALID TOKEN'
      ) {
        const error = new Error(
          'INVALID REFRESH TOKEN, PLEASE CHECK YOUR REFRESH TOKEN'
        );
        error.statusCode = 400;
        throw error;
      } else {
        // 3. access token이 만료 && refresh token 유효 => 새로운 access token을 발급
        const newAccessToken = createAccessToken(userId);

        return res.status(200).json({
          accessToken: newAccessToken,
          message: 'CREATED NEW ACCESS TOKEN',
        });
      }
    } else {
      // 4. access token이 유효 && refresh 만료일 경우 => 새로운 refresh token 발급
      if (
        refreshResult.ok === false &&
        refreshResult.message === 'jwt expired'
      ) {
        const newRefreshToken = createRefreshToken();
        await userDao.login(userId, newRefreshToken);
        return res
          .status(201)
          .cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            expires: new Date(Date.now() + 360000),
          })
          .json({ message: 'CREATED NEW REFRESH TOKEN' });
      } else if (
        //5. acces token 유효 && refresh token이 올바르지 않은 경우 => 에러 반환
        refreshResult.ok === false &&
        refreshResult.message === 'INVALID TOKEN'
      ) {
        const error = new Error(
          'INVALID REFRESH TOKEN, PLEASE CHECK YOUR REFRESH TOKEN'
        );
        error.statusCode = 400;
        throw error;
      } else {
        // 6. access token 유효 => refresh token 재발급 필요 없음
        req.user = decoded.id;
        return next();
      }
    }
  } else {
    // access token 또는 refresh token이 헤더에 없는 경우
    const error = new Error('YOU NEED TOKENS, PLEASE LOGIN');
    error.statusCode = 400;
    throw error;
  }
});

module.exports = {
  validateTokens,
};

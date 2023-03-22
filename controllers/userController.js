const userService = require('../services/userService');

const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async (req, res) => {
  const {
    identification,
    password,
    name,
    birth,
    phoneNumber,
    gender,
    zipCode,
    address,
    detailAddress,
  } = req.body;

  if (
    !(
      identification ||
      password ||
      name ||
      birth ||
      phoneNumber ||
      gender ||
      zipCode ||
      address ||
      detailAddress
    )
  ) {
    const error = new Error('PLEASE FILL IN ALL BLANKS');
    error.statusCode = 400;
    throw error;
  }

  await userService.signUp(
    identification,
    password,
    name,
    birth,
    phoneNumber,
    gender,
    zipCode,
    address,
    detailAddress
  );

  return res.status(200).json({ message: 'SIGNUP_SUCCESS' });
});

const login = catchAsync(async (req, res) => {
  const { identification, password } = req.body;

  const [accessToken, refreshToken] = await userService.login(
    identification,
    password
  );

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 3600000),
    })
    .json({ accessToken: accessToken });
});

const getUserById = catchAsync(async (req, res) => {
  const userId = req.user;

  const [userInfo] = await userService.getUserById(userId);

  return res.status(200).json({ userInfo: userInfo });
});

module.exports = { signUp, login, getUserById };

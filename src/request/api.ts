import request from './index'

export const captchaAPI = (): Promise<CaptchaAPIRes> => request.get('/prod-api/captchaImage')

// export const loginAPI = (params: LoginAPIReq): Promise<LoginAPIRes> => request.post('/prod-api/login', params)

/**
 * registration
 * @param params username
 * @param params email
 * @param params password
 * @param params confirmPassword
 * @returns 
 */
export const registrationAPI = (params: RegistrationAPIReq): Promise<APIRes> => request.post('/api/v1/user/registration', params)

/**
 * login
 * @param params username
 * @param params password
 */
export const loginAPI = (params: LoginAPIReq): Promise<APIRes> => request.post('/api/v1/user/login', params)

/**
 * logout
 * @param params username
 */
export const logoutAPI = (): Promise<APIRes> => request.post('/api/v1/user/logout')

/**
 * getUserInfo
 */
export const getUserInfoAPI = (): Promise<APIRes> => request.get('/api/v1/user/login/user-info/username')

/**
 * update email address
 * @param params email
 */
export const updateEmailAddressAPI = (params: UpdateEmailAddressReq): Promise<APIRes> => request.put('/api/v1/user/login/user-info/username/update-email', params)

/**
 * getMail
 */
export const getMailAddressAPI = (): Promise<APIRes> => request.get('/api/v1/user/login/user-info/username/mail-address')

/**
 * updateMailAddress
 * @param params country
 * @param params state
 * @param params address
 * @param params city
 * @param params zip
 * @param params phone
 */
export const updateMailAddressAPI = (params: UpdateMailAddressReq): Promise<APIRes> => request.put('/api/v1/user/login/user-info/username/update-mail-address', params)

/**
 * returnAllGames
 */
export const returnAllGamesAPI = (): Promise<APIRes> => request.get('/api/v1/all-games')

/**
 * returnAllGamesWithGenre
 */
export const returnAllGamesWithGenreAPI = ():Promise<APIRes> => request.get('/api/v1/all-games/3')

/**
 * returnAllGamesGenres
 */
export const returnAllGamesGenresAPI = (): Promise<APIRes> => request.get('/api/v1/all-games-genres')


/**
 * /api/v1/get-news
 */
export const getNewsAPI = (): Promise<APIRes> => request.get('/api/v1/get-news')

/**
 * /api/v1/all-games/save-forums
 * @param genreId
 * @param gameId
 */
export const saveForumsAPI = (): Promise<APIRes> => request.post('/api/v1/all-games/save-forums')

/**
 * /api/v1/all-games/favorite-games
 */
export const getForumsAPI = (): Promise<APIRes> => request.get('/api/v1/all-games/favorite-games')

/**
 * /api/v1/all-games/home-game-images
 */
export const getHomeGameImagesAPI = (): Promise<APIRes> => request.get('/api/v1/all-games/home-game-images')

/**
 * /api/v1/all-games-genres/genre/home-merged
 * @param type
 */
export const homeMergedAPI = (params: HomeMergedReq): Promise<APIRes> => request.post('/api/v1/all-games-genres/genre/home-merged', params)
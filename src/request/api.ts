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
 * @method GET
 */
export const returnAllGamesAPI = (): Promise<APIRes> => request.get('/api/v1/all-games')

/**
 * returnAllGamesWithGenre
 * @method GET
 */
export const returnAllGamesWithGenreAPI = ():Promise<APIRes> => request.get('/api/v1/all-games/3')

/**
 * @url returnAllGamesGenres
 * @method GET
 */
export const returnAllGamesGenresAPI = (): Promise<APIRes> => request.get('/api/v1/all-games-genres')


/**
 * @url /api/v1/get-news
 * @method GET
 */
export const getNewsAPI = (): Promise<APIRes> => request.get('/api/v1/get-news')

/**
 * @url /api/v1/all-games/save-forums
 * @param genreId
 * @param gameId
 * @method POST
 */
export const saveForumsAPI = (): Promise<APIRes> => request.post('/api/v1/all-games/save-forums')

/**
 * @url /api/v1/all-games/favorite-games
 * @method GET
 */
export const getForumsAPI = (): Promise<APIRes> => request.get('/api/v1/all-games/favorite-games')

/**
 * @url /api/v1/all-games/home-game-images
 * @method GET
 */
export const getHomeGameImagesAPI = (): Promise<APIRes> => request.get('/api/v1/all-games/home-game-images')

/**
 * @url /api/v1/all-games-genres/genre/home-merged
 * @param type
 * @method POST
 */
export const homeMergedAPI = (params: HomeMergedReq): Promise<APIRes> => request.post('/api/v1/all-games-genres/genre/home-merged', params)

/**
 * search-forums
 * @url /api/v1/search-forums
 * @param type
 * @param keyword
 * @method POST
 */
export const searchForumsAPI = (params: SearchForumsReq): Promise<APIRes> => request.post('/api/v1/search-forums', params)

/**
 * @url /api/v1/all-games-genres/posts/
 * @param genre
 * @param game
 * @method GET
 */
export const getAllPostOneGameAPI = (params: any): Promise<APIRes> => request.get('/api/v1/all-games-genres/posts/', { params })

/**
 * Get One Game Info
 * @url /api/v1/all-games/game-info
 * @param genreId
 * @param gameId
 * @method POST
 */
export const gameInfoAPI = (params: GameInfoReq): Promise<APIRes> => request.post('/api/v1/all-games/game-info', params)
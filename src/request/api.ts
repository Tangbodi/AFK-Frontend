import request from './index.tsx'

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
export const getUserInfoAPI = (): Promise<APIRes> => request.get('/api/v1/user-info/')

/**
 * /api/v1/user-info/mail-address
 */
export const getMailAddressAPI = (): Promise<APIRes> => request.get('/api/v1/user-info/mail-address')

/**
 * update email address
 * @param params email
 */
export const updateEmailAPI = (params: UpdateEmailAddressReq): Promise<APIRes> => request.put('/api/v1/user-info/update-email', params)

/**
 * updateMailAddress
 * @param params country
 * @param params state
 * @param params address
 * @param params city
 * @param params zip
 * @param params phone
 */
export const updateMailAddressAPI = (params: UpdateMailAddressReq): Promise<APIRes> => request.put('/api/v1/user-info/update-mail-address', params)

/**
 * returnAllGames
 * @method GET
 */
export const returnAllGamesAPI = (): Promise<APIRes> => request.get('/api/v1/all-games/')

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
export const getNewsAPI = (params: GetNewsReq): Promise<APIRes> => request.get('/api/v1/all-game-news', { params })

/**
 * /api/v1/game-news
 */
export const getOneGameNewsAPI = (params: GetNewsReq): Promise<APIRes> => request.get('/api/v1/game-news-list', { params })

/**
 * /api/v1/game-news
 */
export const getNewsDetailAPI = (params: GetNewsDetailReq): Promise<APIRes> => request.get('/api/v1/game-news', {params})
/**
 * @url /api/v1/all-games/save-forums
 * @param genreId
 * @param gameId
 * @method POST
 */
export const saveForumsAPI = (): Promise<APIRes> => request.post('/api/v1/all-games/save-forums')

/**
 * @url /api/v1/all-games/saved-games
 * @method GET
 */
export const getForumsAPI = (): Promise<APIRes> => request.get('/api/v1/all-games/saved-games')

/**
 * @url /api/v1/all-games/home-game-images
 * @method GET
 */
export const getHomeGameImagesAPI = (): Promise<APIRes> => request.get('/api/v1/all-games/home-game-images')

/**
 * @url /api/v1/all-games-genres/genre/latest-popular-newest
 * @param type
 * @method POST
 */
export const homeMergedAPI = (params: HomeMergedReq): Promise<APIRes> => request.post('/api/v1/all-games-genres/genre/latest-popular-newest', params)

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
 * @url /api/v1/all-games-genres/game-info
 * @param genre
 * @param game
 * @method POST
 */
export const gameInfoAPI = (params: GameInfoReq): Promise<APIRes> => request.get('/api/v1/all-games-genres/game-info',{ params })

/**
 * @name saveGames
 * @url /api/v1/all-games/save-game
 * @param genreId
 * @param gameId
 * @method POST
 */
export const saveGamesAPI = (params: SaveGamesReq): Promise<APIRes> => request.post('/api/v1/all-games/save-game', params)

/**
 * /api/v1/all-games-genres/save-post-image
 * @url /api/v1/all-games-genres/save-post-image
 * @method post
 */
export const savePostImageAPI = (params: any): Promise<APIRes> => request.post('/api/v1/all-games-genres/save-post-image', params, {
  headers: {'Content-Type': 'multipart/form-data'}
})

/**
 * Save-post
 * @url /api/v1/all-games-genres/save-post
 * @param gameId
 * @param genreId
 * @param title
 * @param textRender
 * @param postImageNameList
 */
export const savePostAPI = (params: SavePostReq): Promise<APIRes> => request.post('/api/v1/all-games-genres/save-post', params)

/**
 * showPostBody
 * @url /api/v1/all-games-genres/post-body
 * @param genre
 * @param game
 * @post 
 * @method GET
 */
export const showPostBodyAPI = (params: ShowPostBodyReq): Promise<APIRes> => request.get('/api/v1/all-games-genres/post-body',{ params })

/**
 * Get All Comments And Replies By PostId
 * @url /api/v1/all-games-genres/comments-replies
 * @param genre
 * @param game
 * @post 
 * @method GET
 * 
 */
export const commentsRepliesAPI = (params: CommentsRepliesReq): Promise<APIRes> => request.get('/api/v1/all-games-genres/comments-replies',{ params })

/**
 * User Likes/Saves Post
 * @url /api/v1/all-games-genres/genre/user-like-save
 * @param objectId
 * @param typeId 0=post, 1=comment, 2=reply, 3=post save
 * @param status 0=不喜欢 1=喜欢
 */
export const likeSavePostAPI = (params: LikeSavePostReq): Promise<APIRes> => request.post('/api/v1/all-games-genres/genre/user-like-save',params)

/**
 * Edit Comment
 * @url /api/v1/all-games-genres/edit-comment
 * @param genreId
 * @param gameId
 * @param postId
 * @param toUid
 * @param content
 */
export const editCommentAPI = (params: EditCommentReq): Promise<APIRes> => request.post('/api/v1/all-games-genres/edit-comment',params)

/**
 * Edit Reply
 * @url /api/v1/all-games-genres/edit-reply
 * @param genreId
 * @param gameId
 * @param postId
 * @param toUid
 * @param content
 * @param commentId
 * @param toReplyId
 */
export const editReplyAPI = (params: EditReplyReq): Promise<APIRes> => request.post('/api/v1/all-games-genres/edit-reply',params)

/**
 * /api/v1/user-info/update-password
 * @url /api/v1/user-info/update-password
 * @param oldPassword
 * @param newPassword
 * @param confirmPassword
 */

export const updatePasswordAPI = (params: UpdatePasswordReq) : Promise<APIRes> => request.put('/api/v1/user-info/update-password',params)

/**
 * /api/v1/user-info/forgot-password
 * @url /api/v1/user-info/forgot-password
 * @param email 
 */
export const forgotPasswordAPI = (params: ForgotPasswordReq): Promise<APIRes> => request.post('/api/v1/user-info/forgot-password',params)

/**
 * /api/v1/user-info/forgot-password/enter-password
 * @url /api/v1/user-info/forgot-password/enter-password
 * @param newPassword
 * @param confirmPassword
 */
export const enterPasswordAPI = (params: ForgotPasswordReq): Promise<APIRes> => request.put('/api/v1/user-info/forgot-password/enter-password',params)

/**
 * /api/v1/user-info/unread-message
 */
export const unreadMessageAPI = (): Promise<APIRes> => request.get('/api/v1/user-info/unread-message')

/**
 * /api/v1/user-info/mark-all-as-read
 */
export const markAllAPI = (): Promise<APIRes> => request.put('/api/v1/user-info/mark-all-as-read')

/**
 * /api/v1/user/setting
 */
export const getUserSettingAPI = (): Promise<APIRes> => request.get('/api/v1/user/setting')

/**
 * /api/v1/user/setting
 */
export const updateUserSettingAPI = (params): Promise<APIRes> => request.put('/api/v1/user/setting', params)
const REST_API_KEY = process.env.REACT_APP_REST_API_KEY
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID
const NAVER_REDIRECT_URI = process.env.REACT_APP_REDIRECT_NAVER_URI
const STATE_STRING = process.env.REACT_APP_STATE_STRING

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${STATE_STRING}`;
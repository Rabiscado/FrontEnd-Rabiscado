import { decodeToken as jwtDecodeToken } from 'react-jwt'

export const decodeToken = <T> (token: string): T => {
  const decodedToken = jwtDecodeToken(token)
  // const decodedToken = token
  return decodedToken as T
}

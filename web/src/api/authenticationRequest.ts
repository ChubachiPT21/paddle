import { IAuthentication } from '../type'
import axios from '../http/axios'

const authenticationRequest = {
  signUp: (user: IAuthentication) => {
    return axios.post<any>(`/v1/signup`, {
      email: user.email,
      password: user.password,
    })
  },
  signIn: (user: IAuthentication) => {
    return axios.post<any>(`/v1/signin`, {
      email: user.email,
      password: user.password,
    })
  },
}

export default authenticationRequest

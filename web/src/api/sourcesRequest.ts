import { ISource } from 'src/type'
import axios from 'src/http/axios'

const sourcesRequest = {
  fetchSources: () => {
    return axios.get<ISource[]>(`/v1/sources`)
  },
  createSource: (url: string, title: string) => {
    return axios.post<any>(`/v1/sources`, { url, title })
  },
}

export default sourcesRequest

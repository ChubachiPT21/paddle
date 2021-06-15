import { ISource } from 'src/type'
import axios from 'src/http/axios'

const sourcesRequest = {
  fetchSources: () => {
    return axios.get<ISource[]>(`/v1/sources`)
  },
  createSource: (url: string) => {
    return axios.post<any>(`/v1/sources`, { url })
  },
  deleteSource: (sourceId: number) => {
    return axios.delete<any>(`/v1/sources/${sourceId}`)
  },
}

export default sourcesRequest

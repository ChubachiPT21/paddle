import { ISource, IRss } from 'src/type'
import axios from 'src/http/axios'

const sourcesRequest = {
  fetchSources: () => {
    return axios.get<ISource[]>(`/v1/sources`)
  },
  createSource: (rss: IRss) => {
    return axios.post<any>(`/v1/sources`, {
      url: rss.url,
      title: rss.title,
    })
  },
}

export default sourcesRequest

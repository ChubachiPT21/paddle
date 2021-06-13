import axios from 'src/http/axios'

const previewRequest = {
  fetchRss: (url: string) => {
    return axios.post<any>(`/v1/preview`, { url })
  },
}
export default previewRequest

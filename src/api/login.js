import axios from 'axios'
export function login (param) {
  const url = '/api/login'
  return axios({
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: param
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

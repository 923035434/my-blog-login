import axios from 'axios'
export function login (form) {
  const url = '/api/login'
  return axios({
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: form
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

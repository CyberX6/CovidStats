export const ifetch = (url, { options = {}, authToken = '' } = {}) =>
  fetch(url, {
    method: 'GET',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      ...options.headers
    }
  })

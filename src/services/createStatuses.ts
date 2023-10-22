export const createStatuses = async(bodyData: BodyInit) => {
  const res = await fetch('/api/statuses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: bodyData,
  })
  const resData = await res.json()

  return resData
}

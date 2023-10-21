export const putStatuses = async(bodyData: BodyInit) => {
  const res = await fetch('/api/statuses', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: bodyData,
  })
  const resData = await res.json()

  return resData
}

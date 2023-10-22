export const createUserInfo = async(bodyData: BodyInit) => {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: bodyData,
  })
  const resData = await res.json()

  return resData
}

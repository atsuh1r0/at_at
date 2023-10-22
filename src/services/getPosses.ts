export const getPosses = async() => {
  const posses = await fetch('/api/posses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const possesJson = await posses.json()
  const possesData = possesJson.data

  return possesData;
}

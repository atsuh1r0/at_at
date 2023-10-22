export const getGenerations = async() => {
  const generations = await fetch('/api/generations', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const generationsJson = await generations.json()
  const generationsData = generationsJson.data

  return generationsData;
}

export const getPlaces = async() => {
  const places = await fetch('/api/places', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const placesJson = await places.json()
  const placesData = placesJson.data

  return placesData;
}

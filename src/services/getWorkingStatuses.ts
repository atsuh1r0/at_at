export const getWorkingStatuses = async() => {
  const workingStatuses = await fetch('/api/working_statuses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const workingStatusesJson = await workingStatuses.json()
  const workingStatusesData = workingStatusesJson.data

  return workingStatusesData;
}

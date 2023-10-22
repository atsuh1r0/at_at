export const getUsersWithTodayStatuses = async() => {
  const today = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }).slice(0, 10).replace(/\//g, '-');

  const users = await fetch('/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const usersJson = await users.json()
  const usersData = usersJson.data

  const statuses = await fetch('/api/statuses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const statusesJson = await statuses.json()
  const statusData = statusesJson.data

  // usersDataに対応するtodayが今日の日付のstatusesレコードがある場合はそのレコードを追加、ない場合は空の配列を追加
  usersData.forEach((user: any) => {
    if(!statusData) {
      user.statuses = [];
    } else {
      const todayStatus = statusData.filter((status: any) => {
        return status.date === today && status.user_id === user.id
      });

      if(todayStatus?.length !== 0) {
        user.statuses = todayStatus;
      } else {
        user.statuses = [];
      }
    }
  });

  return usersData;
}

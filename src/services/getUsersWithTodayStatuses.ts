export const getUsersWithTodayStatuses = async() => {
  // 1日が01となるようにする
  const today = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  const dateParts = today.split(' ')[0].split('/');
  const formattedDate = `${dateParts[0]}-${dateParts[1].padStart(2, '0')}-${dateParts[2].padStart(2, '0')}`;

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
        return status.date === formattedDate && status.user_id === user.id
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

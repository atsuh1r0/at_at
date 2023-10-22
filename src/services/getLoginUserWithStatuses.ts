import { getAuthSession } from "./getAuthSession";

export const getLoginUserWithStatuses = async() => {
  const today = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }).slice(0, 10).replace(/\//g, '-');
  const sessionData = await getAuthSession();
  const uuid = sessionData?.user.id;

  if(!uuid) {
    return null;
  }

  const user = await fetch(`/api/users/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const userJson = await user.json()
  const userData = userJson.data
  if(userJson.error || userData.length == 0) return null

  const statuses = await fetch('/api/statuses', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const statusesJson = await statuses.json()
  const statusData = statusesJson.data

  // userDataに対応するtodayが今日の日付のstatusesレコードがある場合はそのレコードを追加、ない場合は空の配列を追加
  userData.forEach((user: any) => {
    const todayStatus = statusData.filter((status: any) => {
      return status.date === today && status.user_id === user.id
    });

    if(todayStatus?.length !== 0) {
      user.statuses = todayStatus;
    } else {
      user.statuses = [];
    }
  });

  return userData;
}

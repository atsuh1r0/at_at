'use server'

export const sendLineNotification = async (message: string): Promise<void> => {
  const accessToken = process.env.NEXT_PUBLIC_LINE_NOTIFY_ACCESS_TOKEN
  const url = 'https://notify-api.line.me/api/notify'

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken}`,
      },
      body: `message=${message}`,
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
  } catch (error) {
    console.error('LINE Notify API error:', error)
  }
}

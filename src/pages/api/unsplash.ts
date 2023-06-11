import type { NextApiHandler } from 'next'
import { createApi } from 'unsplash-js';

if (!process.env.UNSPLASH_API_KEY) {
  throw new Error('Unsplash API key must be set')
}

const serverApi = createApi({
  accessKey: process.env.UNSPLASH_API_KEY,
})

const unsplashHandler: NextApiHandler = async (_, response) => {
  const res = await serverApi.photos.list({})
  response.json(res.response)
}

export default unsplashHandler

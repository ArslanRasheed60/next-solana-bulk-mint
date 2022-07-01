// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import crypto from 'crypto'
import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

interface ILoginResponse extends NextApiResponse {
  nonce: string
}

export default function handler(req: NextApiRequest, res: ILoginResponse) {
  if (req.method === 'GET') {
    const nonce = crypto.randomBytes(32).toString('base64')

    res.setHeader('Set-Cookie', serialize('auth-nonce', nonce, { httpOnly: true, sameSite: 'strict', secure: true }))

    return res.status(200).json({ nonce })
  }

  res.status(405)
}

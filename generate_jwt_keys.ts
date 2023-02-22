import * as fs from 'node:fs'
import * as crypto from 'node:crypto'

const options = { format: 'pem', type: 'pkcs1' } as const

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 512 })

const puk = publicKey.export(options)
const prk = privateKey.export(options)

fs.writeFileSync('./jwt_public.pem', puk, 'utf-8')
fs.writeFileSync('./jwt_private.pem', prk, 'utf-8')

console.log('Generated keys')

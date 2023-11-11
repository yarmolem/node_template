import { type Readable } from 'stream'

export async function streamToBuffer(stream: Readable): Promise<Buffer> {
  return await new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>()
    stream.on('data', (chunk) => {
      _buf.push(chunk)
    })

    stream.on('end', () => {
      resolve(Buffer.concat(_buf))
    })

    stream.on('error', (err) => {
      reject(new Error(`error converting stream - ${err.message}`))
    })
  })
}

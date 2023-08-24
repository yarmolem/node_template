import type { Readable } from 'stream'

export async function streamToBuffer(stream: Readable): Promise<Buffer> {
  return await new Promise<Buffer>((resolve, reject) => {
    const data: any[] = []

    stream.on('data', (chunk) => {
      data.push(chunk)
    })

    stream.on('close', () => {
      resolve(Buffer.concat(data))
    })

    stream.on('error', () => {
      reject(new Error('Error streaming data'))
    })
  })
}

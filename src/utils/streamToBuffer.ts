import internal from 'stream'

export async function streamToBuffer(stream: internal.Readable): Promise<Buffer> {
  const data: any[] = []
  for await (const chunk of stream) data.push(chunk)
  return Buffer.concat(data)
}

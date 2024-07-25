import tdengine from '@tdengine/rest'
import { tdengineCloudUrl, tdengineCloudToken } from '../config.js'

tdengine.options.url = tdengineCloudUrl
tdengine.options.query = { token: tdengineCloudToken }

const conn = tdengine.connect(tdengine.options)
const cursor = conn.cursor()

export async function query(sql) {
  const result = await cursor.query(sql)
  const data = result.getData()
  const columns = result.getMeta()

  if (!data) {
    return []
  }

  return data.map((r) => {
    const res = {}
    r.forEach((c, idx) => {
      let columnName = columns[idx].columnName
      if (columnName.startsWith('last_row')) {
        columnName = columnName.replace('last_row(', '').replace(')', '')
      }
      if (c !== null) {
        res[columnName] = c
      }
    })
    return res
  })
}

const { MongoClient, ServerApiVersion } = require('mongodb');
const ip = process.env.MONGODB_IP
const port = process.env.MONGODB_PORT
const id = process.env.MONGODB_ID
const pw = process.env.MONGODB_PASSWORD
const uri = `mongodb://${id}:${pw}@${ip}:${port}/`

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}
let connectDB

/* 
 * Next.js 개발 시 js 파일을 수정하면 모든 js 파일을 전부 다시 읽고 지나가므로 DB 초기화를 계속 할 것임 
 * 이를 막기 위한 코드
 */
if (process.env.Node_ENV === 'development') {
  if(!global._mongo) {
    global._mongo = new MongoClient(uri, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(uri, options).connect()
}

export { connectDB }
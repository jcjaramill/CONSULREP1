const mongoose = require('mongoose');

const username = 'user_mongo'
const password = 'dobleq3'
const dbname = 'dev'
const string_connection = `mongodb://mongo_user:dobleq3@mongo_cont:27017/dev?authSource=admin`

try{
  mongoose.connect(string_connection) 
  console.log('connected to database ' + dbname)
}catch(error){
  console.log(error)
}
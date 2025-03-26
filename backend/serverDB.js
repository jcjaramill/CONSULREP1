const mongoose = require('mongoose');

const username = 'user_mongo'
const password = 'dobleq3'
const dbname = 'electronica'
const string_connection = `mongodb://mongo_user:dobleq3@mongo_cont:27017/data?authSource=admin`

try{
  mongoose.connect(string_connection) 
  console.log('connected to database ' + dbname)
}catch(error){
  console.log(error)
}
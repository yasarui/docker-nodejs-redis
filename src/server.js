import express from 'express'
import { createClient } from 'redis';

//Ini app
const app = express();
const port = process.env.PORT || 3000;
const client = createClient({
   url:'redis://redis-server:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.set('visits', 0);

app.get('/',async (req,res)=>{
  const value = await client.get('visits');
  res.status(200).send(`This application has been visited ${value} times`);
  await client.set('visits', parseInt(value +1));
})

app.listen(port,()=>{
  console.log(`server is up and running on port ${port}`);
})
const express = require('express')
const {open} = require('sqlite')
const path = require('path')
const sqlite3 = require('sqlite3')
const app = express()
app.use(express.json())

let db = null
let dbpath = path.join(__dirname, 'cricketTeam.db')
const intializeandstart = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server started')
    })
  } catch (e) {
    console.log(`${e.message}`)
    process.exit(1)
  }
}
intializeandstart()
app.get('/players/', async (request, response) => {
  const dbquery = `
    select * from cricket_team;
    `
  const result = await db.all(dbquery)
  response.send(result)
})
app.post('/players/', async (request, response) => {
  const body = request.body
  const {player_name, jersey_number, role} = body
  const dbquery2 = `
    insert into cricket_team (player_name, jersey_number,role) values
    (
      "${player_name}",
      "${jersey_number}",
      "${role}"
    );
    `
  const result2 = await db.run(dbquery2)
  response.send(`Player Added to Team`)
})
app.get('/players/:playerId/', async (request, response) => {
  const playerid = request.params
  const {playerId} = playerid
  const dbquery3 = `
    select * from cricket_team where player_id=${playerId} ;
    `
  const result3 = await db.get(dbquery3)
  response.send(result3)
})
app.put('/players/:playerId/', async (request, response) => {
  const parameter = request.params
  const body4 = request.body
  const {playerId} = parameter
  const {player_name, jersey_number, role} = body4
  const db4 = `update cricket_team set
     player_name=${player_name},
     jersey_number=${jersey_number},
     role=${role};
     `
  const result5 = await db.run(db4)
  reponse.send(`Player Details Updated`)
})
app.delete('/players/:playerId/', async (request, response) => {
  const playerid2 = request.params
  const {playerId} = playerid2
  const dbquery5 = `
    delete from cricket_team where player_id=${playerId} ;
    `
  const result3 = await db.run(dbquery5)
  response.send(`Player Removed`)
})
module.exports = app;

const promise = require('bluebird')
const pgPromise = require('pg-promise')
const dbConfig = require('./db-config.json')
const sql = require('./sql')
const { FishableWaters, Spatial } = require('./repos')

const initOptions = {
  promiseLib: promise,

  extend(obj, dc) {
    obj.fishableWaters = new FishableWaters(obj, pgp)
    obj.spatial = new Spatial(obj, pgp)
  }
}

const pgp = pgPromise(initOptions)
const db = pgp(dbConfig)

module.exports = { db, pgp, sql }
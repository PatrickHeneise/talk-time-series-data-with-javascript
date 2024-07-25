import { query } from './tdengine.js'

export async function getLastRow() {
  return query('select last_row(*) from renewables.solarfarms;')
}

export async function getDailyOutput() {
  return query(
    'select ts,poweroutput_kw from renewables.solarfarms where ts > now() - 15m;'
  )
}

export async function getAverages() {
  return query(
    'select string, avg(poweroutput_kw) from renewables.solarfarms where site = "solarfarma" partition by string;'
  )
}

export async function getDailyAverages() {
  return query(
    'select _wstart, string, avg(poweroutput_kw) from renewables.solarfarms where site = "solarfarma" and ts > now() - 12h partition by string interval(1h);'
  )
}

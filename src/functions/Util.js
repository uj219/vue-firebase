import moment from 'moment'

// -------------------------------------------------------
// タイムスタンプの取得
// -------------------------------------------------------
export function getTimeStampCreated (userId) {
  const timestamp = moment().format()
  const uid = userId
  return {
    _created_at: timestamp,
    _created_by: uid,
    _updated_at: timestamp,
    _updated_by: uid
  }
}

export function getTimeStampUpdated (userId) {
  const timestamp = moment().format()
  const uid = userId
  return {
    _updated_at: timestamp,
    _updated_by: uid
  }
}

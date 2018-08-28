import * as Util from './Util'
import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '../api_keys/firebase'

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const provider = new firebase.auth.GoogleAuthProvider()

// -------------------------------------------------------
// ログイン(google)
// -------------------------------------------------------
export function login () {
  return firebase.auth().signInWithPopup(provider)
    .then((result) => {
      return result
    }).catch((error) => {
      return {
        color: 'error',
        text: error
      }
    })
}

// -------------------------------------------------------
// ログアウト
// -------------------------------------------------------
export function logout () {
  return firebase.auth().signOut()
}

// -------------------------------------------------------
// カレントユーザーの取得
// -------------------------------------------------------
export function getCurrentUser () {
  return firebase.auth().currentUser
}

// -------------------------------------------------------
// ユーザーの追加
// -------------------------------------------------------
export function addUserFiresotre (userId) {
  const data = Util.getTimeStampCreated(userId)
  return db.collection('users').doc(userId).set(data)
}

// -------------------------------------------------------
// ユーザーのお気に入り取得
// -------------------------------------------------------
export function getUserFavFirestore (userId) {
  return db.collection('users').doc(userId).collection('fav').get()
    .then((querySnapshot) => {
      return querySnapshot
    }).catch((error) => {
      return error
    })
}

// -------------------------------------------------------
// リストの取得(フィルタ機能あり)
// -------------------------------------------------------
export function getListFirestore () {
  return db.collection('restaurants').get()
    .then((querySnapshot) => {
      return querySnapshot
    }).catch((error) => {
      return {
        color: 'error',
        text: error
      }
    })
}

// -------------------------------------------------------
// アイテムの取得
// -------------------------------------------------------
export function getItemFirestore (id) {
  return db.collection('restaurants').doc(id).get()
    .then((doc) => {
      return doc
    }).catch((error) => {
      return error
    })
}

// -------------------------------------------------------
// アイテムのお気に入りの取得
// -------------------------------------------------------
export function getItemUserFavFirestore (id) {
  return db.collection('restaurants').doc(id).collection('userFav').get()
    .then((querySnapshot) => {
      return querySnapshot
    }).catch((error) => {
      return {
        color: 'error',
        text: error
      }
    })
}

// -------------------------------------------------------
// アイテムの追加
// -------------------------------------------------------
export function addItemFirestore (itemObj, userId) {
  const itemData = Object.assign({
    name: itemObj.name,
    logo_image: itemObj.logo_image,
    name_kana: itemObj.name_kana,
    address: itemObj.address,
    station_name: itemObj.station_name,
    middle_area: itemObj.middle_area,
    lat: itemObj.lat,
    lng: itemObj.lng,
    genre: itemObj.genre,
    food: itemObj.food,
    catch: itemObj.catch,
    photo: itemObj.photo
  }, Util.getTimeStampCreated(userId))

  const docRef = db.collection('restaurants').doc(itemObj.id)

  return getItemFirestore(itemObj.id)
    .then((doc) => {
      if (doc.exists) {
        return {
          color: 'warning',
          text: '既に登録済みです'
        }
      } else {
        return docRef.set(itemData)
          .then(() => {
            return {
              color: 'success',
              text: '登録完了しました'
            }
          }).catch((error) => {
            return {
              color: 'error',
              text: error
            }
          })
      }
    }).catch((error) => {
      return {
        color: 'error',
        text: error
      }
    })
}

// -------------------------------------------------------
// お気に入りに追加（一括書き込み）
// -------------------------------------------------------
export function addFavFirestore (itemId, userId) {
  const batch = db.batch()

  // アイテム側
  const itemRef = db.collection('restaurants').doc(itemId).collection('userFav').doc(userId)
  batch.set(itemRef, {isFav: true})

  // ユーザー側
  const userRef = db.collection('users').doc(userId).collection('fav').doc(itemId)
  batch.set(userRef, {isFav: true})

  return batch.commit()
}

// -------------------------------------------------------
// お気に入りに削除（一括書き込み）
// -------------------------------------------------------
export function deleteFavFirestore (itemId, userId) {
  const batch = db.batch()

  // アイテム側
  const itemRef = db.collection('restaurants').doc(itemId).collection('userFav').doc(userId)
  batch.delete(itemRef)

  // ユーザー側
  const userRef = db.collection('users').doc(userId).collection('fav').doc(itemId)
  batch.delete(userRef)

  return batch.commit()
}

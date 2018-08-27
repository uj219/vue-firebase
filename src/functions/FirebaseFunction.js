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
// ユーザー取得(firestoreの方から)
// -------------------------------------------------------
export function getUserFirestore (userId) {
  return db.collection('users').doc(userId).get()
    .then((doc) => {
      return doc
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
// お気に入りに追加
// -------------------------------------------------------
// 複数のドキュメントから取得・更新するのでトランザクションを使用
export function toggleFavFirestore (bool, itemId, userId) {
  // アイテム側
  const itemRef = db.collection('restaurants').doc(itemId)
  let itemData = {}
  itemData[userId] = bool

  // ユーザー側
  const userRef = db.collection('users').doc(userId)
  let userData = {}
  userData[itemId] = bool

  return db.runTransaction(async (transaction) => {
    const [itemDoc, userDoc] = await Promise.all([
      transaction.get(itemRef),
      transaction.get(userRef)
    ])

    if (typeof itemDoc.data().userFav !== 'undefined') {
      itemData = Object.assign(itemDoc.data().userFav, itemData)
    }
    transaction.update(itemRef, {userFav: itemData})

    if (typeof userDoc.data().fav !== 'undefined') {
      userData = Object.assign(userDoc.data().fav, userData)
    }
    transaction.update(userRef, {fav: userData})
  })
}

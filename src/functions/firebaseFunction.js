import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '../api_keys/firebase'

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

// -------------------------------------------------------
// リストの取得(フィルタ機能あり)
// -------------------------------------------------------
export function getListFirestore () {

}

// -------------------------------------------------------
// アイテムの取得
// -------------------------------------------------------
export function getItemFirestore () {

}

// -------------------------------------------------------
// アイテムの追加
// -------------------------------------------------------
export function addItemFirestore (itemObj) {
  const itemData = {
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
  }

  const docRef = db.collection('restaurants').doc(itemObj.id)

  return docRef.get()
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
// アイテムの削除
// -------------------------------------------------------
export function deleteItemFirestore () {

}

// -------------------------------------------------------
// お気に入りに追加
// -------------------------------------------------------
export function favItemFirestore () {

}

// -------------------------------------------------------
// お気に入りから削除
// -------------------------------------------------------
export function unFavItemFirestore () {

}

// -------------------------------------------------------
// ユーザー追加
// -------------------------------------------------------
export function addUserFirestore () {

}

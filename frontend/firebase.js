import { getStorage } from '@firebase/storage'
import { initializeApp } from '@firebase/app'
import { getAnalytics } from '@firebase/analytics'
const firebaseConfig = {
  apiKey: 'AIzaSyCJF6SgRjYORQbEhe2ek-332Z8chKv5D2E',
  authDomain: 'chat-app2-be31e.firebaseapp.com',
  projectId: 'chat-app2-be31e',
  storageBucket: 'chat-app2-be31e.appspot.com',
  messagingSenderId: '625810726107',
  appId: '1:625810726107:web:50f26ed8f768c7428480fe',
  measurementId: 'G-YNM9MGMWLC',
}
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
const analytics = getAnalytics(app)

# fireStoreのルール

fireStoreでは接続の権限をルールを使って制限することができる


```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null; //認証必須
    }
  }
}
```

4行目のif文に条件を記述して接続の可否を設定できる

trueにすればすべて許可することができる

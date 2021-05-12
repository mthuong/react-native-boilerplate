# ⭐ React Native Boilerplate

> My favorite React Native template for a quick start with TypeScript.

<!-- Dependencies -->
<details close>
  <summary>Dependencies</summary>
  <ul>
    <li>
      <a href="https://github.com/luggit/react-native-config">React Native Config</a>
    </li>
    <li>
      <a href="https://reactnavigation.org/docs/getting-started">React Navigation v5</a>
    </li>
    <li>
      <a href="https://github.com/infinitered/reactotron">Reactotron</a>
    </li>
    <li>
      <a href="https://redux-toolkit.js.org/">Redux toolkit</a>
    </li>
    <li>
      <a href="https://rnfirebase.io/">Firebase Crashlytics</a>
    </li>
    <li>
      <a href="https://github.com/axios/axios">Axios</a>
    </li>
    <li>
      <a href="https://github.com/DylanVann/react-native-fast-image">React Native Fast Image</a>
    </li>
    <li>
      <a href="https://github.com/tleunen/babel-plugin-module-resolver#readme">Module Resolver</a>
    </li>
    <li>
      <a href="https://github.com/stefalda/ReactNativeLocalization">Localize the ReactNative interface</a>
    </li>
    <li>
      <a href="https://github.com/formium/formik">Formik Build forms in React, without the tears</a>
    </li>
    <li>
      <a href="https://github.com/maphongba008/rn-scaled-sheet">React Native multi screen size support</a>
    </li>
    <li>
      <a href="https://icomoon.io/">Icomoon</a>
    </li>
  </ul>
</details>

## Features

<details close><summary><b>Show features</b></summary>
  
|             🇻🇳             |     🔰 Status     |
| -------------------------- | :----------------: |
| Navigation                 |         ✅        |
| Login - Sign up            |         ✅        |
| Authenticaion flows        |         ✅        |
| Theme                      |         ✅        |
| Localization               |         ✅        |
| Custom fonts               |         ✅        |
| Localization               |         ✅        |

</details>

<!-- GETTING STARTED -->
## Getting Started

### Firebase setup

<details close><summary><b>Show instructions</b></summary>

* iOS
  
  Add GoogleService-Info.plist for each environment 
  
  ```sh
  ios/<project>/Firebase
  ```
 
* Android

  Add google-service.json for each environment
  
  ```sh
  android/app/firebase
  ```
  
</details>
  
### Firestore setup for Chat function

<details close><summary><b>Show instructions</b></summary>

1. Structure 
+ User

![image](https://user-images.githubusercontent.com/1086057/118006026-1c2a1e80-b375-11eb-8cba-094d8a3821ec.png)

![image](https://user-images.githubusercontent.com/1086057/118006057-221fff80-b375-11eb-818a-4ed6f3d6ee9b.png)

+ Conversations

![image](https://user-images.githubusercontent.com/1086057/118006092-2ba96780-b375-11eb-97bf-a45bb9c3b01c.png)

![image](https://user-images.githubusercontent.com/1086057/118006111-2fd58500-b375-11eb-9d0a-19a1f5fd97cf.png)

2. Firestore rules

```ruby
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{user_id} {
      allow read: if request.auth != null;
      
      allow write: if request.auth.uid == user_id;
      
      match /conversations/{document=**} {
        allow read, write: if request.auth != null;
      }
    }

    match /conversations/{conversation_id} {
      allow read: if request.auth != null && request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversation_id)).data.userIds;
      allow write: if request.auth != null && request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversation_id)).data.userIds;
      
      match /messages/{document=**} {      
      	allow read, write: if request.auth != null && request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversation_id)).data.userIds;
    	}
    }
  }
}
```

</details>
 
### Icomoon

<details close><summary><b>Show instructions</b></summary>
  
1. Get iconmoon font at [https://icomoon.io/app/#/select](https://icomoon.io/app/#/select)
2. Select icons you need for your project

   ![image](https://user-images.githubusercontent.com/1086057/117854342-9abe8780-b2b3-11eb-8920-13f5879d10dd.png)

3. Download & extract font file

4. Copy into `src/components/Icon`

   ![image](https://user-images.githubusercontent.com/1086057/117854660-e709c780-b2b3-11eb-8bfb-9cb6a8aa1b05.png)

5. Update icon types

  ```sh
  yarn icons
  ```

6. Update font on Android + iOS

  ```ruby
  npx react-native link
  ```

</details>

### Fonts

<details close><summary><b>Show instructions</b></summary>

1. Add custom fonts you wish to use to 
```ruby
src/theme/fonts
```
2. Update font on Android + iOS
```ruby
npx react-native link
```
3. Update your font family at
```ruby
src/theme/fonts/index.tsx
```

</details>

### Storybook

<details close><summary><b>Show instructions</b></summary>
- Storybook - https://github.com/storybookjs/react-native -
</details>

<!-- CONTACT -->
## Contact

Thuong Nguyen - [@mthuong](https://twitter.com/mthuong) - mttbit@gmail.com

const images = {
  ic_close: require('./assets/ic_close.png'),
  ic_email: require('./assets/ic_email.png'),
  ic_guest: require('./assets/ic_guest.png'),
  ic_lock: require('./assets/ic_lock.png'),
  ic_message_send: require('./assets/ic_message_send.png'),
  ic_plus: require('./assets/ic_plus.png'),
  ic_tab_home: require('./assets/ic_tab_home.png'),
  ic_tab_profile: require('./assets/ic_tab_profile.png'),
  ic_tab_settings: require('./assets/ic_tab_settings.png')
}
export type ImageAssetTypes = keyof typeof images

export default images

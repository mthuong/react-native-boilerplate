const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const phone = /^[0-9]{10}$/

export default {
  passwordPattern: password,
  phonePattern: phone,
}

export type TUser = {
  uid: string
  name: string
  email: string
  createdAt: number
}

function userDisplayName(user: TUser) {
  return user.name
}

export const TUserFunc = {
  userDisplayName,
}

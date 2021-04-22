export type TUser = {
  id: string
  name: string
  email: string
  firstName: string
  lastName?: string
  createdAt: number
}

function userDisplayName(user: TUser) {
  return [user.firstName, user.lastName].filter((t) => !!t).join(' ')
}

export const TUserFunc = {
  userDisplayName,
}

export type CallBack = (data: any) => void

interface Event {
  type: string
  callback: CallBack
}

export const Keys = {
  ShowActionSheet: 'ShowActionSheet',
  ChangeTheme: 'ChangeTheme',
}

export default class EventEmitter {
  static _registerEvents: Array<Event> = []

  static notify = (type: string, data?: any) => {
    EventEmitter._registerEvents
      .filter(event => event.type === type)
      .forEach(event => {
        event.callback(data)
      })
  }

  static register = (type: string, callback: CallBack) => {
    EventEmitter._registerEvents.push({
      type,
      callback,
    })
  }

  static unregister = (callback: CallBack) => {
    const newArray = EventEmitter._registerEvents.filter(
      c => c.callback !== callback
    )
    EventEmitter._registerEvents = newArray
  }
}

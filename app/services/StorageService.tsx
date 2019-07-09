import AsyncStorage from "@react-native-community/async-storage";
import { deserialize, deserializeArray, serialize } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

class StorageService {

  async setItem(key: string, value: any): Promise<void> {
    const isObject = typeof value === "object",
      savedValue = isObject ? serialize(value) : value;
    await AsyncStorage.setItem(key, savedValue);
  }

  removeItem(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }

  async getObject(key: string): Promise<{[key: string]: any}|null> {
    const value = await AsyncStorage.getItem(key);
    if (value) 
      return JSON.parse(value);
    return null;
  }

  async getObjects(key: string): Promise<{[key: string]: any}[]> {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value || "[]");
  }

  async getGeneric<T>(cls: ClassType<T>, key: string): Promise<T|null> {
    const value = await AsyncStorage.getItem(key);
    if (value) 
      return deserialize(cls, value);
    return null;
  }

  async getGenerics<T>(cls: ClassType<T>, key: string): Promise<T[]> {
    const value = await AsyncStorage.getItem(key);
    if (value) 
      return deserializeArray(cls, value);
    return [];
  }
}

export const StorageKeys = {
  kMockAccounts: "kMockAccounts",
  kAuthUser: "kAuthUser",
  kFavourites: "kFavourites",
  kHasMockData: "kHasMockData",
  kCategories: "kCategories",
  kServices: "kServices",
  kServiceDeliveries: "kServiceDeliveries",
  kProviders: "kProviders",
  kSeekers: "kSeekers",
  kBookings: "kBookings",
  kNotificaitons: "kNotifications",
}

export const storageService = new StorageService();
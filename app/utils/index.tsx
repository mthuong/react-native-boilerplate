import moment, { Duration } from 'moment';
import { Dimensions, ScaledSize, Platform, PlatformIOSStatic } from 'react-native';
import { Header } from 'react-navigation';
import { Images, ApplicationFont } from '../constants';
import { theme } from '../themes';

export const ApiUrl = '';

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";

export const defaultNavigationOptions = {
  headerLayoutPreset: 'center',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerTitleStyle: {
    fontFamily: ApplicationFont.bold,
    fontSize: 20,
    color: theme.color.primary,
  },
}

export const screenSize = (): ScaledSize => {
  return Dimensions.get("screen");
}

export const windowSize = (): ScaledSize => {
  return Dimensions.get("window");
}

export const isIphoneX = () => {
  const dim = windowSize();

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&

    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export const isIPhoneXSize = (dim: ScaledSize): boolean => dim.height == 812 || dim.width == 812;
export const isIPhoneXrSize = (dim: ScaledSize): boolean => dim.height == 896 || dim.width == 896;

export const indexOf = <T extends any>(array: T[], where: (item: T) => boolean) => {
  const elements = array.filter(where);
  if (elements.length > 0)
    return array.indexOf(elements[0]);

  return -1;
}

export const delay = (timeout: number = 1000): Promise<void> => new Promise((resolve) => setTimeout(() => resolve(), timeout));

export const uuidv4 = () => {
  return 'xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const random = (min: number, max: number): number => Math.floor(Math.random() * (+max - +min)) + +min;
export const randomInArray = (arr: any[]): number => random(0, arr.length - 1);
export const formatNumber = (number: number) => (number ? number.toFixed(2) : '0.00')
export const rangeArray = (from: number, to: number) => {
  const res = [];
  for (let i = from; i < to; i++) {
    res.push(i);
  }
  return res;
}

export const urlQuery = (params: { [key: string]: any }): string => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return (value as any[]).map((v) => `${key}[]=${encodeURIComponent(v)}`).join("&");
      } else if (typeof value === "object") {
        const innerObj = value as { [key: string]: any }
        return Object.entries(innerObj).map(([k, v]) => `${key}[${k}]=${encodeURIComponent(v)}`).join("&");
      }
      return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    })
    .join('&');
}

export class Throttle {

  private timeout: any

  constructor(private interval: number = 500) { }

  run(callback: (() => void)): void {
    this.stop();
    this.timeout = setTimeout(() => {
      clearInterval(this.timeout);
      callback();
    }, this.interval);
  }

  stop(): void {
    if (this.timeout) clearTimeout(this.timeout);
  }
}

export const LANDSCAPE = 'landscape';
export const PORTRAIT = 'portrait';

export const getHeaderHeight = () => {
  let height;
  const orientation = getOrientation();
  height = getHeaderSafeAreaHeight();
  height += isIphoneX() && orientation === PORTRAIT ? 44 : 20;

  return height;
};

// This does not include the new bar area in the iPhone X, so I use this when I need a custom headerTitle component
export const getHeaderSafeAreaHeight = () => {
  const orientation = getOrientation();
  if (Platform.OS === 'ios' && orientation === LANDSCAPE) {
    const platformIOS = Platform as PlatformIOSStatic
    if (!platformIOS.isPad) {
      return 32;
    }
  }
  return Header.HEIGHT;
};

export const getOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width > height ? LANDSCAPE : PORTRAIT;
};

/**
 * Filters an array of objects with multiple criteria.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria as the property names
 * @return {Array}
 */
export const multiFilter = (arr: any[], filters: any) => {
  const filterKeys = Object.keys(filters);
  return arr.filter(eachObj => {
    return filterKeys.every(eachKey => {
      if (!filters[eachKey].length) {
        return true; // passing an empty filter means that filter is ignored.
      }
      return filters[eachKey].includes(eachObj[eachKey]);
    });
  });
};
import { StackActions, NavigationActions, NavigationContainerComponent } from 'react-navigation';

let _navigator: NavigationContainerComponent;
let _resolver: any;
let _isReady: boolean;

export interface NavigationOptions {
  key?: string
  params?: {}
}

class NavigationService {

  ready(): Promise<void> {
    return new Promise((resolve) => {
      if (_isReady) resolve();
      else _resolver = resolve;
    });
  }

  setNavigator(navigator?: NavigationContainerComponent): void {
    if (navigator) {
      _navigator = navigator;
      _isReady = true;
      _resolver && _resolver();
    }
  }

  reset(routeName: string): void {
    _navigator.dispatch(StackActions.reset({
      index: 0, 
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: routeName })
      ],
    }));
  }

  navigate(routeName: string, options?: NavigationOptions): void {
    const { key, params }: any = options || {};
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName: routeName,
        key: key || routeName,
        params: params
      })
    );
  }

  goBackToRoot(): void {
    _navigator.dispatch(StackActions.popToTop({}));
  }
  
  goBack(key?: string|null): boolean {
    return _navigator.dispatch(
      NavigationActions.back({
        key: key
      })
    );
  }
}

export const navigationService = new NavigationService();

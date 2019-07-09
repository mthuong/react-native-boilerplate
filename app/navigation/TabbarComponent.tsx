import { observer } from 'mobx-react';
import React from 'react';
import { BottomTabBar, BottomTabBarProps, TabScene } from 'react-navigation'; // need version 2.0 react-navigation of course... it comes preinstalled as a dependency of react-navigation.
import { AppProps } from '../stores/RootStore';
import { Keyboard, Platform } from 'react-native';
import { TabBarIcon } from '../components';
import { Images } from '../constants';

interface Props extends AppProps {
  barProps: BottomTabBarProps,
}

@observer
class TabBarComponent extends React.Component<Props> {
  state = {
    visble: true,
  }

  keyboardDidShowListener: any
  keyboardDidHideListener: any

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this.keyboardDidShow,
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this.keyboardDidHide,
      );
    }
  }

  keyboardDidShow = () => {

    this.setState({ visble: false })
  }

  keyboardDidHide = () => {
    this.setState({ visble: true })
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
  }

  renderTabBarIcon(tabScene: TabScene) {
    const { focused } = tabScene, { routeName } = tabScene.route
    const { rootStore } = this.props

    switch (routeName) {
      case 'BookingTabStack':
        return <TabBarIcon
          focused={focused}
          icon={Images.scheduleTabIcon}
          activeIcon={Images.scheduleTabSelectedIcon}
        />

      case 'HomeTabStack':
        return <TabBarIcon
          focused={focused}
          icon={Images.homeTabIcon}
          activeIcon={Images.homeTabSelectedIcon}
        />

      case 'NotificationTabStack':
        return <TabBarIcon
          focused={focused}
          icon={Images.notificationTabIcon}
          activeIcon={Images.notificationTabSelectedIcon}
          badge={rootStore.notificationStore.unreadNotifications}
        />

      case 'MessageTabStack':
        return <TabBarIcon
          focused={focused}
          icon={Images.chatTabIcon}
          activeIcon={Images.chatTabSelectedIcon}
        />

      case 'UserTabStack':
        return <TabBarIcon
          focused={focused}
          icon={Images.userTabIcon}
          activeIcon={Images.userTabSelectedIcon}
        />

      default:
        break;
    }

    return <TabBarIcon
      focused={focused}
      icon={Images.scheduleTabIcon}
      activeIcon={Images.scheduleTabSelectedIcon}
    />
  }

  render() {
    if (!this.props.rootStore.userStore.authUser || !this.state.visble) {
      return null;
    }
    return (
      <BottomTabBar key={`${this.props.rootStore.notificationStore.unreadNotifications}`} {...this.props.barProps}
        renderIcon={this.renderTabBarIcon.bind(this)}
      />
    );
  }
}

export default TabBarComponent;


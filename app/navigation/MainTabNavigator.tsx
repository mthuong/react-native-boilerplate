import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';
import { createBottomTabNavigator, createStackNavigator, NavigationRouteConfigMap, NavigationScreenProps } from 'react-navigation';
import { StaffProfileScreen, ModifyBookingScreen, AddLinkedUserScreen, AccountSettingsScreen, AdvancedSearchScreen, AppChangePasswordScreen, BookingDetailScreen, BookingHomeScreen, CalendarMonthScreen, CalendarScreen, CalendarWeekScreen, ConfirmModifyBookingScreen, CreditCardsScreen, FavouriteScreen, HomeScreen, LinkedUsersScreen, MakeASearchScreen, MessageHomeScreen, MessagesListScreen, NotificationHomeScreen, OrganizationProfileScreen, ProviderProfileScreen, ProviderServicesScreen, ReviewBookingScreen, SearchResultScreen, ServiceListScreen, UserHomeScreen, UserPersonalDetailScreen, AddCreditCardScreen } from '../screens';
import { IRootStore } from '../stores/RootStore';
import { theme } from '../themes';
import { defaultNavigationOptions } from '../utils';
import TabBarComponent from './TabbarComponent';

// There is no way to get rootStore from navigationOptions
// we keep this in case of usage
const HomeTabStack = createStackNavigator({
  HomeScreen,
  ServiceListScreen,
  MakeASearchScreen,
  AdvancedSearchScreen,
  SearchResultScreen,
  ProviderProfileScreen,
  ReviewBookingScreen,
  OrganizationProfileScreen
}, {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: defaultNavigationOptions,
  });

HomeTabStack.navigationOptions = ({ navigation }: NavigationScreenProps<any>) => {
  let tabBarVisible = true;
  if (navigation) {
    const index = navigation.state.index;

    if (index > 0) {
      tabBarVisible = false;
    }
  }

  return {
    tabBarVisible: tabBarVisible,
  };
};

const NotificationTabStack = createStackNavigator({
  NotificationHomeScreen,
  ConfirmModifyBookingScreen,
}, {
    defaultNavigationOptions: defaultNavigationOptions,
  });

NotificationTabStack.navigationOptions = ({ navigation }: NavigationScreenProps<any>) => {
  let tabBarVisible = true;
  if (navigation) {
    const index = navigation.state.index;
    if (index > 0) tabBarVisible = false;
  }
  return {
    tabBarVisible,
  }
};

const BookingTabStack = createStackNavigator({
  BookingHomeScreen,
  CalendarScreen,
  CalendarMonthScreen,
  CalendarWeekScreen,
  BookingDetailScreen,
  ModifyBookingScreen,
  StaffProfileScreen,
  OrganizationProfileScreen,
}, {
    defaultNavigationOptions: defaultNavigationOptions,
  });

BookingTabStack.navigationOptions = ({ navigation }: NavigationScreenProps<any>) => {
  let tabBarVisible = true;
  if (navigation) {
    const index = navigation.state.index;
    if (index > 0) tabBarVisible = false;
  }

  return {
    tabBarVisible,
    header: null
  };
};

const MessageTabStack = createStackNavigator({
  MessageHomeScreen,
  MessagesListScreen,
}, {
    defaultNavigationOptions: defaultNavigationOptions,
  });

MessageTabStack.navigationOptions = ({ navigation }: NavigationScreenProps<any>) => {
  let tabBarVisible = true;
  if (navigation) {
    const index = navigation.state.index;
    if (index > 0) tabBarVisible = false;
  }

  return {
    tabBarVisible: tabBarVisible,
  };
};

const UserTabStack = createStackNavigator({
  UserPersonalDetailScreen,
}, {
    defaultNavigationOptions: defaultNavigationOptions,
  });

UserTabStack.navigationOptions = ({ navigation }: NavigationScreenProps<any>) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible: tabBarVisible
  }
};



export const createMainTabNavigator = (rootStore: IRootStore, isProvider: boolean = false) => {

  // Seeker tabs
  let tabs: NavigationRouteConfigMap = {
    HomeTabStack: hoistNonReactStatics((props: any) => (<HomeTabStack {...props} screenProps={rootStore} />), HomeTabStack),
    NotificationTabStack: hoistNonReactStatics((props: any) => (<NotificationTabStack {...props} screenProps={rootStore} />), NotificationTabStack),
    BookingTabStack: hoistNonReactStatics((props: any) => (<BookingTabStack {...props} screenProps={rootStore} />), BookingTabStack),
    MessageTabStack: hoistNonReactStatics((props: any) => (<MessageTabStack {...props} screenProps={rootStore} />), MessageTabStack),
    UserTabStack: hoistNonReactStatics((props: any) => (<UserTabStack {...props} screenProps={rootStore} />), UserTabStack),
  }

  // Provider has different tabs and orders
  if (isProvider) {
    tabs = {
      BookingTabStack: hoistNonReactStatics((props: any) => (<BookingTabStack {...props} screenProps={rootStore} />), BookingTabStack),
      NotificationTabStack: hoistNonReactStatics((props: any) => (<NotificationTabStack {...props} screenProps={rootStore} />), NotificationTabStack),
      MessageTabStack: hoistNonReactStatics((props: any) => (<MessageTabStack {...props} screenProps={rootStore} />), MessageTabStack),
      UserTabStack: hoistNonReactStatics((props: any) => (<UserTabStack {...props} screenProps={rootStore} />), UserTabStack),
    }
  }

  return createBottomTabNavigator(tabs, {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: theme.color.primary,
      },
    },
    tabBarComponent: props => <TabBarComponent
      barProps={props}
      rootStore={rootStore}
    />,
    tabBarPosition: 'bottom',
  });
};

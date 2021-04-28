
import * as React from 'react';
import { View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from 'navigator/Navigator';
import { NAV_SCREENS } from 'navigator/RouteNames';

type CreateConversationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  NAV_SCREENS.CreateConversation
>
type CreateConversationScreenRoute = RouteProp<RootStackParamList, NAV_SCREENS.CreateConversation>

export type CreateConversationScreenParams = {}

type Props = {
  navigation: CreateConversationScreenNavigationProp
  route: CreateConversationScreenRoute
}

export function CreateConversationScreen (props: Props) {
    return (
      <View>
         <Text>CreateConversationScreen</Text>
      </View>
    );
}

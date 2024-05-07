import React, { Component } from 'react';
import { StyleSheet, Text, View, I18nManager } from 'react-native';

import {
  FlatList,
  GestureHandlerRootView,
  RectButton,
} from 'react-native-gesture-handler';

//  To toggle LTR/RTL uncomment the next line
// I18nManager.allowRTL(true);

import AppleStyleSwipeableRow from '../components/AppleStyleSwipeableRow';

const Row = ({ item }) => (
  <RectButton style={styles.rectButton} onPress={() => alert(item.from)}>
    <Text style={styles.fromText}>{item.from}</Text>
    <Text numberOfLines={2} style={styles.messageText}>
      {item.message}
    </Text>
    <Text style={styles.dateText}>
      {item.when} {'❭'}
    </Text>
  </RectButton>
);

const SwipeableRow = ({ item }) => {
  return (
    <AppleStyleSwipeableRow>
      <Row item={item} />
    </AppleStyleSwipeableRow>
  );
};

export default class Example extends Component {
  render() {
    return (
      <GestureHandlerRootView>
        <FlatList
          data={DATA}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => (
            <SwipeableRow item={item} index={index} />
          )}
          keyExtractor={(item, index) => `message ${index}`}
        />
      </GestureHandlerRootView>
    );
  }
}

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});

const DATA = [
  {
    from: '날씨 예보',
    when: '3:11 PM',
    message: '14:20 분 부터 비가 와요! 우산을 챙겨가세요.',
  },
  {
    from: '날씨 예보',
    when: '11:46 AM',
    message: '오늘 오후 6시부터 8시까지 비가 와요! 우산을 챙겨가세요.',
  },
  {
    from: '날씨 예보',
    when: '6:06 AM',
    message: '오늘 오후 6시부터 8시까지 비가 와요! 우산을 챙겨가세요.',
  },
  {
    from: '개인 맞춤 날씨 예보',
    when: '2 days ago',
    message: '대체로 바람이 많이 부는 날이에요.',
  },
  {
    from: '개인 맞춤 날씨 예보',
    when: '2 days ago',
    message: '새벽에 온도가 많이 떨어져요. 창문을 닫고 주무세요.',
  },
  {
    from: '개인 맞춤 날씨 예보',
    when: 'Week ago',
    message: '새벽에 온도가 많이 떨어져요. 창문을 닫고 주무세요.',
  },
  {
    from: '개인 맞춤 날씨 예보',
    when: 'Week ago',
    message: '새벽에 온도가 많이 떨어져요. 창문을 닫고 주무세요.',
  },
  {
    from: '개인 맞춤 날씨 예보',
    when: 'Week ago',
    message: '새벽에 온도가 많이 떨어져요. 창문을 닫고 주무세요.',
  },
  {
    from: '개인 맞춤 날씨 예보',
    when: 'Week ago',
    message: '새벽에 온도가 많이 떨어져요. 창문을 닫고 주무세요.',
  },
  {
    from: '개인 맞춤 날씨 예보',
    when: 'Week ago',
    message: '새벽에 온도가 많이 떨어져요. 창문을 닫고 주무세요.',
  },
  {
    from: '개인 맞춤 날씨 예보',
    when: 'Week ago',
    message: '새벽에 온도가 많이 떨어져요. 창문을 닫고 주무세요.',
  },
];

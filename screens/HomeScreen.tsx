import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import NewTweetButton from '../components/NewTweetButton';
import { Text, View } from '../components/Themed';
import Tweet from '../components/Tweet';
import tweets from "../data/tweets"
import Feed from './../components/Feed/';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Feed />
      <NewTweetButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

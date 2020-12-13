import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TweetType } from '../../../types'
import styles from './styles'
import { Entypo } from "@expo/vector-icons"
import Footer from "./footer"
import moment from "moment"

export type MainContainerProps = {
  tweet: TweetType
}

const MainContainer = ({ tweet }: MainContainerProps) => {
  return (
    <View style={styles.container} >
      <View style={styles.tweetHeaderContainer} >
        <View style={styles.tweetHeaderNames}>
          <Text style={styles.name}> {tweet.user.name} </Text>
          <Text style={styles.username}>@{tweet.user.username} </Text>
          <Text style={styles.createdAt}> {moment(tweet.createdAt).fromNow()} </Text>
        </View>
          <Entypo name="chevron-down" size={20} color="grey" style={styles.moreIcon} />
        
      </View>
      <View>  
        <Text style={styles.content}> {tweet.content} </Text>
        {!!tweet.image && <Image source={{ uri: tweet.image }} style={styles.image} />}
      </View>
      <Footer tweet={tweet} />
    </View>
  )
}

export default MainContainer
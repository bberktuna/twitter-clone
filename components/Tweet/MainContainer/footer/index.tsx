import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import styles from './styles'
import { Entypo, Feather, EvilIcons, AntDesign } from "@expo/vector-icons"
import { TweetType } from '../../../../types'


export type FooterProps = {
  tweet: TweetType
}

const Footer = ( {tweet} : FooterProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name={"message-circle"} size={20} color="grey" />
        <Text style={styles.number} > {tweet.numberOfComments} </Text>
      </View>

      <View style={styles.iconContainer}>
        <EvilIcons name={"retweet"} size={32} color="grey" />
        <Text style={styles.number} > {tweet.numberOfLikes} </Text>
      </View>

      <View style={styles.iconContainer}>
        <AntDesign name={"hearto"} size={20} color="grey" />
        <Text style={styles.number} > {tweet.numberOfComments} </Text>
      </View>

      <View style={styles.iconContainer}>
        <EvilIcons name={"share-google"} size={30} color="grey" />
      </View>
  </View>
  )
}

export default Footer
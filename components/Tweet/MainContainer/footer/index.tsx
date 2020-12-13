import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Entypo, Feather, EvilIcons, AntDesign } from "@expo/vector-icons"
import { API, graphqlOperation, Auth } from "aws-amplify"

import { createLike } from "../../../../graphql/mutations"
import { TweetType } from '../../../../types'
import styles from './styles'



export type FooterProps = {
  tweet: TweetType
}

const Footer = ({ tweet }: FooterProps) => {

  const [myLike, setMyLike] = useState(null)
  const [user, setUser] = useState(null)
  const [likesCount, setLikesCount] = useState(tweet.likes.items.length)

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser()
      setUser(currentUser)

      const searchedLike = tweet.likes.item.find(
        (like) => like.userID === currentUser.attributes.sub)
      setMyLike(searchedLike)
    }
    fetchUser()
  }, [])
  
  const onLike = async () => {
    if (!user) {
      return
    }
    const like = {
      userID: user.attributes.sub,
      tweetID: tweet.id,
    }
    try {
      const res = await API.graphql(graphqlOperation(createLike, { input: like }))
      setMyLike(res.data.createLike)
      setLikesCount(likesCount + 1)
      
    } catch (e) {
      console.log(e)
    }
  }

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
    
        <TouchableOpacity onPress={onLike} style={styles.iconContainer}>
          <AntDesign name={!myLike ? "hearto" : "heart"} size={20} color={!myLike ? "grey" : "red"} />
          <Text style={styles.number} > {likesCount} </Text>
        </TouchableOpacity>

      <View style={styles.iconContainer}>
        <EvilIcons name={"share-google"} size={30} color="grey" />
      </View>
  </View>
  )
}

export default Footer
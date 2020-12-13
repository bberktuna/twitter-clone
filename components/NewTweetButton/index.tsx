import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons} from "@expo/vector-icons"
import styles from './styles'
import { useNavigation } from '@react-navigation/native'

interface Props {
  
}

const NewTweetButton = (props: Props) => {

  const navigation = useNavigation()
  const onPress = () => {
    navigation.navigate("NewTweet")
  }
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} >
      
      <MaterialCommunityIcons name="feather" size={30} color="white" />
    </TouchableOpacity>
  )
}

export default NewTweetButton

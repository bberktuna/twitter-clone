import React, {useEffect, useState} from 'react'
import { View, Text, FlatList } from 'react-native'
import { TweetType } from '../../types';
import Tweet from '../Tweet';
import tweets from "../../data/tweets";

import { API, graphqlOperation } from "aws-amplify"
import { listTweets } from "../../graphql/queries"

interface Props {
  tweet: TweetType
}

const Feed = () => {

  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTweets = async () => {
    setLoading(true)
      //*get the tweets from backend and set them to state
      try {
        const tweetsData = await API.graphql(graphqlOperation(listTweets))
        setTweets(tweetsData.data.listTweets.items)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
  }
  
  useEffect(() => {
    fetchTweets()
  }, [])

  return (
    <View style={{ flex: 1, width: "100%"}}>
    <FlatList
      data={tweets}
      renderItem={({item}) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={fetchTweets}
    />
    </View>

  )
}

export default Feed

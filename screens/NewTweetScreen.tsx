import React, {useState} from 'react'
import { View, Text, StyleSheet ,TouchableOpacity, SafeAreaView} from 'react-native'
import Colors from "../constants/Colors"
import { AntDesign } from '@expo/vector-icons';
import ProfilePicture from '../components/ProfilePicture';
import { TextInput } from 'react-native-gesture-handler';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createTweet } from "../graphql/mutations"
import { useNavigation } from "@react-navigation/native"


interface Props {
  
}

const NewTweetScreen = (props: Props) => {

  const [ tweet, setTweet ] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const navigation = useNavigation()

  const onPostTweet = async () => {
    try {

    const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true })

      const newTweet = {
        content: tweet, // from state at the top
        image: imageUrl, // from state at the top
        userID: currentUser.attributes.sub
      }
      await API.graphql(graphqlOperation(createTweet, { input: newTweet }))
      navigation.goBack()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={30} color={Colors.light.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onPostTweet} >
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.newTweetContainer }>
        <ProfilePicture image={"https://static.autoblog.nl/images/wp2018/Paul-Walker-Supra.jpg"} size={60} />
        <View style={styles.inputsContainer}>
          <TextInput
            multiline= {true}
            style={styles.tweetInput}
            placeholder={"What's happening?"}
            value={tweet}
            onChangeText={(e) => setTweet(e)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.imageInput}
            placeholder={"Image url (optional)"}
            value={imageUrl}
            onChangeText={(e) => setImageUrl(e)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inputsContainer: {
    marginLeft: 10,
    width: "100%",
    justifyContent: "flex-start",

  },
  tweetInput: {
    height: "50%",
    maxHeight: 300,
    fontSize: 20,
    textAlignVertical: 'top'
  },
  imageInput: {
    height: "50%",
    maxHeight: 300,
    fontSize: 20,
    textAlignVertical: 'top'
  },
  newTweetContainer: {
    flexDirection: "row",
    padding: 15,
    width: "100%",
    height:"100%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 25,
    alignItems: "flex-start",


  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },

});


export default NewTweetScreen
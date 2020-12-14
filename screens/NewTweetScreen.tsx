import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, Image } from 'react-native'
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import Colors from "../constants/Colors"
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ProfilePicture from '../components/ProfilePicture';
import { TextInput } from 'react-native-gesture-handler';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import { createTweet } from "../graphql/mutations"
import { useNavigation } from "@react-navigation/native"
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

interface Props {
  
}

const NewTweetScreen = (props: Props) => {

  const [ tweet, setTweet ] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const navigation = useNavigation()

  const getPermissionsAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  useEffect(() => {
    getPermissionsAsync()
  }, [])

  const pickImage = async () => {
    try {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImageUrl(result.uri);
      }
    console.log(result);
    } catch (e) {
      console.log(e)
    }
  }



  const uploadImage = async () => {
    try {
      const response = await fetch(imageUrl)

      const blob = await response.blob()

      const urlParts = imageUrl.split(".")
      const extension = urlParts[urlParts.length - 1]
      console.log(extension)
      const key = `${uuidv4()}.${extension}`

      await Storage.put(key, blob)
      return key
    } catch (e) {
      console.log(e)
    }
  }

  const onPostTweet = async () => {
    let image
    if (!!imageUrl) {
      image = await uploadImage()
    }

    try {
    const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true })

      const newTweet = {
        content: tweet, // from state at the top
        image: image, // from the onpost tweet image
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

          <Image source={{ uri: imageUrl }} style={styles.image} />
          <TouchableOpacity onPress={pickImage}>
            <Ionicons name="ios-image-outline" size={35} color={Colors.light.tint} />
          </TouchableOpacity>
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
    width: "80%",
    height:"90%",
    justifyContent: "flex-start",

  },
  tweetInput: {
    height: "25%",
    fontSize: 20,
    textAlignVertical: 'top',



  },
  newTweetContainer: {
    flexDirection: "row",
    padding: 15,
    width: "100%",
    maxHeight: "100%",

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
  image: {
    width: "100%",
    height: 250,
    marginVertical: 10
  }

});


export default NewTweetScreen
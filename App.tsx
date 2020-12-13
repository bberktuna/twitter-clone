//! AWS AMPLIFY
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
import { withAuthenticator } from 'aws-amplify-react-native'

import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { getUser } from "./graphql/queries"
import { createUser } from "./graphql/mutations"


function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return "https://static.wikia.nocookie.net/fastandfurious/images/d/d7/Sean%27s_Mitsubishi_Lancer_Evolution_IX.png/revision/latest?cb=20160123170156"
  }
  const saveUserToDB = async (user) => {
    console.log(user)
    await API.graphql(graphqlOperation(createUser, {input: user}))
  }

  useEffect(() => {
    const updateUser = async () => {
      // get current authenticated user
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true })
      console.log(userInfo)

      // check if user already eists in db
      if (userInfo) {
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub }))
        console.log(userData)
        if (!userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage()

          }
          await saveUserToDB(user)
        } else {
          console.log("User already exists")
        }
      }
      // if it doesn't create the user in db
    }
    updateUser()
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App)
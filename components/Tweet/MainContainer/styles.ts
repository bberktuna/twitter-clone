import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
  },
  tweetHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tweetHeaderNames: {
    flexDirection: "row",
  },
  name: {
    marginRight: 5,
    fontWeight: "bold"
  },
  username: {
    marginRight: 5,
    color: "grey"
  },
  createdAt: {
    marginRight: 5,
    color: "grey"
  },
  moreIcon: {
  },
  content: {
    lineHeight: 18,
    marginTop: 5
  },
  image: {
    marginVertical: 5,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 15,
    overflow: "hidden",
    height: 200,
    
  }
})

export default styles
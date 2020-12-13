import { StyleSheet } from 'react-native';
import Colors from "../../constants/Colors"

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.tint,
    position: "absolute",
    borderRadius: 50,
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    
  }
})

export default styles
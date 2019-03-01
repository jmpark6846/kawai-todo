import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
export default class Todo extends React.Component{
  state = {
    isEditing: false,
  }
  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.circle} />
        </TouchableOpacity>
        <Text style={styles.text}>Hello! I'm Todo!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth:StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    marginVertical: 20,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 20,
    borderColor: "red",
    borderWidth: 3
  }
})
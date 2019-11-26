import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ProgressBar from './src/components/ProgressBar'
import MediumClaps from './src/components/MediumClaps'
const App = () => {

  return (
    <View style={styles.container}>
      <MediumClaps />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3B827"
  }
})

export default App;
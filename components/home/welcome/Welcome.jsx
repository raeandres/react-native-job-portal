import { React, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'

import styles from './welcome.style'
import { useRouter } from 'expo-router'
import { icons, SIZES } from '../../../constants'

const Welcome = () => { 
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      
      <View style={styles.seachContainer}>
        <View style={styles.searchWrappe}>
          <TextInput
            style={styles.searchInput}
          />
        </View>
      </View>
    </View>
  )
}

export default Welcome
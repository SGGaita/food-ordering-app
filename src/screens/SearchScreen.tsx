import React, {useState, useEffect} from 'react'
import {StyleSheet,View,Text,TouchableOpacity, TextInput, Image} from 'react-native'

interface SearchScreenProps{}
const SearchScreen : React.FC<SearchScreenProps> = ({})=> {
return (<View style={styles.container}>
<View style={styles.navigation}><Text>Search page</Text></View>
<View style={styles.body}><Text>Search screen</Text></View>
<View style={styles.footer}><Text>Footer Content</Text></View>
</View>)}


const styles = StyleSheet.create({
container: {flex: 1, backgroundColor: 'white'},
navigation: {flex: 2, justifyContent:'center', alignItems:'center'},
body: {flex:10, justifyContent: 'center', alignItems: 'center'},
footer:{flex: 1, backgroundColor: 'cyan'}
})

export {SearchScreen}
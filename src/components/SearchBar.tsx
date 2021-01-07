import React, {useState, useEffect} from 'react'
import {StyleSheet,View,Text,TouchableOpacity, TextInput, Image} from 'react-native'

interface SearchBarProps {
    onEndEditing?: any | undefined;
    didTouch?: any | undefined;
    autoFocus?: boolean | undefined;
    onTextChange: Function;
}

const SearchBar: React.FC<SearchBarProps> = ({onEndEditing, didTouch, autoFocus = false, onTextChange})=> {
return (<View style={styles.container}>
<View style={styles.searchBar}>
    <Image style={{width:20,height:20}} source={require('../images/search.png')}/>
    <TextInput
    style={{marginLeft: 5, flex: 10, display: 'flex', fontSize:15, height: 40}}
    placeholder={'Search foods'}
    autoFocus={autoFocus}
    onTouchStart={didTouch}
    onChangeText={(text)=> onTextChange(text)}
    onEndEditing ={onEndEditing}/>
    </View>

</View>)}


const styles = StyleSheet.create({
container: {
    flex: 5,
    backgroundColor: 'white',
    height:40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',
    paddingLeft: 28,
    paddingRight: 28
},
searchBar: {
    flex: 1,
    backgroundColor: '#ededed',
display:'flex',
height:32,
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center',
borderRadius:28,
paddingLeft:10,
paddingRight:10,
borderColor:'#e5e5e5',
borderWidth: 2
},

})

export {SearchBar}
import React, {useState, useEffect} from 'react'
import {StyleSheet,View,Text,TouchableOpacity, TextInput, Image} from 'react-native'
import { ButtonWithIcon, SearchBar } from '../components'
import { useNavigation } from '../utils';

interface SearchScreenProps{
    navigation: { getParam: Function; goBack: Function };
}
const SearchScreen : React.FC<SearchScreenProps> = (props)=> {
    const { navigate } = useNavigation();
    const { getParam, goBack } = props.navigation;

return (<View style={styles.container}>
<View style={styles.navigation}>
        <ButtonWithIcon
          icon={require("../images/back_arrow.png")}
          onTap={() => goBack()}
          width={20}
          height={20}
        />
        <SearchBar
            didTouch={() => {
              navigate("SearchPage");
            }}
            onTextChange={() => {}}
          />
      </View>
<View style={styles.body}><Text>Search screen</Text></View>

</View>)}


const styles = StyleSheet.create({
container: {flex: 1, backgroundColor: 'white'},
navigation: {
    flex: 1,
    marginTop: 35,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  body: { flex: 10, justifyContent: "flex-start", alignItems: "center" },

})

export {SearchScreen}
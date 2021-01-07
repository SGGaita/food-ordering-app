import React, {useState, useEffect} from 'react'
import {StyleSheet,View,Text,TouchableOpacity, TextInput, Image, ImageSourcePropType} from 'react-native'

interface ButtonWithIconProps{
    onTap:Function;
    width: number;
    height: number;
    icon: ImageSourcePropType
}
const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({onTap,icon,width,height})=> {
return (
    <TouchableOpacity style={[styles.btn, {width,height}]}
    onPress={() => onTap()}>

        <Image style={{width: (width -2), height: (height - 2 )}} source={icon}/>

    </TouchableOpacity>
)}


const styles = StyleSheet.create({
btn: {flex: 1},

})

export {ButtonWithIcon}
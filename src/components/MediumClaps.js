import React, { useState, useEffect } from 'react'
import { Animated, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'


const MediumClaps = () => {
    const [claps, setClaps] = useState([])
    const [clapCount, setClapCount] = useState(0)

    const startClapping = () => {
        setClapCount(
            clapCount + 1
        )
        claps.push(clapCount)
    }
    const animationCompleted = (newCount) => {
        claps.splice(claps.indexOf(newCount), 1)
        setClaps([])
    }

    const renderBubbleClaps = () => {
        return (
            claps.map(newCount => <BubbleButton animationCompleted={animationCompleted} key={newCount} clapCount={newCount} />)
        )
    }
    const clapIcon = clapCount > 0 ? <Image source={require('../assets/clapped.png')} style={styles.imageStyle} /> : <Image source={require('../assets/clap.png')} style={styles.imageStyle} />

    return (
        <View style={{ flex: 1 }}>
            {renderBubbleClaps()}
            <TouchableOpacity
                onPress={startClapping}
                activeOpacity={0.7}
                style={styles.clapButton}>
                {clapIcon}
            </TouchableOpacity>
        </View>
    )
}

const BubbleButton = props => {
    const [bubbleAnimation, setBubbleAnimation] = useState(new Animated.Value(0))
    const [bubbleOpacityAnimation, setbubbleOpacityAnimation] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.parallel([
            Animated.timing(bubbleAnimation, {
                toValue: -150,
                duration: 400
            }),
            Animated.timing(bubbleOpacityAnimation, {
                toValue: 1,
                duration: 400
            }),
        ]).start(() => {
            setTimeout(() => {
                props.animationCompleted(props.clapCount)
            }, 500)
        })
    });

    const bubbleAnimationStyle = {
        transform: [
            {
                translateY: bubbleAnimation
            }
        ],
        opacity: bubbleOpacityAnimation
    }

    return (
        <Animated.View style={[styles.bubble, bubbleAnimationStyle]}>
            <Text style={styles.bubbleTextStyle}>+ {props.clapCount}</Text>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    clapButton: {
        position: "absolute",
        right: 150,
        bottom: 200,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: "#F8F5F5",
        justifyContent: "center",
        alignItems: "center"
    },
    bubble: {
        position: "absolute",
        right: 150,
        bottom: 200,
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"
    },
    imageStyle: {
        height: 60,
        width: 60
    },
    bubbleTextStyle: {
        color: "#fff",
        fontSize: 15
    }


})
export default MediumClaps;
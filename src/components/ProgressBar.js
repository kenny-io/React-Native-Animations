import React, { useState, useEffect } from 'react'
import {
    Text,
    Dimensions,
    StyleSheet,
    Animated,
    View,
    TouchableOpacity
} from 'react-native'

const ProgressBar = () => {
    const [data, setData] = useState({
        index: 0,
        questions: [
            "Are you a new React Native developer?",
            "Do you like React Native?",
            "Would you recomment it to a newbie?",
            "Is it fulfilling to work with?",
        ],
        animation: new Animated.Value(0)
    })

    const useEffect = () => {
        animation.setValue(0)
    }

    const handleResponse = () => {
        Animated.timing(data.animation, {
            toValue: 1,
            duration: 400,
        }).start(() => {
            setData({
                index: data.index + 1
            })
            useEffect()
        })
    }

    const { questions, index, animation } = data;
    const { width } = Dimensions.get("window");

    const question = questions[index]
    let nextQuestion;
    if (index + 1 < questions.length) {

        nextQuestion = questions[index + 1]
    }

    const InterpolateFirstQuestion = data.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -width]
    });
    const InterpolateNextQuestion = data.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [width, 0]
    });

    const animationStyleFirstQuestion = {
        transform: [{
            translateX: InterpolateFirstQuestion
        }]
    }
    const animationStyleNextQuestion = {
        transform: [{
            translateX: InterpolateNextQuestion
        }]
    }
    return (
        <View style={styles.mainView}>
            <View style={[StyleSheet.absoluteFill, styles.overlay_style]}>
                <Animated.Text style={[styles.question_text_style, animationStyleFirstQuestion]}>
                    {question}
                </Animated.Text>
                <Animated.Text style={[styles.question_text_style, animationStyleNextQuestion]}>
                    {nextQuestion}
                </Animated.Text>
            </View>
            <TouchableOpacity
                style={styles.yes_choice}
                onPress={handleResponse}
                activeOpacity={.5}>
                <Text style={{ color: "white" }}> YES </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.no_choice}
                onPress={handleResponse}
                activeOpacity={.5}>
                <Text style={{ color: "white" }}> NO </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "row",
    },
    yes_choice: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        backgroundColor: 'rgba(11, 156, 49, 1)',
        borderRadius: 50,
        position: "absolute",
        bottom: 50,
        left: 50,

    },
    no_choice: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 50,
        position: "absolute",
        bottom: 50,
        right: 50,

    },
    overlay_style: {
        alignItems: "center",
        justifyContent: "center"
    },
    question_text_style: {
        backgroundColor: "transparent",
        textAlign: "center",
        position: "absolute",
        fontSize: 20,
        color: "gray"
    },


})

export default ProgressBar;
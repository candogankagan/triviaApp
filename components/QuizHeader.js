import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

function QuizHeader({ navigation, score, questionNumber, resetTime }) {
	const [initialTime, setInitialTime] = useState(15)
	const [timer, setTimer] = useState()

	useEffect(() => {
		if (initialTime > 0) {
			setTimer(
				setTimeout(() => {
					setInitialTime(initialTime - 1)
				}, 1000)
			)
		} else {
			navigation.navigate('TimesUpPage')
		}
	}, [initialTime])

	useEffect(() => {
		if (questionNumber > 1) {
			clearTimeout(timer)
			setInitialTime(15)
		}
	}, [questionNumber])

	useEffect(() => {
		if (resetTime > 0) {
			clearTimeout(timer)
		}
	}, [resetTime])

	return (
		<View style={styles.header}>
			<View style={styles.question}>
				<Text style={styles.text}>Question</Text>
				<Text style={styles.text}>{questionNumber}/10</Text>
			</View>
			<View style={styles.points}>
				<Text style={styles.text}>Points</Text>
				<Text style={styles.text}>{score}</Text>
			</View>
			<View style={styles.time}>
				<Text style={styles.text}>Remaning Time</Text>
				<Text style={styles.text}>{initialTime}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,.4)',
	},
	question: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	points: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	time: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: 'white',
	},
})

export default QuizHeader

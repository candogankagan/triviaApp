import React, { useState, useEffect, useContext } from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	ActivityIndicator,
} from 'react-native'
import QuizHeader from './QuizHeader'
import { QuizContext } from '../context/StateProvider'
import { decode } from 'html-entities'

function Quiz({ navigation }) {
	const {
		questions,
		questionNumber,
		score,
		setScore,
		shuffledAnswer,
		setShuffledAnswer,
		index,
		setIndex,
	} = useContext(QuizContext)

	const [resetTime, setResetTime] = useState(0)

	const handleAnswer = (answer) => {
		if (answer === questions[index].correct_answer) {
			setIndex(index + 1)
			setResetTime(resetTime + 1)
			setScore(score + 50)
			navigation.navigate(index == 9 ? 'YouWinPage' : 'CorrectPage')
			console.log(index)
		} else {
			setResetTime(resetTime + 1)
			navigation.navigate('WrongPage')
		}
	}

	useEffect(() => {
		console.log(index, questionNumber)

		if (questions.length > 0 && index < 10) {
			setShuffledAnswer(
				[
					questions[index].correct_answer,
					...questions[index].incorrect_answers,
				].sort(() => Math.random() - 0.5)
			)
		}
	}, [questions, index])
	console.log(shuffledAnswer)
	console.log(questions)

	const renderAnswers = ({ item }) => {
		console.log(item)
		return (
			<TouchableOpacity
				style={styles.button}
				onPress={() => handleAnswer(item)}
			>
				<Text style={styles.text}>{decode(item)}</Text>
			</TouchableOpacity>
		)
	}

	return questions.length > 0 && index < 10 ? (
		<View style={styles.container}>
			<View style={styles.header}>
				<QuizHeader
					navigation={navigation}
					score={score}
					questionNumber={questionNumber}
					resetTime={resetTime}
				/>
			</View>
			<View style={styles.question}>
				<View style={styles.questionText}>
					<Text style={styles.questionText}>
						{decode(questions[index].question)}
					</Text>
				</View>
				<View style={styles.answers}>
					<FlatList
						data={shuffledAnswer}
						renderItem={renderAnswers}
						keyExtractor={(item) => item}
					/>
				</View>
			</View>
		</View>
	) : (
		<View style={styles.loading}>
			<ActivityIndicator size='large' color='white' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1544e3',
	},
	header: {
		flex: 1,
	},
	question: {
		flex: 2.5,
		width: '80%',
		alignSelf: 'center',
	},
	answers: {
		width: '85%',
		marginTop: 40,
	},
	button: {
		margin: 10,
		padding: 10,
		fontSize: 14,
		borderLeftWidth: 3,
		borderLeftColor: 'white',
		backgroundColor: 'rgba(0,0,0,.4)',
	},
	text: {
		color: 'white',
	},
	questionText: {
		fontSize: 20,
		fontWeight: 'bold',
		lineHeight: 28,
		color: 'white',
	},
	loading: {
		flex: 1,
		backgroundColor: '#1544e3',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default Quiz

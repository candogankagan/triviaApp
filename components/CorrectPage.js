import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { QuizContext } from '../context/StateProvider'

function CorrectPage({ navigation }) {
	const { questionNumber, setQuestionNumber, score } = useContext(QuizContext)

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.header}>
					<View style={styles.headerText}>
						<Text style={styles.text}>Question</Text>
						<Text style={styles.text}>{questionNumber}/10</Text>
					</View>
				</View>
			</View>
			<View style={styles.main}>
				<View style={styles.icon}>
					<FontAwesomeIcon
						icon={['far', 'check-circle']}
						size={100}
						color={'white'}
					/>
					<Text style={styles.textCorrect}>Correct</Text>
				</View>
				<View style={styles.pointTextContainer}>
					<Text style={styles.pointText}>
						You have earned 50 points
					</Text>
					<Text style={styles.pointText}>Total: {score} points</Text>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							setQuestionNumber(questionNumber + 1)
							navigation.navigate('Quiz')
						}}
					>
						<Text style={styles.text}>Next Question</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#219653',
	},
	headerContainer: {
		flex: 1,
		width: '100%',
		height: 100,
	},
	header: {
		flexDirection: 'column',
		paddingLeft: 30,
		height: 60,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,.4)',
	},
	headerText: {
		width: '20%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	main: {
		flex: 3,
		alignItems: 'center',
	},
	icon: { flex: 2, alignItems: 'center' },
	pointTextContainer: { flex: 2, alignItems: 'center' },
	pointText: { fontSize: 24, color: 'white' },
	buttonContainer: { width: '80%', flex: 2 },
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		backgroundColor: 'rgba(0,0,0,.4)',
	},
	textCorrect: { fontSize: 36, color: 'white', fontWeight: '700' },
	text: {
		color: 'white',
	},
})

export default CorrectPage

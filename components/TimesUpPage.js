import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { QuizContext } from '../context/StateProvider';

function TimesUpPage({ navigation }) {
	const {
		setQuestionNumber,
		questionNumber,
		score,
		setScore,
		setShuffledAnswer,
	} = useContext(QuizContext);
	console.log(questionNumber);

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
						icon={'hourglass-end'}
						size={100}
						color={'#242222'}
					/>
					<Text style={styles.textCorrect}>Time's up</Text>
				</View>
				<View style={styles.pointTextContainer}>
					<Text style={styles.pointText}>
						You are late, time's up.
					</Text>
					<Text style={styles.pointText}>Total: {score} points</Text>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							navigation.navigate('Home');
						}}
					>
						<Text style={styles.text}>Main Menu</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#4f4f4f',
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
		width: '30%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	main: {
		flex: 3,
		alignItems: 'center',
	},
	icon: { flex: 3, alignItems: 'center' },
	pointTextContainer: { flex: 2, alignItems: 'center' },
	pointText: {
		color: 'white',
	},
	buttonContainer: { width: '80%', flex: 2 },
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		backgroundColor: 'rgba(0,0,0,.4)',
	},
	textCorrect: {
		marginTop: 20,
		fontSize: 28,
		color: 'white',
		fontWeight: '700',
	},
	text: {
		color: 'white',
	},
});

export default TimesUpPage;

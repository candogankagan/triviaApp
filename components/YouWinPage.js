import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { QuizContext } from '../context/StateProvider';

function YouWinPage({ navigation }) {
	const { setQuestionNumber, questionNumber, score, setScore } = useContext(
		QuizContext
	);
	console.log(questionNumber);

	return (
		<View style={styles.container}>
			<View style={styles.icon}>
				<FontAwesomeIcon icon={'trophy'} size={100} color={'#f77f14'} />
				<Text style={styles.textCorrect}>You win!</Text>
			</View>
			<View style={styles.pointTextContainer}>
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
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#c77227',
		alignItems: 'center',
	},

	icon: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: 50,
	},
	pointTextContainer: { flex: 3, alignItems: 'center' },
	pointText: { color: 'white' },
	buttonContainer: { width: '80%', flex: 2 },
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		backgroundColor: 'rgba(0,0,0,.4)',
	},
	textCorrect: {
		fontSize: 36,
		color: 'white',
		fontWeight: '700',
		marginTop: 10,
	},
	text: {
		color: 'white',
	},
});

export default YouWinPage;

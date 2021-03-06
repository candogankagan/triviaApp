import React, { useContext, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { QuizContext } from '../context/StateProvider';

function WrongPage({ navigation }) {
	const {
		setQuestionNumber,
		questionNumber,
		score,
		setScore,
		setShuffledAnswer,
	} = useContext(QuizContext);

	function handleBackButtonClick() {
		navigation.popToTop();
		return true;
	}

	useEffect(() => {
		BackHandler.addEventListener(
			'hardwareBackPress',
			handleBackButtonClick
		);
		return () => {
			BackHandler.removeEventListener(
				'hardwareBackPress',
				handleBackButtonClick
			);
		};
	}, []);

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
						icon={'times-circle'}
						size={100}
						color={'white'}
					/>
					<Text style={styles.textCorrect}>Wrong</Text>
				</View>
				<View style={styles.pointTextContainer}>
					<Text style={styles.pointText}>You failed</Text>
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
		backgroundColor: '#eb5757',
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
	pointText: { color: 'white' },
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
});

export default WrongPage;

import React, { useState, useEffect, useContext } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import QuizHeader from './QuizHeader';
import { QuizContext } from '../context/StateProvider';
import { decode } from 'html-entities';

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
	} = useContext(QuizContext);

	const [resetTime, setResetTime] = useState(0);
	const [disabled, setDisabled] = useState(false);
	const [disabledFiftyPercent, setDisabledFiftyPercent] = useState(false);
	const [firstIncorrect, setFirstIncorrect] = useState();
	const [secondIncorrect, setSecondIncorrect] = useState();

	const handleAnswer = (answer) => {
		if (answer === questions[index].correct_answer) {
			setIndex(index + 1);
			setResetTime(resetTime + 1);
			setScore(score + 50);
			setDisabled(false);
			navigation.navigate(index == 9 ? 'YouWinPage' : 'CorrectPage');
			console.log(index);
		} else {
			setResetTime(resetTime + 1);
			navigation.navigate('WrongPage');
		}
	};

	useEffect(() => {
		console.log(index, questionNumber);

		if (questions.length > 0 && index < 10) {
			setShuffledAnswer(
				[
					questions[index].correct_answer,
					...questions[index].incorrect_answers,
				].sort(() => Math.random() - 0.5)
			);
		}
	}, [questions, index]);
	console.log(shuffledAnswer);
	console.log(questions);

	useEffect(() => {
		if (disabled) {
			setFirstIncorrect(
				shuffledAnswer.indexOf(questions[index].incorrect_answers[0])
			);
			setSecondIncorrect(
				shuffledAnswer.indexOf(questions[index].incorrect_answers[1])
			);
			setDisabledFiftyPercent(true);
		}
	}, [disabled]);

	const renderAnswers = ({ item, index }) => {
		console.log(item);
		return (
			<TouchableOpacity
				style={
					disabled == true
						? index == firstIncorrect || index == secondIncorrect
							? styles.disabledButton
							: styles.button
						: styles.button
				}
				disabled={
					disabled == true
						? index == firstIncorrect || index == secondIncorrect
							? true
							: false
						: false
				}
				onPress={() => handleAnswer(item)}
			>
				<Text style={styles.text}>{decode(item)}</Text>
			</TouchableOpacity>
		);
	};

	return questions.length > 0 && index < 10 ? (
		<View style={styles.container}>
			<View style={styles.header}>
				<QuizHeader
					navigation={navigation}
					score={score}
					questionNumber={questionNumber}
					resetTime={resetTime}
				/>
				<View
					style={
						disabledFiftyPercent == true
							? styles.disabledFiftyPercent
							: styles.fiftyPercent
					}
				>
					<TouchableOpacity
						disabled={disabledFiftyPercent}
						onPress={() => setDisabled(true)}
					>
						<Text style={styles.text}>%50</Text>
					</TouchableOpacity>
				</View>
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
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1544e3',
	},
	header: {
		flex: 1.3,
	},
	fiftyPercent: {
		marginTop: 10,
		marginLeft: 10,
		backgroundColor: 'rgba(0,0,0,.4)',
		width: 45,
		height: 45,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	disabledFiftyPercent: {
		marginTop: 10,
		marginLeft: 10,
		backgroundColor: 'rgba(0,0,0,.2)',
		width: 45,
		height: 45,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	question: {
		flex: 4,
		width: '80%',
		alignSelf: 'center',
	},
	questionText: {
		fontWeight: 'bold',
		lineHeight: 28,
		color: 'white',
	},
	answers: {
		width: '85%',
		marginTop: 20,
	},
	button: {
		margin: 5,
		padding: 10,
		borderLeftWidth: 3,
		borderLeftColor: 'white',
		backgroundColor: 'rgba(0,0,0,.4)',
	},
	disabledButton: {
		margin: 5,
		padding: 10,
		borderLeftWidth: 3,
		borderLeftColor: 'white',
		backgroundColor: 'rgba(0,0,0,.2)',
	},
	text: {
		color: 'white',
	},

	loading: {
		flex: 1,
		backgroundColor: '#1544e3',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Quiz;

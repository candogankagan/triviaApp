import 'react-native-gesture-handler'
import React, { useState, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, View, Text } from 'react-native'
import { QuizContext } from './context/StateProvider'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
	faTimesCircle,
	faHourglassEnd,
	faTrophy,
} from '@fortawesome/free-solid-svg-icons'
import Home from './components/Home'
import Quiz from './components/Quiz'
import WrongPage from './components/WrongPage'
import CorrectPage from './components/CorrectPage'
import TimesUpPage from './components/TimesUpPage'
import YouWinPage from './components/YouWinPage'

library.add(far, fab, faTimesCircle, faHourglassEnd, faTrophy)
const Stack = createStackNavigator()
const App = () => {
	const [questions, setQuestions] = useState([])
	const [index, setIndex] = useState(0)
	const [questionNumber, setQuestionNumber] = useState(1)
	const [score, setScore] = useState(0)
	const [shuffledAnswer, setShuffledAnswer] = useState([])

	return (
		<QuizContext.Provider
			value={{
				questions,
				setQuestions,
				questionNumber,
				setQuestionNumber,
				score,
				setScore,
				shuffledAnswer,
				setShuffledAnswer,
				index,
				setIndex,
			}}
		>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name='Home' component={Home} />
					<Stack.Screen name='Quiz' component={Quiz} />
					<Stack.Screen name='CorrectPage' component={CorrectPage} />
					<Stack.Screen name='WrongPage' component={WrongPage} />
					<Stack.Screen name='TimesUpPage' component={TimesUpPage} />
					<Stack.Screen name='YouWinPage' component={YouWinPage} />
				</Stack.Navigator>
			</NavigationContainer>
		</QuizContext.Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default App

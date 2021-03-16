import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { QuizContext } from '../context/StateProvider'

function Home({ navigation }) {
	const [selectedCategory, setSelectedCategory] = useState('anyCategory')
	const [selectedDifficulty, setSelectedDifficulty] = useState(
		'anyDifficulty'
	)
	const [categories, setCategories] = useState([])
	const { setQuestions, setShuffledAnswer, setIndex, index } = useContext(
		QuizContext
	)

	const categoriesURL = 'https://opentdb.com/api_category.php'

	useEffect(() => {
		const fetchQuizCategories = async () => {
			try {
				const data = await fetch(categoriesURL).then((resp) =>
					resp.json()
				)
				const dataList = data.trivia_categories
				setCategories(dataList)
			} catch (err) {
				console.error(error)
			}
		}
		fetchQuizCategories()
	}, [])

	const fetchQuestions = async () => {
		try {
			const data = await fetch(
				`https://opentdb.com/api.php?amount=10&category=${
					selectedCategory == 'anyCategory' ? '' : selectedCategory
				}&difficulty=${
					selectedDifficulty == 'anyDifficulty'
						? ''
						: selectedDifficulty
				}`
			)
				.then((resp) => resp.json())
				.then((data) => {
					const questionsData = data.results
					console.log(questionsData)
					setQuestions(questionsData)
				})
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.logo}>
				<FontAwesomeIcon
					icon={['fab', 'react']}
					size={100}
					color={'white'}
				/>
				<Text style={styles.logoText}>A trivia game</Text>
			</View>
			<View style={styles.selections}>
				<View style={styles.picker}>
					<Picker
						selectedValue={selectedCategory}
						onValueChange={(itemValue, itemIndex) =>
							setSelectedCategory(itemValue)
						}
					>
						<Picker.Item label='Any Category' value='anyCategory' />
						{categories.map((item, index) => (
							<Picker.Item
								key={index}
								label={item.name}
								value={item.id}
							/>
						))}
					</Picker>
				</View>
				<View style={styles.picker}>
					<Picker
						selectedValue={selectedDifficulty}
						onValueChange={(itemValue, itemIndex) =>
							setSelectedDifficulty(itemValue)
						}
					>
						<Picker.Item
							label='Any Difficult'
							value='anyDifficulty'
						/>
						<Picker.Item label='Easy' value='easy' />
						<Picker.Item label='Medium' value='medium' />
						<Picker.Item label='Hard' value='hard' />
					</Picker>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							fetchQuestions()
							setIndex(0)
							navigation.navigate('Quiz')
						}}
					>
						<Text style={styles.text}>Get Started</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1544e3',
	},
	logo: {
		flex: 2.5,
		top: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	selections: {
		flex: 2,
	},
	buttonContainer: {
		width: '50%',
		marginTop: 30,
		alignSelf: 'center',
	},
	button: {
		flexDirection: 'column',
		justifyContent: 'center',
		height: 50,
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,.4)',
	},

	text: {
		color: 'white',
		fontSize: 18,
	},
	logoText: {
		marginTop: 15,
		color: 'white',
		fontSize: 18,
	},
	picker: {
		width: '80%',
		paddingLeft: 10,
		margin: 10,
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 5,
	},
})
export default Home

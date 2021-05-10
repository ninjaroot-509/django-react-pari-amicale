import React, { useEffect, useState } from 'react';
import { Stars, HighlightOff, PlayCircleFilled, Mood, Clear } from '@material-ui/icons';

import Button from './components/Button'
import NumbersArea from './components/NumbersArea'

import './App.css';

const Lotto = () => {
	const [nums, setNums] = useState([])
	const [guess, setGuess] = useState([])
	const [mode, setMode] = useState('')
	const [result, setResult] = useState([])
	const [matches, setMatches] = useState([])
	const [maxNum, setMaxNum] = useState(0)

	useEffect(() => {
		const createCard = () => {
			let arr = []
			let index = 0

			switch (mode) {
				case 'mega':
					index = 70
					break
				case 'corner':
					index = 80
					break
				case 'e-z':
					index = 60
					break
				case 'frenzy':
					index = 100
					break
				default:
					return
			}

			for (let x = 1; x <= index; x++) {
				arr.push(x)
			}
			setNums(arr)
		}

		setGuess([])
		setResult([])
		setMatches([])
		setNums([])

		switch (mode) {
			case 'mega':
				setMaxNum(6)
				break
			case 'corner':
				setMaxNum(5)
				break
			case 'e-z':
				setMaxNum(15)
				break
			case 'frenzy':
				setMaxNum(20)
				break
			default:
				break
		}

		createCard()
	}, [mode])

	const orderAndSet = num => {
		if (guess.includes(num)) return
		let length = 0
		switch (mode) {
			case 'mega':
				length = 6
				break
			case 'corner':
				length = 5
				break
			case 'e-z':
				length = 15
				break
			case 'frenzy':
				length = 20
				break
			default:
				return
		}
		return guess.length < length && setGuess([...guess, num].sort((a, b) => a - b))
	}

	const removeFromGuess = index => {
		let arr = [...guess]
		arr.splice(index, 1)
		setGuess(arr)
	}

	const playGame = mode => {
		let length = 0
		let index = 0
		let arr = []

		switch (mode) {
			case 'mega':
				length = 6
				index = 70
				break
			case 'corner':
				length = 5
				index = 80
				break
			case 'e-z':
				length = 15
				index = 60
				break
			case 'frenzy':
				length = 20
				index = 100
				break
			default:
				return
		}

		if (guess.length < length) return

		const shuffle = () => {
			let num = Math.ceil(Math.random() * index)
			return arr.includes(num) ? shuffle() : num
		}
		while (arr.length < length) {
			let num = shuffle()
			arr.push(num)
		}

		setResult(arr.sort((a, b) => a - b))
	}

	useEffect(() => {
		setMatches(guess.filter(num => result.includes(num)))
	}, [guess, result])

	const reset = () => {
		setGuess([])
		setResult([])
		setMatches([])
	}

	return (
		<div className="App">
			<main>
				<section className="mode">
					<Button className="mode-button mega-lotto" onClick={() => setMode('mega')}>
						<Stars />
						<h3>
							Mega Lotto
						</h3>
					</Button>
					<Button className="mode-button corner-lotto" onClick={() => setMode('corner')}>
						<Stars />
						<h3>
							Corner Lotto
						</h3>
					</Button>
					<Button className="mode-button e-z-lotto" onClick={() => setMode('e-z')}>
						<Stars />
						<h3>
							E-Z Lotto
						</h3>
					</Button>
					<Button className="mode-button frenzy-lotto" onClick={() => setMode('frenzy')}>
						<Stars />
						<h3>
							Frenzy Lotto
						</h3>
					</Button>
				</section>
				<div className={mode ? `${mode}-lotto` : ''}>
					{mode ?
						<h1><Mood /> {mode && `${mode} Lotto`}</h1>
					: 
						''
					}
				</div>
				<section className="card">
					{!mode ? 
					<p className="alert alert-warning">Sélectionnez une carte pour jouer</p> :
					<>
					<p className="alert alert-info">Sélectionner <strong>{maxNum}</strong> Nombres de la carte suivante:</p>
						<div className={`game-card ${mode}-card`}>
							{nums.map(num => <div key={num} className={`card-number${guess.includes(num) ? ` number-selected ${mode}-lotto` : ''}`} onClick={() => orderAndSet(num)}><span>{num}</span></div>)}
						</div>
						</>
					}
				</section>
				<section className="results">
					<div>
						<h2>Votre estimation</h2>
						<NumbersArea id="guesses">
							{guess.map((g, i) => {
								return (
									<div key={`guesses_${i}`}>
										<span>{g}</span>
										{!result.length && <div onClick={() => removeFromGuess(i)}>
											<Clear size={12} color={'white'} />
										</div>}
									</div>
								)
							})}
						</NumbersArea>
					</div>
					{!result.length ? null : <div>
						<h2>Résultats</h2>
						<NumbersArea id="results" array={result} />
					</div>}
					{!result.length ? null : <div>
						<h2>Vos chiffres gagnants</h2>
						{!result.length ? null : (matches.length === 0 && result.length > 0 ? <p>Vous n'avez aucun numéro gagnants</p> : <p>Vous avez gagnez les chiffres suivants:</p>)}
						<NumbersArea id="matches" array={matches} />
					</div>}
					<div id="buttons-wrapper">
						<Button className={`action-button ${mode}-lotto`} onClick={() => playGame(mode)} disabled={(guess.length !== maxNum || result.length) || (!guess.length && !result.length)}><PlayCircleFilled /> creer fiche!</Button>
						<Button className={`action-button ${mode}-lotto`} onClick={reset} disabled={!result.length}><HighlightOff /> clean</Button>
					</div>
				</section>
			</main>
		</div>
	);
}

export default Lotto;

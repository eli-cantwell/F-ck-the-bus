// Import getRandomNumber function //
import { getRandomNumber } from './random-number.js'

// Get card div elements //
const card1Div = document.getElementById('card-1')
const card2Div = document.getElementById('card-2')
const card3Div = document.getElementById('card-3')

// Get button elements //
const redButton = document.getElementById('red')
const blackButton = document.getElementById('black')
const higherButton = document.getElementById('higher')
const lowerButton = document.getElementById('lower')
const inButton = document.getElementById('in')
const outButton = document.getElementById('out')
const rulesButton = document.getElementById('rules')

// Create button event handlers //
redButton.onclick = redButtonFunction
blackButton.onclick = blackButtonFunction
higherButton.onclick = higherButtonFunction
lowerButton.onclick = lowerButtonFunction
inButton.onclick = inButtonFunction
outButton.onclick = outButtonFunction
rulesButton.onclick = rulesButtonFunction

// Creat variable that keeps track of card 1 and card 2's values //
let card1Value = 0
let card2Value = 0
let card1FaceValue = 0
let card2FaceValue = 0
let card3FaceValue = 0

// Create an array for the number generator to call from, so that you can remove the the selected value and avoid getting the same card //

let randomNumberArray = []

function setRandomNumberArray() {
  randomNumberArray = []

  // Create a loop that pushes 52 values into the randomNumberArray, from 1 to 52 //
  for (let i = 1; i <= 52; i++) {
    randomNumberArray.push(i)
  }
}

setRandomNumberArray()

// Create rules button function //

function rulesButtonFunction(e) {
  alert(
    'Step 1: Select either red or black. A card will be drawn, and if you selected the correct color, you move on to step 2. Otherwise, you drink once. \n\nStep 2: Select either higher or lower. A card will be drawn, and if it you chose higher and the card is higher than the first card, you move on to step 3. If not, you drink twice. If you get the same card, you double your drinks and drink 4 times. \n\nStep 3: Select either in or out. A card will be drawn, and if you selected in and the card is between the values of the first 2 cards, you win! If not, you drink 3 times. If the card is the same as either card 1 or card 2, you double your drinks and drink 6 times.'
  )
}

// Create play button functions //
function redButtonFunction(e) {
  // Draw random card and place it in the card-1 div //
  let randomNumber = getRandomNumber(0, 51)
  let randomCardNum1 = randomNumberArray[randomNumber]
  console.log('Random Number: ' + randomNumberArray[randomNumber])
  card1Div.innerHTML =
    '<img src="./images/' + randomCardNum1 + '.png" class="card-img">'

  // If card is black, wait .5 seconds, alert amount of drinks and reset the board //
  if (randomCardNum1 % 2 != 0) {
    setTimeout(function () {
      alert('Drink once')
      card1Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
    }, 500)
    // Reset the randomNumberArray //
    setRandomNumberArray()
  } else if (randomCardNum1 % 2 == 0) {
    // If card is red, hide the red/black buttons, show the higher/lower buttons //
    redButton.style.display = 'none'
    blackButton.style.display = 'none'
    higherButton.style.display = 'inline'
    lowerButton.style.display = 'inline'

    // Update card1Value and remove drawn card from the randomNumberArray //
    card1Value = randomCardNum1
    card1FaceValue = Math.ceil(randomCardNum1 / 4)
    randomNumberArray.splice(randomNumber, 1)
  }

  // Console.logs for debugging //
  console.log('Random Number Array Length: ' + randomNumberArray.length)
  console.log('Random Number Array Contents: ' + randomNumberArray)
  console.log('Card 1 current value: ' + card1Value)
  console.log('Card 1 current value / 4: ' + card1Value / 4)
  console.log('Card 1 current face value: ' + card1FaceValue)
}

function blackButtonFunction(e) {
  // Draw random card and place it in the card-1 div //
  let randomNumber = getRandomNumber(0, 51)
  let randomCardNum1 = randomNumberArray[randomNumber]
  console.log('Random Number: ' + randomNumberArray[randomNumber])
  card1Div.innerHTML =
    '<img src="./images/' + randomCardNum1 + '.png" class="card-img">'

  // If card is red, wait .5 seconds, alert amount of drinks and reset the board //
  if (randomCardNum1 % 2 == 0) {
    setTimeout(function () {
      alert('Drink once')
      card1Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
    }, 500)
    setRandomNumberArray()
  } else if (randomCardNum1 % 2 != 0) {
    // If card is black, hide the red/black buttons, show the higher/lower buttons //
    redButton.style.display = 'none'
    blackButton.style.display = 'none'
    higherButton.style.display = 'inline'
    lowerButton.style.display = 'inline'

    // Update card1Value and remove drawn card from the randomNumberArray //
    card1Value = randomCardNum1
    card1FaceValue = Math.ceil(randomCardNum1 / 4)
    randomNumberArray.splice(randomNumber, 1)
  }
  card

  // Console.logs for debugging //
  console.log('Random Number Array Length: ' + randomNumberArray.length)
  console.log('Random Number Array Contents: ' + randomNumberArray)
  console.log('Card 1 current value: ' + card1Value)
  console.log('Card 1 current value / 4: ' + card1Value / 4)
  console.log('Card 1 current face value: ' + card1FaceValue)
}

function higherButtonFunction(e) {
  // Draw random card and place it in the card-2 div //
  let randomNumber = getRandomNumber(0, 50)
  let randomCardNum2 = randomNumberArray[randomNumber]
  console.log('Random Number: ' + randomNumberArray[randomNumber])

  card2FaceValue = Math.ceil(randomCardNum2 / 4)

  card2Div.innerHTML =
    '<img src="./images/' + randomCardNum2 + '.png" class="card-img">'

  // If card is same as the previous card, wait .5 seconds, alert amount of drinks and reset the board //
  if (card2FaceValue == card1FaceValue) {
    setTimeout(function () {
      alert('Drink four times')
      card1Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card2Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
    }, 500)
    higherButton.style.display = 'none'
    lowerButton.style.display = 'none'
    redButton.style.display = 'inline'
    blackButton.style.display = 'inline'
    setRandomNumberArray()
  }

  // If card is lower than the previous card, wait .5 seconds, alert amount of drinks and reset the board //
  else if (randomCardNum2 < card1Value) {
    setTimeout(function () {
      alert('Drink twice')
      card1Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card2Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
    }, 500)
    higherButton.style.display = 'none'
    lowerButton.style.display = 'none'
    redButton.style.display = 'inline'
    blackButton.style.display = 'inline'
    setRandomNumberArray()
  } else if (randomCardNum2 > card1Value) {
    // If card is higher than the previous card, hide the higher/lower buttons, show the in/out buttons //
    higherButton.style.display = 'none'
    lowerButton.style.display = 'none'
    inButton.style.display = 'inline'
    outButton.style.display = 'inline'

    // Update card2Value and remove drawn card from the randomNumberArray //
    card2Value = randomCardNum2
    randomNumberArray.splice(randomNumber, 1)
  }

  // Console.logs for debugging //
  console.log('Random Number Array Length: ' + randomNumberArray.length)
  console.log('Random Number Array Contents: ' + randomNumberArray)
  console.log('Card 1 current value: ' + card1Value)
  console.log('Card 2 current value: ' + card2Value)
  console.log('Card 1 current value / 4: ' + card1Value / 4)
  console.log('Card 2 current value / 4: ' + card2Value / 4)
  console.log('Card 1 current face value: ' + card1FaceValue)
  console.log('Card 2 current face value: ' + card2FaceValue)
}

function lowerButtonFunction(e) {
  // Draw random card and place it in the card-2 div //
  let randomNumber = getRandomNumber(0, 50)
  let randomCardNum2 = randomNumberArray[randomNumber]
  console.log('Random Number: ' + randomNumberArray[randomNumber])
  card2FaceValue = Math.ceil(randomCardNum2 / 4)
  card2Div.innerHTML =
    '<img src="./images/' + randomCardNum2 + '.png" class="card-img">'

  // If card is same as the previous card, wait .5 seconds, alert amount of drinks and reset the board //
  if (card2FaceValue == card1FaceValue) {
    setTimeout(function () {
      alert('Drink four times')
      card1Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card2Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
    }, 500)
    higherButton.style.display = 'none'
    lowerButton.style.display = 'none'
    redButton.style.display = 'inline'
    blackButton.style.display = 'inline'
    setRandomNumberArray()
  }

  // If card is higher than the previous card, wait .5 seconds, alert amount of drinks and reset the board //
  else if (randomCardNum2 > card1Value) {
    setTimeout(function () {
      alert('Drink twice')
      card1Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card2Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
    }, 500)
    higherButton.style.display = 'none'
    lowerButton.style.display = 'none'
    redButton.style.display = 'inline'
    blackButton.style.display = 'inline'
    setRandomNumberArray()
  } else if (randomCardNum2 < card1Value) {
    // If card is lower than the previous card, hide the higher/lower buttons, show the in/out buttons //
    higherButton.style.display = 'none'
    lowerButton.style.display = 'none'
    inButton.style.display = 'inline'
    outButton.style.display = 'inline'

    // Update card2Value and remove drawn card from the randomNumberArray //
    card2Value = randomCardNum2
    randomNumberArray.splice(randomNumber, 1)
  }

  // Console.logs for debugging //
  console.log('Random Number Array Length: ' + randomNumberArray.length)
  console.log('Random Number Array Contents: ' + randomNumberArray)
  console.log('Card 1 current value: ' + card1Value)
  console.log('Card 2 current value: ' + card2Value)
  console.log('Card 1 current value / 4: ' + card1Value / 4)
  console.log('Card 2 current value / 4: ' + card2Value / 4)
  console.log('Card 1 current face value: ' + card1FaceValue)
  console.log('Card 2 current face value: ' + card2FaceValue)
}

function inButtonFunction(e) {
  // Draw random card and place it in the card-3 div //
  let randomCardNum3 = getRandomNumber(1, 52)
  card3Div.innerHTML =
    '<img src="./images/' + randomCardNum3 + '.png" class="card-img">'
  card3FaceValue = Math.ceil(randomCardNum3 / 4)
  // Set 2 variables to declare the lowest card and the highest card out of card1Value and card2Value

  let lowestCard = Math.min(card1Value, card2Value)
  let highestCard = Math.max(card1Value, card2Value)

  // If card value is the same as card1Value or card2Value, wait .5 seconds, alert amount of drinks and reset the board //
  if (card3FaceValue == card1FaceValue || card3FaceValue == card2FaceValue) {
    setTimeout(function () {
      alert('Drink 6 times')
      card1Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card2Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card3Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      inButton.style.display = 'none'
      outButton.style.display = 'none'
      redButton.style.display = 'inline'
      blackButton.style.display = 'inline'
      setRandomNumberArray()
    }, 500)
  }
  // If card value is outside of card1Value and card2Value, wait .5 seconds, alert amount of drinks and reset the board //
  else if (randomCardNum3 < lowestCard || randomCardNum3 > highestCard) {
    setTimeout(function () {
      alert('Drink three times')
      card1Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card2Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card3Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      inButton.style.display = 'none'
      outButton.style.display = 'none'
      redButton.style.display = 'inline'
      blackButton.style.display = 'inline'
      setRandomNumberArray()
    }, 500)
  } else if (randomCardNum3 > lowestCard && randomCardNum3 < highestCard) {
    // If card value is within card1Value and card2Value, hide the higher/lower buttons, show the in/out buttons //
    setTimeout(function () {
      alert('You win! Just kidding, start again.')
      inButton.style.display = 'none'
      outButton.style.display = 'none'
      redButton.style.display = 'inline'
      blackButton.style.display = 'inline'
      card1Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card2Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card3Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card1Value = 0
      card2Value = 0
      console.log('Card 1 Value: ' + card1Value)
      console.log('Card 2 Value: ' + card2Value)
      setRandomNumberArray()
    }, 500)
  }

  // Console.logs for debugging //
  console.log('Card 3 div inner HTML: ' + card3Div.innerHTML)
  console.log('randomCardNum3: ' + randomCardNum3)
  console.log('Card 1 current value / 4: ' + card1Value / 4)
  console.log('Card 2 current value / 4: ' + card2Value / 4)
  console.log('Card 1 current face value: ' + card1FaceValue)
  console.log('Card 2 current face value: ' + card2FaceValue)
  console.log('Card 3 current face value: ' + card3FaceValue)
}

function outButtonFunction(e) {
  // Draw random card and place it in the card-3 div //
  let randomCardNum3 = getRandomNumber(1, 52)
  card3Div.innerHTML =
    '<img src="./images/' + randomCardNum3 + '.png" class="card-img">'
  card3FaceValue = Math.ceil(randomCardNum3 / 4)
  // Set 2 variables to declare the lowest card and the highest card out of card1Value and card2Value

  let lowestCard = Math.min(card1Value, card2Value)
  let highestCard = Math.max(card1Value, card2Value)

  // If card value is the same as card1Value or card2Value, wait .5 seconds, alert amount of drinks and reset the board //
  if (card3FaceValue == card1FaceValue || card3FaceValue == card2FaceValue) {
    setTimeout(function () {
      alert('Drink 6 times')
      card1Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card2Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card3Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      inButton.style.display = 'none'
      outButton.style.display = 'none'
      redButton.style.display = 'inline'
      blackButton.style.display = 'inline'
      setRandomNumberArray()
    }, 500)
  }
  // If card value is inside of card1Value and card2Value, wait .5 seconds, alert amount of drinks and reset the board //
  else if (randomCardNum3 < highestCard && randomCardNum3 > lowestCard) {
    setTimeout(function () {
      alert('Drink three times')
      card1Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card2Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card3Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      inButton.style.display = 'none'
      outButton.style.display = 'none'
      redButton.style.display = 'inline'
      blackButton.style.display = 'inline'
      setRandomNumberArray()
    }, 500)
  } else if (randomCardNum3 < lowestCard || randomCardNum3 > highestCard) {
    // If card value is outside card1Value and card2Value, hide the higher/lower buttons, show the in/out buttons //
    setTimeout(function () {
      alert('You win! Just kidding, start again.')
      inButton.style.display = 'none'
      outButton.style.display = 'none'
      redButton.style.display = 'inline'
      blackButton.style.display = 'inline'
      card1Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card2Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card3Div.innerHTML =
        '<img src="./images/card-back.png" class="card-img" />'
      card1Value = 0
      card2Value = 0
      console.log('Card 1 Value: ' + card1Value)
      console.log('Card 2 Value: ' + card2Value)
      setRandomNumberArray()
    }, 500)
  }

  // Console.logs for debugging //
  console.log('Card 3 div inner HTML: ' + card3Div.innerHTML)
  console.log('randomCardNum3: ' + randomCardNum3)
  console.log('Card 1 current value / 4: ' + card1Value / 4)
  console.log('Card 2 current value / 4: ' + card2Value / 4)
  console.log('Card 1 current face value: ' + card1FaceValue)
  console.log('Card 2 current face value: ' + card2FaceValue)
  console.log('Card 3 current face value: ' + card3FaceValue)
}

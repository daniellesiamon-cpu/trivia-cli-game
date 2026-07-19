/**
 * Trivia CLI Game
 * Meets requirements: Functions, Arrays, Objects, Timers, and Array Iteration.
 */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Using an array of objects to store data
const quizData = [
    { question: "What is the time complexity of adding to the end of an array?", options: ["O(n)", "O(1)", "O(log n)"], answer: "O(1)" },
    { question: "What is the purpose of querySelectorAll?", options: ["Select first element", "Select all matching elements", "Create elements"], answer: "Select all matching elements" }
];

let score = 0;
let currentIdx = 0;
let timer;
const TIME_LIMIT = 10000; // 10 seconds

/**
 * Displays the current question and starts the timer.
 * Uses .forEach() to satisfy the Array Iteration requirement.
 */
function displayQuestion() {
    if (currentIdx >= quizData.length) {
        return endGame();
    }

    const currentQ = quizData[currentIdx];
    console.log(`\nQuestion ${currentIdx + 1}: ${currentQ.question}`);
    
    // Array iteration method requirement
    currentQ.options.forEach((opt, index) => {
        console.log(`${index + 1}. ${opt}`);
    });

    // Start Timer
    timer = setTimeout(() => {
        console.log("\n[!] Time's up!");
        processAnswer(null, currentQ);
    }, TIME_LIMIT);

    rl.question("Your choice (1-3): ", (input) => {
        clearTimeout(timer); // Stop timer if answered
        processAnswer(input, currentQ);
    });
}

/**
 * Validates user input against the correct answer.
 */
function processAnswer(input, q) {
    const choiceIdx = parseInt(input) - 1;
    const isCorrect = q.options[choiceIdx] === q.answer;

    if (isCorrect) {
        console.log(">> Correct!");
        score++;
    } else {
        console.log(`>> Incorrect. The answer was: ${q.answer}`);
    }

    currentIdx++;
    displayQuestion();
}

function endGame() {
    console.log(`\n--- Game Over ---`);
    console.log(`Final Score: ${score} / ${quizData.length}`);
    rl.close();
}

// Start the game
console.log("Welcome to the JavaScript Trivia!");
displayQuestion();

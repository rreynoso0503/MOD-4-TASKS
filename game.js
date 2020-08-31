const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions =[];

let questions = [
    {
        question: "At which pay-per view event did Stone Cold Steve Austin say his infamous 'Austin 3:16' line?",
        choice1: "King of the Ring",
        choice2: "Summer Slam",
        choice3: "Survivor Series",
        choice4: "Wrestle Mania XII",
        answer: 1
    },
    {
        question: "During which Wrestle Mania did the Undertaker begin his legendary Streak?",
        choice1: "Wrestle Mania X",
        choice2: "Wrestle Mania VI",
        choice3: "Wrestle Mania VIII",
        choice4: "Wrestle Mania VII",
        answer: 4
    },
    {
        question: "Who was the First Ever Undisputed Heavyweight Champion after winning both WWE and WCW Titles in one night?",
        choice1: "Triple H",
        choice2: "The Undertaker",
        choice3: "The Rock",
        choice4: "Chris Jericho",
        answer: 4
    },
    {
        question: "In what year, was the now Infamous, Montreal Screw Job?",
        choice1: "1996",
        choice2: "1997",
        choice3: "1998",
        choice4: "1999",
        answer: 2
    },
    {
        question: "Name the event in which Hulk Hogan joined Scott Hall and Kevin Nash to form the NWO?",
        choice1: "Starcade",
        choice2: "World War 3",
        choice3: "Bash at the Beach",
        choice4: "Great American Bash",
        answer: 3
    },
    {
        question: "Shawn Michaels, Triple H and Chyna were the orignal members of what controversial faction?",
        choice1: "The Degenerates",
        choice2: "Degeneration-X",
        choice3: "Alpha Group",
        choice4: "The Rebellion",
        answer: 2
    },
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => { 
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    
    getNewQuestion();
};


getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        // go to end of page
        return window.location.assign("end.html");
    }

    
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    // quiz progress
    
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100} % `;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
       

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        
        }, 1000);

    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();
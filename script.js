console.log("Hello, Grader! pls be nice...")
// Question Set  
const questionBucket = [
    {
        question: " What’s the first thing you should do once you encounter an emergency or abnormal situation?",
        answerA: "FLY THE PLANE",
        answerB: "DECLARE AN EMERGENCY",
        answerC: "SUMMON CAPT. SULLY",
        answerD: "RUN THE APPROPRIATE CHECKLIST",
        correctAnswer: "FLY THE PLANE"
    },   
    {
        question: " What is NOT an example of the 5 ‘Hazardous Attitudes’ defined by the FAA?",
        answerA: "ANTI-AUTHORITY",
        answerB: "IMPULSIVITY",
        answerC: "MACHO",
        answerD: "TIMID",
        correctAnswer: "TIMID"
    },
    {
        question: " What are the factors to consider while running your 'IMSAFE' checklist before you fly?",
        answerA: "ILLNESS",
        answerB: "FATIGUE",
        answerC: "EMOTION",
        answerD: "ALL",
        correctAnswer: "ALL"
    },
    {
        question: " Risk mitigation is paramount to a safe operation, and running the ‘PAVE’ model can help detect threats you may encounter during your flight. What is an example of an ‘External Pressure’?",
        answerA: "GPS IS INOPERATIVE",
        answerB: "DESIRED RUNWAY CLOSED",
        answerC: "SPECIAL PASSENGER",
        answerD: "BAD WEATHER",
        correctAnswer: "SPECIAL PASSENGER"
    },
    {
        question: " 'Taking chances is foolish' is the antidote to what ‘Hazardous Attitude’?",
        answerA: "INVULNERABLE",
        answerB: "MACHO",
        answerC: "RESIGNATION",
        answerD: "IMPULSIVITY",
        correctAnswer: "MACHO"
    }, 
    {
        question: " If you’re not instrument rated what would the ‘level of severity’ for flying into an area of IMC be?",
        answerA: "CATASTROPHIC",
        answerB: "NEGLIGIBLE",
        answerC: "MARGINAL",
        answerD: "CRITICAL",
        correctAnswer: "CATASTROPHIC"
    },
    {
        question: " What checklist should every pilot do to gauge their physical fitness to fly?",
        answerA: "IMSAFE",
        answerB: "PAVE",
        answerC: "CRM",
        answerD: "ADM",
        correctAnswer: "IMSAFE"
    },
    {
        question: " 'Do it quickly!' – is an example of which ‘Hazardous Attitude’?",
        answerA: "IMPULSIVITY",
        answerB: "ANTI-AUTHORITY",
        answerC: "MACHO",
        answerD: "RESIGNATION",
        correctAnswer: "IMPULSIVITY"
    },
    {
        question: " The pilot’s job is to manage risk, not create hazards. What is one way a pilot can manage ‘External Pressures’ safely?",
        answerA: "LOWER PERSONAL MINIMUMS",
        answerB: "IGNORE MINOR DAMAGE",
        answerC: "STICK TO THE SCHEDULE",
        answerD: "EXPECT AND PLAN FOR DELAYS",
        correctAnswer: "EXPECT AND PLAN FOR DELAYS"
    },
    {
        question: " What’s the average time it takes for a non-instrument rated pilot to get spatially disoriented after entering IMC, which often leads to a catastrophic conclusion?",
        answerA: "18 minutes",
        answerB: "27 minutes",
        answerC: "3 minutes",
        answerD: "9 minutes",
        correctAnswer: "3 minutes"
    }
]
// DOM ELEMENTS //
var startButton = $("#startBtn");
var nextButton = $("#nextBtn");
var timerButton = $("#timerBtn");
var endButton = $("#endBtn");
var restartButton= $("#restartBtn")

var answerButton = $(".answerBtn");
var answerButtonA = $("#answer-A");
var answerButtonB = $("#answer-B");
var answerButtonC = $("#answer-C");
var answerButtonD = $("#answer-D");
var answerButtonEl = $(".answer-btn-container");

var questionText = $(".question-text");
var quizContainerEl = $(".quiz-container");
var scoresContainerEl = $(".scores-container");
var scoresList = $("#scores-list");

var quizTimer;
var timeRemain;
var shuffledQuestions;
var currentQuestionIndex;

let userInput= "";
console.log(userInput);



// CLICK EVENTS 

// Start button to start quiz
startButton.on("click", startQuiz);

// Next Button to select next question
nextButton.on("click", () => {
    currentQuestionIndex++
    nextQuestion(); 
});
// Restart the Quiz
restartButton.on("click", () => {
    scoresContainerEl.addClass("hide");
    quizContainerEl.removeClass("hide");
    
    // I want to bring back to home page with functions refreshed 
});

endButton.on("click", () => {
    // log time remaining in local storage setItem
    
    // end timer here 
    clearInterval(quizTimer);
    quizContainerEl.addClass("hide");
    scoresContainerEl.removeClass("hide");
    // Prompts for user to submit 
    userInput = prompt("Please enter your initials.");
    localStorage.setItem(timeRemain, userInput);
    localStorage.getItem(timeRemain, userInput);
    // pull local storage getItem
    // var score = {
    //     userName: name,
    //     userScore: score
    // }
    // append items <li>

    // console.log(userInput);
});

// FUNCTION TO START QUIZ
function startQuiz() {
    // console.log("begin the celebration of knowledge!"); //
    startButton.addClass("hide");
    timerButton.removeClass("hide");
    answerButtonEl.removeClass("hide");
    shuffledQuestions = questionBucket.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;

    timeRemain = 200;
    quizTimer = setInterval(() => {
        timeRemain--;
        timerButton.text("Time Remaining: " + timeRemain);

        if (timeRemain < 20){
            timerButton.css("background", "rgba(235, 60, 60, 0.829)");
        };

        if(timeRemain === 0){
            clearInterval(quizTimer);
            timerButton.addClass("hide");
            // get scores
            endQuiz();
        };

    }, 1000);

    nextQuestion();
};

// GRABBING NEXT QUESTION AND CHECKING PASSWORD BANK //
function nextQuestion() {
    if (shuffledQuestions.length === currentQuestionIndex) {
        endQuiz()
    } else {
       showQuestion(shuffledQuestions[currentQuestionIndex])
    }
};
// FUNCTION TO SHOW OUR PASSWORD AND ANSWER TEXT //
function showQuestion(question) {
    
    // Putting the question from obj array into the question-text
    questionText.text(question.question);
    // Putting answers into the answerBtn text
    answerButtonA.text(question.answerA);
    answerButtonB.text(question.answerB);
    answerButtonC.text(question.answerC);
    answerButtonD.text(question.answerD);

    nextButton.addClass("hide");

    selectAnswer();
};

// SELECTING ANSWER AND CHECKING IF CORRECT //
function selectAnswer() {
    answerButtonEl.on("click", (event) => {
        if (event.target.matches("button")) {
        //   console.log(event.target.textContent);
        if (event.target.textContent === questionBucket[currentQuestionIndex].correctAnswer) 
           {
            nextButton.removeClass("hide");
            console.log("WOO!");
           } else {
            timeRemain -= 5
           }
        }  
    });
};

// QUIZ IS DONE LETS GET A SCORE UP ON THE SCORE SHEET // 
function endQuiz() {
        timerButton.addClass("hide");
        nextButton.addClass("hide");
        endButton.removeClass("hide");
};


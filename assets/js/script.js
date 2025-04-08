document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const startScreen = document.getElementById("start-screen");
    const wrapper = document.getElementById("wrapper");
    const question = document.getElementById("question");
    const answer0 = document.getElementById("answer0");
    const answer1 = document.getElementById("answer1");
    const answer2 = document.getElementById("answer2");
    const answer3 = document.getElementById("answer3");
    const scoreArea = document.getElementById("score");
    const playAgain = document.getElementById("playAgain");

    let currentQuestion = 0;
    const questions = [
        {
            "question": "Who makes the best books in Sweden?",
            "answers": ["abc books", "massaman", "fred", "harry"],
            "correct": 1
        },
        {
            "question": "What is after 3?",
            "answers": ["five", "zero", "one", "two"],
            "correct": 0
        },
        // Update the placeholder questions and add new ones so there's 8 - 10 questions in total 
    ];

    // Function to load question and answers
    function loadQuestion() {
        question.innerText = questions[currentQuestion].question;
    }

    function loadAnswers() {
        const answers = questions[currentQuestion].answers;
        answer0.innerText = answers[0];
        answer1.innerText = answers[1];
        answer2.innerText = answers[2];
        answer3.innerText = answers[3];
    }

    /** 
     * Function to start the quiz
     */
    function startQuiz() {
        // Hide play again section
        playAgain.style.display = "none";
        if (currentQuestion < questions.length) {
            loadQuestion();
            loadAnswers();
        } else {
            // End of the quiz
            wrapper.style.display = "none";
            playAgain.style.display = "inline-block";
            console.log("It's the end of the quiz!");
        }
    }

    /**
     * function to check the answers and increment the score if correct
     */
    function checkAnswer(answerSelected) {
        const correctAnswer = questions[currentQuestion].correct;
        if (answerSelected === correctAnswer) {
            score++; // Increment score
            scoreArea.innerText = score; // Update score display
        }
        currentQuestion++; // Shows next question
        startQuiz();
    }

    // Event listener for Start button
    startBtn.addEventListener("click", () => {
        startScreen.style.display = "none"; // Hide start screen
        wrapper.style.display = "block"; // Show quiz wrapper
        startQuiz(); // Start the quiz by loading the first question and answers
    });

    // Event listeners for the answwer buttons
    answer0.addEventListener("click", () => checkAnswer(0));
    answer1.addEventListener("click", () => checkAnswer(1));
    answer2.addEventListener("click", () => checkAnswer(2));
    answer3.addEventListener("click", () => checkAnswer(3));
});
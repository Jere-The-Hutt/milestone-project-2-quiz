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
    const playAgainBtn = document.getElementById("playAgain-btn");


    let currentQuestion = 0;
    let score = 0;

    const questions = [
        {
            "question": "Which of the following is one of Darth Vader's most famous quotes?",
            "answers": ["Luke, I am your father", "No, I am your father", "I am your father's cousin's nephew's former roommate", "The force will be with you"],
            "correct": 1
        },
        {
            "question": "Which duo created the comic book hero, Captain America?",
            "answers": ["Stan Lee & Steve Ditko", "Daryl Hall & John Oates", "Joe Simon & Jack Kirby", "Bob Kane & Bill Finger"],
            "correct": 2
        },
        {
            "question": "Which rock band recorded several songs for the 1986 fantasy action-adventure film Highlander?",
            "answers": ["Queen", "Kiss", "AC/DC", "Def Leppard"],
            "correct": 0
        },
        {
            "question": "Before being replaced by Mark Ruffalo starting with The Avengers in 2012, what other actor first played the Hulk in the Marvel Cinematic Universe?",
            "answers": ["Eric Bana", "Guy Pearce", "Jeremy Renner", "Edward Norton"],
            "correct": 3
        },
        {
            "question": "Which video game won Game of the Year at The Game Awards 2023?",
            "answers": ["Spider-Man 2", "Resident Evil 4", "Alan Wake 2", "Baldur's Gate 3"],
            "correct": 3
        },
        {
            "question": "What year was Frank Herbert's epic science fiction novel Dune published?",
            "answers": ["1963", "1971", "1965", "1967"],
            "correct": 2
        },
        // Update the placeholder questions and add new ones so there's 8 - 10 questions in total 
    ];

    /**
     * Function to load question
     */
    function loadQuestion() {
        question.innerText = questions[currentQuestion].question;
    }

    /**
     * Function to load answers
     */
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

            const finalScore = document.getElementById("final-score");
            let message = "";

            const percent = (score / questions.length) * 100;

            if (percent === 100) {
                message = "Perfect score! You're a nerd master!";
            } else if (percent >= 80) {
                message = "Great job!";
            } else if (percent >= 50) {
                message = "Pretty good! Try again to improve.";
            } else {
                message = "Better luck next time!";
            }

            finalScore.innerText = `You scored ${score} out of ${questions.length}.\n${message}`;
        }
    }

    /**
     * function to check the answers and increment the score if correct
     */
    function checkAnswer(answerSelected) {
        const correctAnswer = questions[currentQuestion].correct;

        const buttons = [answer0, answer1, answer2, answer3];

        // Disables all options
        buttons.forEach((btn) => {
            btn.classList.add("disabled");
        });

        // Colors the clicked answer
        if (answerSelected === correctAnswer) {
            buttons[answerSelected].classList.add("correct");
            score++;
            scoreArea.innerText = score;
        } else {
            buttons[answerSelected].classList.add("wrong");
            // Shows the correct answer
            buttons[correctAnswer].classList.add("correct");
        }

        // Wait a bit before moving to next question
        setTimeout(() => {
            // Remove added classes
            buttons.forEach((btn) => {
                btn.classList.remove("correct", "wrong", "disabled");
            });

            currentQuestion++;
            startQuiz();
        }, 1000); // Waits for 1 second before moving on to the next question
    }


    // Event listener for Start button
    startBtn.addEventListener("click", () => {
        startScreen.style.display = "none"; // Hide start screen
        wrapper.style.display = "block"; // Show quiz wrapper
        startQuiz(); // Start the quiz by loading the first question and answers
    });

    // Event listeners for the answer buttons
    answer0.addEventListener("click", () => checkAnswer(0));
    answer1.addEventListener("click", () => checkAnswer(1));
    answer2.addEventListener("click", () => checkAnswer(2));
    answer3.addEventListener("click", () => checkAnswer(3));

    // Event listener for the Play Again button
    playAgainBtn.addEventListener("click", () => {
        // Reset the quiz
        currentQuestion = 0;
        score = 0;
        scoreArea.innerText = score; // Resets the score display
        playAgain.style.display = "none"; // Hide the play again button
        wrapper.style.display = "block"; // Show quiz wrapper
        startQuiz(); // Starts a new game from the first question
    });
});
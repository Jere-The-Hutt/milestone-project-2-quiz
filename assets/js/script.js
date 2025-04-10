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
    let timerInterval;
    let timeLeft = 15; // seconds per question
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
        {
            "question": "In The Lord of the Rings, what is the Elvish name for Rivendell?",
            "answers": ["Imladris", "Lothlórien", "Valinor", "Minas Tirith"],
            "correct": 0
        },
        {
            "question": "In the Watchmen graphic novel, what is the real name of Rorschach?",
            "answers": ["Leroy Jenkins", "Edward Blake", "Walter Kovacs", "Jon Osterman"],
            "correct": 2
        },
        {
            "question": "In the Star Wars prequel trilogy, who originally commissioned the creation of the clone army?",
            "answers": ["Jedi Master Sifo-Dyas", "Count Dooku", "Palpatine", "Mace Windu"],
            "correct": 0
        },
        {
            "question": "What is the name of the magical device used to store and view memories in the Harry Potter series?",
            "answers": ["Horcrux", "Pensieve", "Deluminator", "Time-Turner"],
            "correct": 1
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
    * Starts a countdown timer for the current question
    * - Initializes the time limit
    * - Automatically calls handleTimeout() when time runs out
    */
    function startTimer() {
        timeLeft = 15;
        document.getElementById("timer").innerText = `Time remaining: ${timeLeft}`;

        timerInterval = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").innerText = `Time remaining: ${timeLeft}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeout();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function handleTimeout() {
        // Disable and show correct answer like a wrong choice
        const correctAnswer = questions[currentQuestion].correct;
        const buttons = [answer0, answer1, answer2, answer3];

        buttons.forEach((btn, index) => {
            btn.classList.add("disabled");
            if (index === correctAnswer) {
                btn.classList.add("correct");
            }
        });

        // Move to next question after short delay
        setTimeout(() => {
            buttons.forEach((btn) => {
                btn.classList.remove("correct", "wrong", "disabled");
            });
            currentQuestion++;
            startQuiz();
        }, 1600); // Waits for 1.6 second before moving on to the next question
    }

    /** 
     * Function to start the quiz
     */
    function startQuiz() {

        // Stop any existing timer
        stopTimer();

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
        startTimer();
    }

    /**
     * function to check the answers and increment the score if correct
     */
    function checkAnswer(answerSelected) {
        stopTimer();
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
        }, 1600); // Waits for 1.6 second before moving on to the next question
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
        stopTimer(); // Stop any active timer
        startQuiz(); // Starts a new game from the first question
    });
});
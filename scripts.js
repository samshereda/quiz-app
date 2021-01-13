/* eslint-disable indent */
// eslint-disable-next-line strict
$(function(){
    const STORE = {
        quizStarted: false,
        questionNumber: 0,
        questions:[
            {
                question: 'How many eyes do bees have?',
                answers: ['2','5','6','8'],
                correctAnswer: 1,
                playerAnswer: null
            },
            {
                question: 'What is the only marsupial native to North America?',
                answers: ['Raccoon','Beaver','Black-Footed Ferret','Opossum'],
                correctAnswer: 3,
                playerAnswer: null
            },
            {
                question: 'Which "bear" is not a true bear?',
                answers: ['Koala Bear','Spectacled Bear','Giant Panda','Sloth Bear'],
                correctAnswer: 0,
                playerAnswer: null
            },
            {
                question: 'What is the largest fish?',
                answers: ['Ocean Sunfish','Blue Whale','Whale Shark','Great White Shark'],
                correctAnswer: 2,
                playerAnswer: null
            },
            {
                question: 'What is NOT TRUE about sloths?',
                answers: ['Sloths sleep up to 18 hours a day','Sloths can hold their breath for up to 40 minutes','Sloths will sometimes eat bird eggs','Sloths spend their entire lives hanging from trees'],
                correctAnswer: 3,
                playerAnswer: null
            }
        ]
    };

    function render(){
        //render the quiz app
        if (STORE.quizStarted){
            if(STORE.questionNumber >= STORE.questions.length){
                $('main').html(generateFinalPage());
            } else if (STORE.questions[STORE.questionNumber].playerAnswer !== null){
                const question = STORE.questions[STORE.questionNumber];
                $('main').html(generateAnswerPage(question.correctAnswer === question.playerAnswer));
            } else {
                $('main').html(generateQuestionPage());
            }
        } else {
            $('main').html('<h1>Welcome to the Animal Quiz.</h1>'+generateStartPage());
        }
    }

    function generateStartPage(){
        return `<h2>Ready to start?</h2>
        <button class="button" id='start-quiz'><span>Start!</span></button>`;
    }

    function generateQuestionPage(){
        //Generate an html string from the question
        let question = STORE.questions[STORE.questionNumber];
        return `<h2>Question ${STORE.questionNumber+1}</h2>
        <h3>${question.question}</h3>
        <form class="question">
        <input type="radio" id="0" name = "answer" value = 0 required>
        <label for="0">${question.answers[0]}</label><br>
        <input type="radio" id="1" name = "answer" value = 1>
        <label for="1">${question.answers[1]}</label><br>
        <input type="radio" id="2" name = "answer" value = 2>
        <label for="2">${question.answers[2]}</label><br>
        <input type="radio" id="3" name = "answer" value = 3>
        <label for="3">${question.answers[3]}</label><br>
        <input class="button" type="submit" value="Submit"></form>
        <p>You've answered ${getScore()} questions correctly.</p>`;
    } 

    function generateAnswerPage(correct){
        //Generate an html string for the answer page
        let pageText;
        let button;
        if (correct){
            pageText = `<h2>Question ${STORE.questionNumber+1}</h2>
            <h3>Correct!</h3>
            <p>The correct answer is: ${STORE.questions[STORE.questionNumber].answers[STORE.questions[STORE.questionNumber].correctAnswer]}</p>`;
        } else {
            pageText = `<h2>Question ${STORE.questionNumber+1}</h2>
            <h3>Incorrect.</h3>
            <p>The correct answer is: ${STORE.questions[STORE.questionNumber].answers[STORE.questions[STORE.questionNumber].correctAnswer]}</p>`;
        }
        if (STORE.questionNumber>=STORE.questions.length - 1){
            button = 'Finish';
        } else {
            button = 'Next question';
        }
        console.log(STORE.questionNumber, STORE.questions.length);
        return `${pageText}
        <button class="button next-question">
            <span>${button}</span>
        </button>
        <p>You've answered ${getScore()} questions correctly.</p>`;
        
    }

    function generateFinalPage(){
        return `<p>You have completed the quiz. You answered ${getScore()} out of ${STORE.questions.length} questions correctly.</p>
            <button class="button restart-quiz"><span>Restart</span></button>`;
    }

    function getScore(){
        let score = 0;
        STORE.questions.forEach(q => {
            if (q.playerAnswer === q.correctAnswer){
                score++;
            }
        });
        return score;
    }

    function handleAnswer(){
        //Take answer input and add to score
        $('.quiz').on('submit','.question', event => {
            event.preventDefault();
            const answer = parseInt($('input[name=answer]:checked','.question').val());
            STORE.questions[STORE.questionNumber].playerAnswer = answer;
            render();
        });
    }

    function handleStartQuiz(){
        //Start quiz when button is pressed
        $('.quiz').on('click','#start-quiz', event => {
            STORE.quizStarted = true;
            render();
        });
    }

    function handleNextQuestion(){
        //Show the next question after going to the answer page
        $('.quiz').on('click','.next-question', event => {
            STORE.questionNumber++;
            render();
        });
    }

    function handleRestart(){
        $('.quiz').on('click','.restart-quiz', event => {
            STORE.quizStarted=false;
            STORE.questionNumber = 0;
            STORE.questions.forEach(q => {
                q.playerAnswer = null;
            });
            render();
        });
    }

    render();
    handleStartQuiz();
    handleAnswer();
    handleNextQuestion();
    handleRestart();
    
});
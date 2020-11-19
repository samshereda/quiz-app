/* eslint-disable indent */
// eslint-disable-next-line strict
$(function(){
    let quizStarted = false;
    let score = 0;
    let questionNumber = 0;

    const QUESTIONS = [
        {
            question: 'How many eyes do bees have?',
            answers: ['2','5','6','8'],
            correctAnswer: 1
        },
        {
            question: 'What is the only marsupial native to North America?',
            answers: ['Raccoon','Beaver','Black-Footed Ferret','Opossum'],
            correctAnswer: 3
        },
        {
            question: 'Which "bear" is not a true bear?',
            answers: ['Koala Bear','Spectacled Bear','Giant Panda','Sloth Bear'],
            correctAnswer: 0
        },
        {
            question: 'What is the largest fish?',
            answers: ['Ocean Sunfish','Blue Whale','Whale Shark','Great White Shark'],
            correctAnswer: 2
        },
        {
            question: 'What is NOT TRUE about sloths?',
            answers: ['Sloths sleep up to 18 hours a day','Sloths can hold their breath for up to 40 minutes','Sloths will sometimes eat bird eggs','Sloths spend their entire lives hanging from trees'],
            correctAnswer: 3
        }
    ];

    function render(){
        //render the quiz app
        console.log('`render` ran')
        if (quizStarted){
            generateQuestion(questionNumber);
        } else {
            $('.quiz').html(`<h2>Ready to start?</h2>
                <button class="button" id='start-quiz'><span>Start!</span></button>`);
            startQuiz();

        }
    }

    function generateQuestion(){
        //Generate an html string from the question
        let question = QUESTIONS[questionNumber];
        $('.quiz').html(`<form class="question">
        <h2>Question ${questionNumber+1}</h2>
        <h3>${question.question}</h3>
        <input type="radio" id="${question.answers[0]}" name = "quiz" value = "${question.answers[0]}" required>
        <label for="${question.answers[0]}">${question.answers[0]}</label><br>
        <input type="radio" id="${question.answers[1]}" name = "quiz" value = "${question.answers[1]}">
        <label for="${question.answers[1]}">${question.answers[1]}</label><br>
        <input type="radio" id="${question.answers[2]}" name = "quiz" value = "${question.answers[2]}">
        <label for="${question.answers[2]}">${question.answers[2]}</label><br>
        <input type="radio" id="${question.answers[3]}" name = "quiz" value = "${question.answers[3]}">
        <label for="${question.answers[3]}">${question.answers[3]}</label><br>
        <input class="button" type="submit" value="Submit"></form>`)
        handleAnswer(question);
    } 

    function generateAnswerPage(correct){
        //Generate an html string for the answer page
        let pageText;
        if (correct){
            score++;
            pageText = `<h2>Question ${questionNumber+1}</h2>
            <h3>Correct!</h3>
            <p>The correct answer is: ${QUESTIONS[questionNumber].answers[QUESTIONS[questionNumber].correctAnswer]}</p>`;
        } else {
            pageText = `<h2>Question ${questionNumber+1}</h2>
            <h3>Incorrect.</h3>
            <p>The correct answer is: ${QUESTIONS[questionNumber].answers[QUESTIONS[questionNumber].correctAnswer]}</p>`;
        }

        if(questionNumber === QUESTIONS.length-1){
            $('.quiz').html(pageText+`<p>You have completed the quiz. You answered ${score} out of ${QUESTIONS.length} questions correctly.</p>`)
        } else {
            $('.quiz').html(pageText+'<button class="button next-question"><span>Next question</span></button>')
            questionNumber++;
            nextQuestion();
        }
        
    }

    function handleAnswer(q){
        //Take answer input and add to score
        $('.question').submit(function(event) {
            event.preventDefault();
            console.log('`handleAnswer` ran');
            generateAnswerPage(document.getElementById(q.answers[q.correctAnswer]).checked);
        });
    }

    function startQuiz(){
        //Start quiz when button is pressed
        $('.quiz').on('click','#start-quiz', event => {
            console.log('`startQuiz` ran');
            quizStarted = true;
            render();
        });
    }

    function nextQuestion(){
        //Show the next question after going to the answer page
        console.log('`nextQuestion` ran')
        $('.quiz').on('click','.next-question', event => {
            render();
        });
    }

    render();
    
});
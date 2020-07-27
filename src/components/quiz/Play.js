import React,{Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import questionsarr from '../../questions.json';
import isEmpty from '../../utils/is-empty';
import Random from '../../utils/get-random';
// import M from 'materialize-css';
class Play extends Component{
    constructor(props){
        super(props);
        this.state={
            clicked:false,
           questions:questionsarr[Random()],
           currentQuestion:{},
           nextQuestion:{},
           previousQuestion:{},
           answer:'',
           numberOfQuestions:10,
           numberOfAnsweredQuestions:0,
           currentQuestionIndex:0,
           score:0,
           correctAnswers:0,
           wrongAnswers:0
        };
    }
    componentDidMount(){
        const {questions,currentQuestion,nextQuestion,previousQuestion} = this.state;
        this.displayQuestions(questions,currentQuestion,nextQuestion,previousQuestion);
    }
    displayQuestions =(questions =this.state.questions,currentQuestion,nextQuestion,previousQuestion)=>{
         
        let {currentQuestionIndex}=this.state;
        if(!isEmpty(this.state.questions)){
            questions=this.state.questions;
            currentQuestion=questions[currentQuestionIndex];
            nextQuestion=questions[currentQuestionIndex+1];
            previousQuestion=questions[currentQuestionIndex-1];
            const answer=currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer
            });
        }
    };
    changeColor(){
        document.getElementById("op1").style.background= '#1da1f2';
        document.getElementById("op2").style.background= '#1da1f2';
        document.getElementById("op3").style.background= '#1da1f2';
        document.getElementById("op4").style.background= '#1da1f2';
    }
    handlepreviousQuestion =()=>{
        this.setState(prevState=>({
            clicked:false
        }));
        if(this.state.previousQuestion!== undefined){
            this.changeColor();
            this.setState(prevState=>({
                currentQuestionIndex: prevState.currentQuestionIndex-1,
            }),()=>{
                this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            });
            
        } 
    }
    handlequit =()=>{
        if(window.confirm('Are you sure want to Quit?')){
            this.props.history.push('/');
        }
    }
    handlenextQuestion= ()=>{
        this.setState(prevState=>({
            clicked:false
        }));
        if(this.state.nextQuestion!== undefined){
        this.changeColor();
        this.setState(prevState=>({
            currentQuestionIndex: prevState.currentQuestionIndex+1,
        }), () =>{
            
            this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
             
        });
    }
    else{
        this.endGame();
    }   
    }
    handleOptionClick = (e) => {
        if(this.state.clicked===false){
        if(e.target.innerHTML === this.state.answer){
            this.correctAnswer();
             document.getElementById(e.target.id).style.background= 'green';
        }
        else{
            this.wrongAnswer();
           document.getElementById(e.target.id).style.background= 'red';
        }
        this.setState(prevState=>({
            clicked:!prevState.clicked
        }));
    }
    // console.log(this.state.clicked);
    }
    correctAnswer = () =>{
        this.setState(prevState =>({
            score:prevState.score + 1,
            correctAnswers: prevState.correctAnswers+1,
            // currentQuestionIndex: prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1,
        }));
    }
    wrongAnswer = () =>{
        this.setState(prevState =>({
            wrongAnswers: prevState.wrongAnswers+1,
            // currentQuestionIndex: prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1,
        }));
    }
    endGame =() =>{
        alert("Quiz has ended!");
        const {state}=this;
        const playerStats={
            score:state.score,
            numberOfQuestions:state.numberOfQuestions,
            correctAnswers:state.correctAnswers,
            wrongAnswers:state.wrongAnswers,
            numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
        };
        // console.log(playerStats);
        setTimeout(()=>{
            this.props.history.push("/play/quizSummary",playerStats);
        },1000);
    }
    render(){
        const {currentQuestion}=this.state;
        return(
            <Fragment>
                <Helmet><title>Quiz Page</title></Helmet>
                <div className="questions">
                    <h3>Quiz</h3>
                    <div>
                        <p>
                            <span >{this.state.currentQuestionIndex+1} of 10</span>
                        </p>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option" id="op1">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option" id="op2">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option" id="op3">{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className="option" id="op4">{currentQuestion.optionD}</p>
                    </div>
                    <div className="button-container">
                        <button onClick={this.handlepreviousQuestion}>Previous</button>
                        <button onClick={this.handlenextQuestion}>Next</button>
                        <button onClick={this.handlequit}>Quit</button>
                    </div>
                </div>
                
            </Fragment>
        );
    }
}
export default Play;
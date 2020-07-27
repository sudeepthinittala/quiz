import React,{Component, Fragment} from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';
 class QuizSummary extends Component{
    constructor(props){
        super(props);
        this.state={
           numberOfQuestions:10,
           numberOfAnsweredQuestions:0,
           score:0,
           correctAnswers:0,
           wrongAnswers:0
        };
    }
    componentDidMount(){
        const {state} = this.props.location;
        if(state){
        this.setState({
            score:(state.score/state.numberOfQuestions) *100,
            numberOfQuestions:10,
           numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
           correctAnswers:state.correctAnswers,
           wrongAnswers:state.wrongAnswers
        });
        }
    }
     render(){
       const {state}=this.props.location;
       let stats,remark;
       if(this.state.score<=30){
        remark='You need to practice more!';
       }else if(this.state.score >30 && this.state.score<=50){
           remark='Better luck next Time!';
       }else if(this.state.score> 50 && this.state.score<=70){
           remark='Can do better!';
       }else if(this.state.score>70 && this.state.score<=85){
           remark='You did Great!';
       }else if(this.state.score>85){
           remark='You are genius!';
       }
       if(state!==undefined){
           stats=(
               <Fragment>
            <h1 className="heading">Quiz has ended</h1>
            <div className="container">
                <h4>{remark}</h4>
                <h2>Your Score: {this.state.score.toFixed(0)}</h2>
                <span className="stat left"> Number of Questions:</span>
                <span className="stat right"> {this.state.numberOfQuestions}</span><br></br>
                <span className="stat left"> Number of Answered Questions:</span>
                <span className="stat right"> {this.state.numberOfAnsweredQuestions}</span><br></br>
                <span className="stat left"> Number of Correct Answeres:</span>
                <span className="stat right"> {this.state.correctAnswers}</span><br></br>
                <span className="stat left"> Number of Wrong Answers:</span>
                <span className="stat right"> {this.state.wrongAnswers}</span><br></br>
                
                
            </div>
            <section className="button-container">
                <span><Link className="return-button"to="/">Return back</Link></span>
                <span><Link className="play-button" to="/play/quiz">Play Again</Link></span>
            </section>
            </Fragment>
           );
       }
         return (
           <Fragment>
               <Helmet><title>Quiz Summary</title></Helmet>
               {stats}
           </Fragment>
         );
     }
 }
 export default QuizSummary;
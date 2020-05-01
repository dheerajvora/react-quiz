import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './assets/style.css';
import quizService from './quizService';
import QuestionBox from './components/QuestionBox'
import Result from './components/Result'



class QuizBee extends Component {
    state = {
        questionBank: [],
        score: 0,
        responser: 0
    };
    playAgain = () => {
        this.getQuestions();
        this.setState({
            score: 0,
            responser: 0
        })
    }
    computeAnswer = (answer, correctAnswer) => {
        if (answer == correctAnswer) {
            this.setState({
                score: this.state.score + 1
            })
        }
        this.setState({
            responser: (this.state.responser < 5) ? this.state.responser + 1 : 5
        })
    }
    getQuestions = () => {
        quizService().then(question => {
            this.setState({
                questionBank: question
            })
        })
    }
    componentDidMount() {
        this.getQuestions();
    }
    render() {
        return (
            <div className="container">
                <div className="title">QuizBee</div>
                {
                    this.state.questionBank.length > 0 &&
                    this.state.responser < 5 &&
                    this.state.questionBank.map(({ question, answers, correct, questionId }) =>
                        (<QuestionBox
                            question={question}
                            options={answers}
                            key={questionId}
                            selected={answers => this.computeAnswer(answers, correct)}
                        />)
                    )
                }
                {
                    this.state.responser == 5 ? (<Result
                        score={this.state.score}
                        playAgain={this.playAgain}
                    />) : null
                }
            </div>
        );
    }
}
ReactDOM.render(<QuizBee />, document.getElementById("root"));
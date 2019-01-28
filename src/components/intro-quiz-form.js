import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {answerQuestion} from '../actions/questions';
import Input from './input';
import {required} from '../validators';


export class IntroQuizForm extends React.Component {
    onSubmit(values) {
        console.log(values);
        let questionId = Object.keys(values)[0];
        this.props.dispatch(answerQuestion(questionId,values[questionId]));
    }
//string seperated by white space javascript split function takea the first as the Q_id and 2nd value is value conditioning upon the white space
//string=string
//questionID= split(0,1)
//questionvalue= split(1,1)
    render() {
        const QuestionIndex = this.props.userAnswers.length;
        const question = this.props.Questions[QuestionIndex];

        return (
            
            <form
                className="intro-quiz-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <section>
                <label htmlFor={`${question.id}`}><strong>{question.questionText}</strong></label>
                <div>
                    <label><Field name={`${question.id}`} id={question.id} component={Input} type="radio" value={`${question.option1}`}/>{question.option1}</label>
                    <label><Field name={`${question.id}`}  id={question.id} component={Input} type="radio" value={`${question.option2}`}/>{question.option2}</label>
                    <label><Field name={`${question.id}`}  id={question.id} component={Input} type="radio" value={`${question.option3}`}/>{question.option3}</label>
                    <label><Field name={`${question.id}`}  id={question.id} component={Input} type="radio" value={`${question.option4}`}/>{question.option4}</label>
                    <label><Field name={`${question.id}`}  id={question.id} component={Input} type="radio" value={`${question.option5}`}/>{question.option5}</label>
                </div>
                </section>
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Submit Answer
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'introquiz',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('introquiz', Object.keys(errors)[0]))
})(IntroQuizForm);

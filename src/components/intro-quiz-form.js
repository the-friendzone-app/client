import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {answerQuestion} from '../actions/questions';
import Input from './input';
import {required} from '../validators';


export class IntroQuizForm extends React.Component {
    onSubmit(values) {
        let questionIds = Object.keys(values)[Object.keys(values).length-1];
        this.props.dispatch(answerQuestion(questionIds,values[questionIds]));
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
                <label htmlFor={`${question.id}`}><strong><span className="intro-background">Question: {question.questionText}</span></strong></label>
                <div>
                    <label><Field name={`${question.id}`} property={question.option1} id={question.id} component={Input} type="radio" value={`${question.option1}`}/></label>
                    <label><Field name={`${question.id}`} property={question.option2} id={question.id} component={Input} type="radio" value={`${question.option2}`}/></label>
                    <label><Field name={`${question.id}`} property={question.option3} id={question.id} component={Input} type="radio" value={`${question.option3}`}/></label>
                    <label><Field name={`${question.id}`} property={question.option4} id={question.id} component={Input} type="radio" value={`${question.option4}`}/></label>
                    <label><Field name={`${question.id}`} property={question.option5} id={question.id} component={Input} type="radio" value={`${question.option5}`}/></label>
                </div>
                </section>
                <button className="intro-button-inverse"
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

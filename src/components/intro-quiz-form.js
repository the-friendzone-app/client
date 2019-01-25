import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required} from '../validators';


export class IntroQuizForm extends React.Component {
    onSubmit(values) {
        const { Q1, Q2, Q3, Q4 } = values;
        console.log(values);
      
        return this.props

    }

    render() {

        const Questions = this.props.Questions.map((question,i) => {

            return(
                <section>
                <label htmlFor={`Q${i}`}>{question.questionText}</label>
                <div>
                    <label><Field name={`Q${i}`} validate={[required]} id={`option1`}component={Input} type="radio" value={`option1`}/>{question.option1}</label>
                    <label><Field name={`Q${i}`} validate={[required]} id={`option1`}component={Input} type="radio" value={`option2`}/>{question.option2}</label>
                    <label><Field name={`Q${i}`} validate={[required]} id={`option1`}component={Input} type="radio" value={`option3`}/>{question.option3}</label>
                </div>
                </section>
            )
        })
        return (
            
            <form
                className="intro-quiz-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {Questions}
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Finish Quiz
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

import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { submitAnswer } from '../actions/questions';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';

export class PollForm extends React.Component {



    onSubmit(index) {
        const { polloption } = index;
        console.log(polloption)
        this.props
            .dispatch(submitAnswer(polloption))
        this.props.history
            .push('/answerpage')

    }


    render() {

        const questionOptions = this.props.options.map((option, i) => {
            return (
                <div>
                    <label><Field name="polloption" id={`${option._id}`} component={Input} type="radio" value={`${i}`} /> {option.text}</label>
                </div>
            )
        }
        );
        const currentQuestion = this.props.currentQuestion;

        return (
            <form
                className="personalitypollsform"
                onSubmit={this.props.handleSubmit(index =>
                    this.onSubmit(index)
                )}>

                <label htmlFor="Question">
                    <p className="question-text">
                        {currentQuestion !== undefined
                            ? currentQuestion
                            : 'Loading.......'}
                    </p>
                </label>
                {questionOptions}
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Submit
                </button>



            </form>
        );
    }
}

export default reduxForm({
    form: 'personalitypollsform',
    // onSubmitFail: (errors, dispatch) =>
    //     dispatch(focus('personalitypolls', Object.keys(errors)[0]))
})(PollForm);

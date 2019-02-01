import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { submitAnswer } from '../actions/questions';
import Input from './input';


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
                    <label><Field property={option.text} name="polloption" id={`${option._id}`} component={Input} type="radio" value={`${i}`} /></label>
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
                    <div className="question-text">
                        <h1>{currentQuestion !== undefined
                            ? currentQuestion
                            : 'Loading.......'}
                    </h1>
                    </div>
                </label>
                {questionOptions}
                <button class="tiger-button"
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
})(PollForm);

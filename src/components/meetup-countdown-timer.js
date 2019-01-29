import React from 'react';

let moment = require('moment');
let countdown = require('moment-countdown');

export default class MeetupCountdownTimer extends React.Component {
  render() {

    const { startTime } = this.props;
    let currentTime = moment().format();
    let timer = moment(currentTime).countdown(startTime).toString();
    // let test = countdown(currentTime, startTime, countdown.MONTHS |
    //   countdown.WEEKS |
    //   countdown.DAYS |
    //   countdown.HOURS |
    //   countdown.MINUTES |
    //   countdown.SECONDS, 4, 2).toString();

      // let test = countdown( new Date(2000, 0, 1) ).toString();



    return (
      <div>
        <div className="meetup-countdown-timer-container">
          <b>Starts In:</b> {timer}
        </div>

      </div>
    );
  }

}
import React from 'react';
import {connect} from 'react-redux';



export function Footer(props) {


    return (
        <div className="footer">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-copyright">
              <a  className="text" href="mailto:thefriendzonedev@gmail.com?Subject=Hello%20Dev%20Team!">The Friend Zone</a> Was Created by <a className="text" href="https://www.linkedin.com/in/mary-conley-desu/">Mary</a>, <a className="text" href="https://www.linkedin.com/in/thomas-chun-99385a95/">Thomas</a>, <a className="text" href="https://www.linkedin.com/in/t-alexander-crowell-01885b162/">Alex</a> & <a className="text" href="https://www.linkedin.com/in/logan-wang/">Logan</a>!
            </div>
          </div>
        </div>
        </div>
    );
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Footer);

import * as React from 'react';
import LayoutContainer from '../../layout';

const Home: React.FunctionComponent<any> = (props) => {

    return (
        <LayoutContainer>
            <div className="home">
                <h2 className="home__title">Welcome to IMPACT’s Holiday Manager</h2>
                <h4 className="home__header">IMPACT's Holiday Manager is used as internally way of handling holiday requests. </h4>
                <h5 className="home__subheader"> As a Developer</h5>
                <p className="home__text"> 
                    - You can add a new Holiday Request where you choose the date which you wish to have holiday.
                </p>
                <p className="home__text"> 
                    - You can see all your active Holiday Requests and whether they are pending or have been approved/declined.
                </p>
                <h5 className="home__subheader"> 
                    As a Project Manager or Unit Manager
                </h5>
                <p className="home__text"> 
                    - You can also add a Holiday Request and the request will be send to your reference within the firm.
                </p>
                <p className="home__text"> 
                    - You also have the ability to see all your active Holiday Requests and their status.
                </p>
                <p className="home__text"> 
                    - You can see all pending Holiday Requests from Project Manager, Unit Manager or Developers and respond to them.
                </p>
            </div>
        </LayoutContainer>
)
};

export default Home;
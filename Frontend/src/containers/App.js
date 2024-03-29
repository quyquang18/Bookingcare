import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import CustomScrollbars from '~/components/CustomScrollbars';
import { path } from '../utils';

import Home from '../routes/Home';
import HomePage from '~/containers/HomePage';
import Login from '~/containers/Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
import Doctor from '~/routes/Doctor';
import DetailDoctor from './Patient/Doctor/DetailDoctor';
import ConfirmModal from '../components/ConfirmModal';
import VerifyEmail from './Patient/VerifyEmail/VerifyEmail';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import DetailClinic from './Patient/Clinic/DetailClinic';
import PageNotFound from './PageNotFound';
class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <LoadingOverlay active={this.props.isShowReactLoading} spinner text="Loading your content...">
                            <ConfirmModal />
                            {this.props.isLoggedIn && <Header />}

                            <span className="content-container">
                                {/* <CustomScrollbars style={{ height: '100vh', width: '100%' }}> */}
                                <Switch>
                                    <Route path={path.HOME} exact component={Home} />
                                    <Route path={path.HOMEPAGE} exact component={HomePage} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                    <Route path={path.VERIFY_BOOKING} component={VerifyEmail} />
                                    <Route path={'/doctor/'} component={userIsAuthenticated(Doctor)} />
                                    <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                    <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                    <Route path="*" component={PageNotFound} />
                                </Switch>
                                {/* </CustomScrollbars> */}
                            </span>

                            <ToastContainer
                                position="bottom-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                        </LoadingOverlay>
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        isShowReactLoading: state.app.isShowReactLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
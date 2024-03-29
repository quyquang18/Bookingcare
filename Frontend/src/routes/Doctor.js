import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import ManagePatient from '~/containers/System/Doctor/ManagePatient';
import ManageSchedule from '~/containers/System/Doctor/ManageSchedule';
class Doctor extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                        <Route path="/doctor/manage-patient" component={ManagePatient} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);

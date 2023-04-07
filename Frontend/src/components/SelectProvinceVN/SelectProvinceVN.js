import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoLocation } from 'react-icons/go';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { getProvinceVN } from '~/services/doctorService';

class SelectProvinceVN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProvinceVn: [],
            listDistrict: [],
            listData: [],
            selectedProvince: null,
            selectedDistrict: null,
            subAddress: '',
        };
    }
    async componentDidMount() {
        let res = await getProvinceVN(2);
        let data = this.buildDataInputSelect(res);
        this.setState({
            listProvinceVn: data,
            listData: res,
        });
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.value = item.codename;
                object.label = item.name;
                result.push(object);
                return true;
            });
        }
        return result;
    };
    handleChangeProvince = (itemSelected) => {
        let listData = this.state.listData;
        this.setState({
            selectedProvince: itemSelected,
            selectedDistrict: null,
        });
        if (listData && listData.length > 0) {
            listData.map((item) => {
                if (itemSelected.value === item.codename) {
                    let dataDistrict = this.buildDataInputSelect(item.districts);
                    this.setState({
                        listDistrict: dataDistrict,
                    });
                }
                return true;
            });
        }
    };
    handleChangeDistrict = (itemSelected) => {
        this.setState({
            selectedDistrict: itemSelected,
        });
    };
    handleBlurInput = (value) => {
        let { selectedProvince, selectedDistrict } = this.state;
        if (selectedProvince && selectedDistrict) {
            this.props.getProvince(` ${value}, ${selectedDistrict.label}, ${selectedProvince.label}`);
        }
    };
    render() {
        let { listProvinceVn, listDistrict, selectedProvince, selectedDistrict } = this.state;
        return (
            <div className="row mt-3">
                <div className="col-4">
                    <label>
                        <FormattedMessage id="patient.booking-modal.province" />
                    </label>
                    <Select
                        value={selectedProvince}
                        options={listProvinceVn}
                        onChange={(item) => this.handleChangeProvince(item)}
                        placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
                    />
                </div>
                <div className="col-4">
                    <label>
                        <FormattedMessage id="patient.booking-modal.district" />
                    </label>
                    <Select
                        placeholder={<FormattedMessage id="admin.manage-doctor.select" />}
                        options={listDistrict}
                        value={selectedDistrict}
                        onChange={(item) => this.handleChangeDistrict(item)}
                    />
                </div>
                <div className="col-4">
                    <label>
                        <FormattedMessage id="patient.booking-modal.address" />
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        style={{ minHeight: '38px' }}
                        onBlur={(event) => this.handleBlurInput(event.target.value)}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectProvinceVN);

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showModal } from '../actions/modal-actions';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.showModal(false);
    }

    render() {
        return (
            <div className="modal" style={this.props.show ? { display: 'unset' } : { display: 'none' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Password Submitted!</h5>
                            <button onClick={this.onClick} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Congratulations, your new password has been successfully submitted!</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.onClick} className="btn btn-primary" data-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    showModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    show: state.modal.show
});

export default connect(mapStateToProps, { showModal })(Modal);
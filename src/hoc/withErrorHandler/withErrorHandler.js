import React from 'react';
import useHttpErrorHandler from "../../hooks/http-error-handler";
import Modal from '../../components/UI/modal/Modal';
import Aux from '../aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
};

export default withErrorHandler;

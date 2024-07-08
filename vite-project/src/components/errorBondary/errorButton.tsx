import React from 'react';

interface ErrorButtonState {
    throwError: boolean;
}
interface emptyProps {}
export default class ErrorButton extends React.Component<
    emptyProps,
    ErrorButtonState
> {
    state: ErrorButtonState = { throwError: false };

    handleErrorClick = () => {
        this.setState({ throwError: true });
    };
    render() {
        if (this.state.throwError) {
            throw new Error('Искусственная ошибка');
        }

        return (
            <button
                className="search-container__button main-page__btn"
                onClick={this.handleErrorClick}
            >
                Trigger Error
            </button>
        );
    }
}

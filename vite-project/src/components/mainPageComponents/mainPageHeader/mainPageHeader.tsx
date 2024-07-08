import { Component } from 'react';
import logo from '..//..//../assets/image/xbox-gamepad.svg';
import ErrorButton from '../../errorBondary/errorButton';

type StateProps = {
    searchName: string;
};
interface Props {
    showMore: (arg: string) => void;
    onSearch: (searchValue: string) => void;
}
export default class MainPageHeader extends Component<Props, StateProps> {
    constructor(props: Props) {
        super(props);
        const localSearch = localStorage.getItem('UserSearch') || '';
        this.state = { searchName: localSearch };
    }
    handleSearchClick = () => {
        this.props.onSearch(this.state.searchName);
        this.props.showMore('reset');
        localStorage.setItem('UserSearch', this.state.searchName);
    };

    changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchName: e.target.value,
        });
    };
    throwError = () => {
        throw new Error('Искусственная ошибка');
    };
    render(): React.ReactNode {
        return (
            <>
                <header className="main-page__main-header">
                    <div className="main-header__logo-container">
                        <img
                            src={logo}
                            alt="logo"
                            className="logo__img"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="header__search-container">
                        <label className="search-container__label">
                            Search Game
                            <input
                                className="search-container__input"
                                type="text"
                                placeholder="Search"
                                value={this.state.searchName}
                                onChange={this.changeSearchValue}
                            />
                        </label>
                        <button
                            className="search-container__button-search main-page__btn"
                            onClick={this.handleSearchClick}
                        >
                            Click me
                        </button>
                        <ErrorButton></ErrorButton>
                    </div>
                </header>
            </>
        );
    }
}

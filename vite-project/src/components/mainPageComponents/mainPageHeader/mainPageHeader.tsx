import { Component } from 'react';
import logo from '..//..//../assets/image/react.svg';

type StateProps = {
    searchInput: string;
};
interface Props {
    onSearch: (searchValue: string) => void;
}
export default class MainPageHeader extends Component<Props, StateProps> {
    constructor(props: Props) {
        super(props);
        const localSearch = localStorage.getItem('UserSearch') || '';
        this.state = { searchInput: localSearch };
    }
    handleSearchClick = () => {
        this.props.onSearch(this.state.searchInput);
        localStorage.setItem('UserSearch', this.state.searchInput);
    };

    changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchInput: e.target.value,
        });
    };

    render(): React.ReactNode {
        return (
            <>
                <header className="main-page__main-header">
                    <div className="main-header__logo-container">
                        <img src={logo} alt="logo" className="logo__img" />
                    </div>
                    <div className="header__search-container">
                        <label className="search-container__label">
                            Search Game
                            <input
                                className="search-container__input"
                                type="text"
                                placeholder="Search"
                                value={this.state.searchInput}
                                onChange={this.changeSearchValue}
                            />
                        </label>
                        <button
                            className="search-container__button btn"
                            onClick={this.handleSearchClick}
                        >
                            Click me
                        </button>
                    </div>
                </header>
            </>
        );
    }
}

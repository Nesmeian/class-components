import { Component } from 'react';
import logo from '..//..//../assets/image/react.svg';
import getGameData from '../../api/api';
type StateProps = {
    searchInput: string;
};
interface Props {}
export default class MainPageHeader extends Component<Props, StateProps> {
    constructor(props: Props) {
        super(props);
        this.state = { searchInput: '' };
    }
    click = async () => {
        console.log(this.state.searchInput);
        console.log(await getGameData());
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
                        <label className="search-container__lable">
                            Seacrh Game
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
                            onClick={this.click}
                        >
                            Click me
                        </button>
                    </div>
                </header>
            </>
        );
    }
}

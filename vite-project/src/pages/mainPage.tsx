import { Component, ReactNode } from 'react';
import MainPageHeader from '../components/mainPageComponents/mainPageHeader/mainPageHeader';
import MainPageMain from '../components/mainPageComponents/mainPageMain/mainPageMain';
import MainPageFooter from '../components/mainPageComponents/mainPageFooter/mainPageFooter';
import ErrorBoundary from '../components/errorBondary/errorBondary';

type State = {
    searchQuery: string;
    showGames: number;
};
interface voidProps {}
export default class MainPage extends Component<voidProps, State> {
    constructor(props: voidProps) {
        super(props);
        this.state = {
            searchQuery: '',
            showGames: 1,
        };
    }

    handleSearch = (searchName: string) => {
        this.setState({ searchQuery: searchName });
    };

    shangeShowGames = (purpose: string): Promise<number | void> => {
        return new Promise<number | void>((resolve) => {
            if (purpose === 'add') {
                this.setState(
                    (prevState) => ({
                        showGames: prevState.showGames + 1,
                    }),
                    () => resolve(this.state.showGames),
                );
            } else if (purpose === 'reset') {
                this.setState({ showGames: 1 }, () =>
                    resolve(this.state.showGames),
                );
            } else if (purpose === 'get') {
                resolve(this.state.showGames);
            }
        });
    };
    render(): ReactNode {
        const { searchQuery } = this.state;
        return (
            <ErrorBoundary>
                <MainPageHeader
                    onSearch={this.handleSearch}
                    showMore={this.shangeShowGames}
                />
                <MainPageMain
                    searchQuery={searchQuery}
                    showMore={this.shangeShowGames}
                />
                <MainPageFooter />
            </ErrorBoundary>
        );
    }
}

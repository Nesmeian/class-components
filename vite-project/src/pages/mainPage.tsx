import { Component, ReactNode } from 'react';
import MainPageHeader from '../components/mainPageComponents/mainPageHeader/mainPageHeader';
import MainPageMain from '../components/mainPageComponents/mainPageMain/mainPageMain';

type State = {
    searchQuery: string;
};
interface voidProps {}
export default class MainPage extends Component<voidProps, State> {
    constructor(props: voidProps) {
        super(props);
        this.state = {
            searchQuery: '',
        };
    }

    handleSearch = (searchQuery: string) => {
        // Обновляем состояние с новым запросом поиска
        this.setState({ searchQuery });
    };

    render(): ReactNode {
        const { searchQuery } = this.state;
        return (
            <>
                {/* Передаем handleSearch как пропс в MainPageHeader */}
                <MainPageHeader onSearch={this.handleSearch} />
                {/* Передаем searchQuery как пропс в MainPageMain */}
                <MainPageMain searchQuery={searchQuery} />
            </>
        );
    }
}

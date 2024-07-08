import { Component, ReactNode } from 'react';
import { api_key, base_url } from '../../api/api';
import Overlay from '../../throbber/throbber';
type Game = {
    id: number;
    name: string;
    released: string;
    background_image: string;
};
type Props = {
    searchQuery: string;
    showMore: (get: string) => Promise<void | number>;
};
type StateProps = {
    isLoading: boolean;
    gameData: Game[];
    totalGames: number; // Новое свойство для общего количества игр
    searchName: string;
};
export default class MainPageMain extends Component<Props, StateProps> {
    constructor(props: Props) {
        super(props);
        const localSeacrh = localStorage.getItem('UserSearch') || 'Doom';
        this.state = {
            isLoading: false,
            gameData: [],
            totalGames: 0, // Инициализируем с 0
            searchName: localSeacrh,
        };
    }
    componentDidMount() {
        this.loadGameData(this.state.searchName);
    }
    componentDidUpdate(prevProps: Props) {
        if (this.props.searchQuery !== prevProps.searchQuery) {
            this.loadGameData(this.props.searchQuery);
        }
    }

    loadGameData = async (searchQuery: string) => {
        this.setState({ isLoading: true });
        // Используем актуальное значение searchQuery из props, а не из состояния
        const actualSearchQuery = this.props.searchQuery || searchQuery;
        const showGamesNumber = await this.props.showMore('get');
        const pageSize =
            showGamesNumber !== undefined ? 20 * showGamesNumber : 20;
        const url = `${base_url}?search=${actualSearchQuery}&page_size=${pageSize}&key=${api_key}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(
                    `Request failed with status ${response.status}`,
                );
            }
            const data = await response.json();
            this.setState({
                gameData: data.results,
                isLoading: false,
                totalGames: data.count,
            });
        } catch (error) {
            console.error(error);
            this.setState({ isLoading: false });
        }
    };
    renderItems = () => {
        return this.state.gameData.map((e) => {
            const shortName =
                e.name.length > 12 ? `${e.name.slice(0, 12)}...` : e.name;

            return (
                <div className="gallery__item" key={e.id}>
                    <img
                        className="gallery__item-img"
                        src={e.background_image}
                        alt={shortName}
                    />
                    <p className="gallery__item-name">{shortName}</p>
                </div>
            );
        });
    };
    handleShowMoreClick = async () => {
        await this.props.showMore('add');
        this.loadGameData(this.state.searchName);
    };
    render(): ReactNode {
        const { isLoading, gameData, totalGames } = this.state;
        const maxItemsToShow = 40; // Максимальное количество элементов для отображения

        // Проверяем, не превышено ли максимальное количество элементов и есть ли еще игры для загрузки
        const shouldShowMoreButton =
            !isLoading &&
            gameData.length < totalGames &&
            gameData.length < maxItemsToShow;

        return (
            <>
                <div className="main-page__main">
                    {isLoading && <Overlay />}
                    <div className="main-page__gallery">
                        <div className="main-page__gallery-container">
                            {this.renderItems()}
                        </div>
                        {shouldShowMoreButton && (
                            <button
                                className="main-page__show-more main-page__btn"
                                onClick={this.handleShowMoreClick}
                            >
                                Show more
                            </button>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

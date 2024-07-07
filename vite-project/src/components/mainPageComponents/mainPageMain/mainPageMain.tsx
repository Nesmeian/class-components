import { Component, ReactNode } from 'react';
import { api_key, base_url } from '../../api/api';
import Overlay from '../../thobber/thobber';
type Game = {
    id: number;
    name: string;
    released: string;
    background_image: string;
};
type Props = {
    searchQuery: string;
};
type StateProps = {
    isLoading: boolean;
    gameData: Game[];
};
export default class MainPageMain extends Component<Props, StateProps> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false,
            gameData: [],
        };
    }
    componentDidMount() {
        this.loadGameData('Doom');
    }
    componentDidUpdate(prevProps: Props) {
        if (this.props.searchQuery !== prevProps.searchQuery) {
            this.loadGameData(this.props.searchQuery);
        }
    }
    loadGameData = async (searchQuery: string) => {
        this.setState({ isLoading: true });
        const pageSize = 20;
        const url = `${base_url}?search=${searchQuery}&page_size=${pageSize}&key=${api_key}`;
        try {
            const response = await fetch(url);
            <Overlay></Overlay>;
            if (!response.ok) {
                throw new Error(
                    `Request failed with status ${response.status}`,
                );
            }
            const data = await response.json();
            this.setState({ gameData: data.results, isLoading: false });
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

    render(): ReactNode {
        const { isLoading } = this.state;
        return (
            <>
                <div className="main-page__main">
                    {isLoading && <Overlay />}
                    <div className="main-page__gallery">
                        {this.renderItems()}
                    </div>
                </div>
            </>
        );
    }
}

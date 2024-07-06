import { Component, ReactNode } from 'react';
import getGameData from '../../api/api';
type Game = {
    id: number;
    name: string;
    released: string;
    background_image: string;
};

type StateProps = {
    gameData: Game[];
};
interface Props {}
export default class MainPageMain extends Component<Props, StateProps> {
    constructor(props: NonNullable<undefined>) {
        super(props);
        this.state = {
            gameData: [],
        };
    }

    componentDidMount() {
        this.loadGameData('Doom');
    }

    loadGameData = async (searchQuery: string) => {
        try {
            const data = await getGameData(searchQuery);
            this.setState({ gameData: data.results });
        } catch (error) {
            console.error(error);
        }
    };
    onClick() {
        console.log(1);
    }
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
                        onClick={this.onClick}
                    />
                    <p className="gallery__item-name">{shortName}</p>
                </div>
            );
        });
    };

    render(): ReactNode {
        return (
            <>
                <div className="main-page__main">
                    <div className="main-page__gallery">
                        {this.renderItems()}
                    </div>
                </div>
            </>
        );
    }
}

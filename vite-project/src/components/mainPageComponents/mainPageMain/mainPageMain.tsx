import { Component, ReactNode } from 'react';
import work from '..//..//../assets/image/work.jpeg';
export default class MainPageMain extends Component {
    constructor(props: NonNullable<undefined>) {
        super(props);
        this.state = {
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        };
    }
    renderItems = () => {
        return this.state.arr.map((_, index) => (
            // <div key={index} className="main-page__item">
            //     {item}
            // </div>
            <img src={work} alt="image" key={index} width={300} height={300} />
        ));
    };
    render(): ReactNode {
        return (
            <>
                <div className="main-page__main">
                    <div className="main-page__container">
                        {this.renderItems()}
                    </div>
                </div>
            </>
        );
    }
}

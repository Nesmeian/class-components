import { Component, ReactNode } from 'react';
export default class MainPageFooter extends Component {
    render(): ReactNode {
        return (
            <>
                <div className="main-page__footer">
                    <div className="main-page__footer-school">
                        <a href="https://rs.school/" className="link">
                            RSS School
                        </a>
                    </div>
                    <div className="main-page__footer-year">2024</div>
                    <div className="creator">
                        <a href="https://github.com/Nesmeian" className="link">
                            Nesmeian
                        </a>
                    </div>
                </div>
            </>
        );
    }
}

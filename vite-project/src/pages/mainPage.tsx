import { Component, ReactNode } from 'react';
import MainPageHeader from '../components/mainPageComponents/mainPageHeader/mainPageHeader';
import MainPageMain from '../components/mainPageComponents/mainPageMain/mainPageMain';

export default class MainPage extends Component {
    render(): ReactNode {
        return (
            <>
                <MainPageHeader></MainPageHeader>
                <MainPageMain></MainPageMain>
            </>
        );
    }
}

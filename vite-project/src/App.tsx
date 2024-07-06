import { Component, ReactNode } from 'react';
import './styles/main.scss';
import MainPage from './pages/mainPage';
import './styles/app.scss';
export default class App extends Component {
    render(): ReactNode {
        return <MainPage></MainPage>;
    }
}

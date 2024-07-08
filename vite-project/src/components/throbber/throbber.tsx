import React, { Component } from 'react';

interface OverlayProps {}

interface OverlayState {
    pointInOverlay: number;
}

export default class Overlay extends Component<OverlayProps, OverlayState> {
    constructor(props: OverlayProps) {
        super(props);
        this.state = {
            pointInOverlay: 5,
        };
    }

    render(): React.ReactNode {
        const points = Array.from(
            { length: this.state.pointInOverlay },
            (_, index) => index,
        );

        return (
            <>
                <div className="thobber__wrapper">
                    <div className="thobber">
                        <div className="thobber__container">
                            {points.map((index) => (
                                <div
                                    key={index}
                                    className={`thobber__point thobber__point--${index + 1}`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

var React = require('react');

export class LoadingPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <section className="content-panel">
                <p>{this.props.text}</p>
            </section>
        );
    }
}

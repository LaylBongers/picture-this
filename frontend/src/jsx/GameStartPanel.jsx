var React = require('react');

export class GameStartPanel extends React.Component {
    onJoinSubmit = (e) => {
        e.preventDefault();
        this.props.onJoinGameRequest({key: '0000'});
    }

    render = () => {
        return (
            <section className="content-panel">
                <div className="row">
                    <div className="content-main">
                        <article>
                            <h3>What's all this then?</h3>
                            <p>
                                Oh hello there, esteemed hat-owner! Looking for a party game?
                                Too poor for hangman? Don't have the stomach for twister?
                                Too much family around for spin-the-bottle? Well look no
                                further, for Picture This is the game you seek!
                            </p>
                            <p>
                                Face off against your friends, enemies, or anything inbetween
                                in this drawing guessing game.
                            </p>
                            <p style={{fontStyle: 'italic', color: '#444', fontSize: '0.8em'}}>
                                Hat-free play not rated by the ESRB. May cause swelling, irritation,
                                or death. Ask your doctor if Picture This is right for you.
                            </p>
                        </article>
                        <article>
                            <h3>Version 0.1.0</h3>
                            <p>This is the initial alpha release.</p>
                        </article>
                    </div>
                    <div className="content-sidebar">
                        <section className="play-form">
                            <h3>Play Picture This</h3>
                            <form className="form-inline" onSubmit={this.onJoinSubmit}>
                                <div className="join-game-inline">
                                    <input className="join-game-code" type="text" id="game-code" placeholder="Game Code" />
                                    <button className="join-game-button" type="submit">Join Game</button>
                                </div>
                            </form>
                            <div className="divider">- or -</div>
                            <button className="create-game-button" type="submit">Create Game</button>
                        </section>
                        <article>
                            <h3>Donate</h3>
                            <p>
                                Patreon coming Soon&trade;. If you want to donate
                                right now anyways and are looking for hosting, use
                                my <a href="https://www.digitalocean.com/?refcode=e75306f6e8e8">DigitalOcean referral link</a>.
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        );
    }
}

var React = require('react');

export class GameStartPanel extends React.Component {
    render = () => {
        return (
            <section className="content-panel">
                <div className="row">
                    <article className="content-main" style={{textAlign: 'justify'}}>
                        <h3>What's all this then?</h3>
                        <p>
                            Oh hello there, esteemed hat-owner! Looking for a party game?
                            Too poor for hangman? Don't have the stomach for twister?
                            Too much family around for spin-the-bottle? Well look no
                            further, for Drawless is the game you seek!
                        </p>
                        <p>
                            Face off against your friends, enemies, or anything inbetween
                            in this drawing guessing game.
                        </p>
                        <p style={{fontStyle: 'italic', color: '#444', fontSize: '0.8em'}}>
                            Hat-free play not rated by the ESRB. May cause swelling, irritation,
                            or death. Ask your doctor if Drawless is right for you.
                        </p>
                    </article>
                    <section className="content-sidebar">
                        <div className="jumbotron" style={{padding: '18px', backgroundColor: '#FFF'}}>
                            <h3 style={{marginBottom: '14px'}}>Play Drawless</h3>
                            <div className="form-inline">
                                <div className="input-group" style={{width: '100%'}}>
                                    <input className="form-control" type="text" id="game-code" placeholder="Game Code" style={{width: 'calc(100% - 100px)', borderRadius: '0.25rem 0 0 0.25rem', display: 'inline-block', minWidth: '0px'}} />
                                    <button type="submit" className="btn btn-primary" style={{width: '100px', borderRadius: '0 0.25rem 0.25rem 0', display: 'inline-block'}}>Join Game</button>
                                </div>
                            </div>
                            <div style={{textAlign: 'center', color: '#666'}}>- or -</div>
                            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Create Game</button>
                        </div>
                    </section>
                    <article className="content-main">
                        <h3>Version 0.1.0</h3>
                        <p>This is the initial alpha release.</p>
                    </article>
                    <article className="content-sidebar">
                        <h3>Donate</h3>
                        <p>
                            Patreon coming Soon&trade;. If you want to donate
                            right now anyways and are looking for hosting, use
                            my <a href="https://www.digitalocean.com/?refcode=e75306f6e8e8">DigitalOcean referral link</a>.
                        </p>
                    </article>
                </div>
            </section>
        );
    }
}

var React = require('react');

export class DrawlessApp extends React.Component {
    render = () => {
        return (
            <div className="dl-app">
                <header>
                    <h1>Drawless</h1>
                    <h2>Yet another way to make your friends hate you!</h2>
                </header>
                <div className="row jumbotron" style={{color: '#333', padding: '30px 18px 16px 18px'}}>
                    <article className="col-sm-7 col-xs-12" style={{textAlign: 'justify'}}>
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
                    <div className="col-sm-5 col-xs-12">
                        <div className="jumbotron" style={{padding: '18px', backgroundColor: '#FFF'}}>
                            <h3 style={{marginBottom: '14px'}}>Play Drawless</h3>
                            <div className="form-inline">
                                <div className="input-group" style={{width: '100%'}}>
                                    <input className="form-control" type="text" id="game-code" placeholder="Game Code" style={{width: 'calc(100% - 100px)', borderRadius: '0.25rem 0 0 0.25rem', display: 'inline-block', minWidth: '0px'}} />
                                    <button type="submit" className="btn btn-primary" style={{width: '100px', borderRadius: '0 0.25rem 0.25rem 0', display: 'inline-block'}}>Join Game</button>
                                </div>
                            </div>
                            <hr />
                            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Create Game</button>
                        </div>
                    </div>
                    <div className="col-sm-7 col-xs-12">
                        <article>
                            <h3>Version 0.1.0</h3>
                            <p>This is the initial alpha release.</p>
                        </article>
                    </div>
                    <div className="col-sm-5 col-xs-12">
                        <article>
                            <h3>Donate</h3>
                            <p>Coming soon, depending how quickly my server costs rise.</p>
                        </article>
                    </div>
                </div>
            </div>
        );
    }
}

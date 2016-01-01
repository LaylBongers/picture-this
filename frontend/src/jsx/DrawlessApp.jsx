var React = require('react');

class DrawlessApp extends React.Component {
    render = () => {
        return (
            <div className="dl-app">
                <header>
                    <h1>Drawless</h1>
                    <h2>Yet another way to make your friends hate you!</h2>
                </header>
                <div className="row jumbotron" style={{color: '#333', padding: '30px 18px 16px 18px'}}>
                    <div className="col-sm-7 col-xs-12" style={{textAlign: 'justify'}}>
                        <p>
                            Oh hello there, esteemed hat-owner! Looking for a party game?
                            Too poor for hangman? Don't have the stomach for twister?
                            Too much family around for spin-the bottle? Well look no
                            further, for Drawless is the game you seek!
                        </p>
                        <p>
                            Face off against your friends, enemies, or anything inbetween
                            and guess what these stick figures drawn by your long lost
                            cousin represent in this drawing guessing game.
                        </p>
                    </div>
                    <div className="col-sm-5 col-xs-12">
                        <div className="jumbotron" style={{padding: '18px', backgroundColor: '#FFF'}}>
                            <h3 style={{marginBottom: '14px'}}>Play Drawless</h3>
                            <div className="form-inline">
                                <div className="input-group" style={{width: '100%'}}>
                                    <input className="form-control" type="text" id="game-code" placeholder="Game Code" style={{width: 'calc(100% - 100px)', borderRadius: '0.25rem 0 0 0.25rem', display: 'inline-block'}} />
                                    <button type="submit" className="btn btn-primary" style={{width: '100px', borderRadius: '0 0.25rem 0.25rem 0', display: 'inline-block'}}>Join Game</button>
                                </div>
                            </div>
                            <hr />
                            <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Create Game</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = DrawlessApp;

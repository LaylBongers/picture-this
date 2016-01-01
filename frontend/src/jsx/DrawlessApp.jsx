var React = require('react');

class DrawlessApp extends React.Component {
    render = () => {
        return (
            <div className="dl-app">
                <header>
                    <h1>Drawless</h1>
                    <h2>Yet another way to make your friends hate you!</h2>
                </header>
                <div className="row jumbotron" style={{color: '#333', justifyContent: 'center', padding: '30px 18px 16px 18px'}}>
                    <div className="col-sm-7 col-xs-12">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et lorem mi. Cras sed mauris a orci scelerisque ultricies. Integer vitae aliquam justo, eu ultrices sem. Sed quis fermentum neque, sed dictum dui. Nullam mi nisi, egestas at blandit eget, iaculis id mauris. Maecenas porta suscipit felis eget imperdiet. Duis euismod dolor a diam pharetra semper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris dictum risus et lacus molestie, non ultricies leo rutrum. Mauris diam felis, sagittis at velit non, mollis rutrum sapien. Pellentesque eget dictum augue. Proin semper ut felis eu tristique.</p>
                    </div>
                    <div className="col-sm-5 col-xs-12">
                        <div className="jumbotron" style={{padding: '18px', backgroundColor: '#FFF'}}>
                            <h3 style={{marginBottom: '14px'}}>Play Drawless</h3>
                            <div className="form-inline">
                                <input className="form-control" type="text" id="game-code" placeholder="Game Code" style={{width: 'calc(100% - 100px)', borderRadius: '0.25rem 0 0 0.25rem'}} />
                                <button type="submit" className="btn btn-primary" style={{width: '100px', borderRadius: '0 0.25rem 0.25rem 0'}}>Join Game</button>
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

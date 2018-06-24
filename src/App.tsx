import * as React from 'react';
import './App.css';
import logo from './logo.svg';

interface IState {
    currentSearch: string;
    searchResults: any[];
}

class App extends React.Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentSearch: '',
            searchResults: []
        };
        this._getSearchFromInput = this._getSearchFromInput.bind(this);
        this._getSearchResults = this._getSearchResults.bind(this);
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Infosec Institute Full Stack Exercise</h1>
                </header>
                <main className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-sm-12 col-md-8 col-lg-6">
                            <form className="p-3">
                                <div className="form-group">
                                    <label htmlFor="search-input">Search Countries</label>
                                    <input
                                        type="text"
                                        id="search-input"
                                        className="form-control"
                                        placeholder="Search..."
                                        value={this.state.currentSearch}
                                        onChange={this._getSearchFromInput}/>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                    {
                        this.state.searchResults.length > 0 ?
                            <div className="row">
                                <div className="col-12">
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Alpha Code (2)</th>
                                            <th scope="col">Alpha Code (3)</th>
                                            <th scope="col">Flag</th>
                                            <th scope="col">Region</th>
                                            <th scope="col">Subregion</th>
                                            <th scope="col">Population</th>
                                            <th scope="col">Languages</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            :
                            null
                    }
                </main>
            </div>
        );
    }

    private _getSearchFromInput(e: React.ChangeEvent<HTMLInputElement>): void {
        // todo, add input debouncing
        this.setState({
            currentSearch: e.target.value,
            searchResults: []
        });
        if (e.target.value.length > 0) {
            this._getSearchResults();
        }
    }

    private _getSearchResults(): void {
        fetch(
            'https://randomuser.me/api/',
            {
                method: 'GET'
            }
        )
            .then((response: Response) => {
                response.json()
                    .then((data: any) => {
                        console.log(data);
                        this.setState({
                            searchResults: ['hello']
                        });
                    });
            })
            .catch((err: any) => {
                console.warn(err);
            });
    }
}

export default App;

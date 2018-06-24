import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import axios, { AxiosResponse } from 'axios';
import { ICountry } from './interfaces/country.interface';
import { map } from 'lodash';

interface IState {
    currentSearch: string;
    searchResults: ICountry[];
    isInitialPageState: boolean;
    searchMetadata?: {
        totalResults: number;
        totalCountries: number;
    };
}

class App extends React.Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            currentSearch: '',
            searchResults: [],
            isInitialPageState: true
        };
        this._getSearchFromInput = this._getSearchFromInput.bind(this);
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
                                    {
                                        this.state.currentSearch.length < 1 && !this.state.isInitialPageState ?
                                            <div className="alert alert-danger" role="alert">
                                                Please enter a search term
                                            </div>
                                            :
                                            null
                                    }
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
                                        {map(this.state.searchResults, (country: ICountry, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{country.name}</td>
                                                    <td>{country.alphaCode2}</td>
                                                    <td>{country.alphaCode3}</td>
                                                    <td>
                                                        <img className="country-flag" src={country.flag}/>
                                                    </td>
                                                    <td>{country.region}</td>
                                                    <td>{country.subregion}</td>
                                                    <td>{country.population.toLocaleString('en')}</td>
                                                    <td>{country.languages.join(', ')}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr className="table-secondary">
                                            <td className="text-right" colSpan={2}>
                                                <h5>Total Results:</h5>
                                            </td>
                                            <td className="text-left">
                                                <h5>
                                                    {this.state.searchMetadata ? this.state.searchMetadata.totalResults : ''}
                                                </h5>
                                            </td>
                                            <td colSpan={2}>
                                                &nbsp;
                                            </td>
                                            <td className="text-right" colSpan={2}>
                                                <h5>Total Countries:</h5>
                                            </td>
                                            <td className="text-left">
                                                <h5>
                                                    {this.state.searchMetadata ? this.state.searchMetadata.totalCountries : ''}
                                                </h5>
                                            </td>
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
        const searchValue: string = e.target.value;
        this.setState({
            currentSearch: searchValue,
            searchResults: [],
            isInitialPageState: false,
            searchMetadata: undefined
        });
        if (e.target.value.length > 0) {
            axios({
                method: 'POST',
                url: 'http://localhost:8080/countries/search',
                data: {
                    searchTerm: searchValue
                },
                headers: {
                    'X-Auth-Token': 'abcd1234',
                    'Accept': 'application/json'
                }
            })
                .then((response: AxiosResponse) => {
                    this.setState({
                        searchResults: response.data.countries,
                        searchMetadata: response.data.metadata
                    });
                })
                .catch((err: any) => {
                    console.warn(err);
                });
        }
    }
}

export default App;

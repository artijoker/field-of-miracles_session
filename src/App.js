//import logo from './logo.svg';
import { Component } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import axios from 'axios';
//import Cookies from 'universal-cookie';
import './App.css';
import Game from './components/Game/Game'
import RecordsTable from './components/RecordsTable/RecordsTable';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            records: []
        }

    }

    getRecords = () => this.state.records

    setRecords = (records) => {
        // console.log(typeof(records));
        // console.log(records);
        records.sort((a, b) => {
            if (a.score < b.score)
                return 1;
            if (a.score > b.score)
                return -1;
            return 0;
        })
        this.setState({
            records: records
        })
    };

    addNewRecord = (name, score) => {
        let record = {
            id: 0,
            name: name,
            score: score
        };

        axios.defaults.withCredentials = true;
        let url = "http://127.0.0.1:56537/php_scripts/add_new_records.php";
        axios.post(url, record)
            .then(response => this.setRecords(response.data));
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div className="dashboard">
                        <NavLink className="Link" to="/">Игра</NavLink>
                        <NavLink className="Link" to="/records_table">Рекорды</NavLink>
                    </div>

                    <Routes>
                        <Route path="/" element={<Game addNewRecord={this.addNewRecord} />} />
                        <Route path="/records_table" element={<RecordsTable getRecords={this.getRecords} />} />
                    </Routes>
                </BrowserRouter>
            </div>

        );
    }

    componentDidMount() {
        this.loadRecords()
    }

    componentDidUpdate() {

    }

    loadRecords = () => {
        axios.get(`http://127.0.0.1:56537/php_scripts/get_records.php`)
            .then(response => this.setRecords(response.data));
    }

    loadRecordsAsync = async () => {
        // let response = await axios.get(`http://127.0.0.1:56537/php_scripts/get_records.php`);
        // this.setRecords(response.data);

        let response = await fetch("http://127.0.0.1:56537/php_scripts/get_records.php");
        let data = await response.json();
        this.setRecords(data);
    }

}

export default App;

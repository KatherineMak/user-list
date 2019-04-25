import React, { Component } from 'react';
import './App.css';
import { IoMdAdd } from 'react-icons/io';
import { IoIosWoman } from 'react-icons/io';
import { IoIosMan } from 'react-icons/io';
import { IoMdRemove } from 'react-icons/io';
import { IoIosCloseCircle } from 'react-icons/io';
import Popup from "reactjs-popup";
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ControlledPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)

    }
    openModal (){
        this.setState({ open: true })
    }
    closeModal () {
        this.setState({ open: false })
    }

    render() {
        const genderM = this.props.genderMale;
        const genderF = this.props.genderFemale;
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1", // "light1", "dark1", "dark2"
            title: {
                text: "Gender users"
            },
            data: [{
                type: "pie",
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label}: {y}%",
                startAngle: -90,
                dataPoints: [
                    {y: genderM, label: "Male"},
                    {y: genderF, label: "Female"}
                ]
            }]
        }
        return (
            <div>
                <div className="row">
                    <div className={'offset-md-2 col-md-8 title'}>
                        <h1><b>User list</b></h1>
                    </div>
                    <div className={'col-md-2 btn-chart'}>
                        <button className="btn-chart btn btn-secondary" onClick={this.openModal}>
                            Show chart
                        </button>
                    </div>
                </div>
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                >
                    <div className={"my-modal"}>
                        <div className="row">
                            <button className="close"  onClick={this.closeModal}>
                                <IoIosCloseCircle size={40} color='#666666'/>
                            </button>
                        </div>
                        <div className="row">
                            <CanvasJSChart options = {options}
                                /* onRef={ref => this.chart = ref}*/
                            />
                            {/*<div className="modal">
                                <p>lalala</p>

                            </div>*/}
                        </div>
                    </div>
                </Popup>
            </div>
        )
    }
}
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));

    }

    render() {
        const user = this.props.user;
        return (
            <button onClick={this.handleClick} className="btn btn-link" type="button" data-toggle="collapse"  data-target={'#collapse' + user.login.username} aria-expanded="true" aria-controls={'collapse' + user.login.username}>
                {this.state.isToggleOn ?  <IoMdAdd size={40} color='#666666'/>: <IoMdRemove size={40} color='#666666'/>}
            </button>
        );
    }
}

class UserRow extends React.Component {
    render() {
        const user = this.props.user;
        const genderIco = (this.props.user.gender === 'male')? <IoIosMan size={30} color='#666666'/> : <IoIosWoman size={30} color='#666666'/>;
        return (
            <div className="card">
                <div className="card-header " id={'heading' + user.login.username}>
                    <div className="mb-0">
                        <div className='row'>
                            <div className='col-1'>
                                <img src={user.picture.thumbnail} alt='Avatar' className='rounded-circle img-thumbnail'/>
                            </div>
                            <div className='col-2'>
                                {user.name.last}
                            </div>
                            <div className='col-2'>
                                {user.name.first}
                            </div>
                            <div className='col-2'>
                                {user.login.username}
                            </div>
                            <div className='col-2'>
                                {user.phone}
                            </div>
                            <div className='col-2'>
                                {user.location.state}
                            </div>
                            <div className='col-1'>
                                <Toggle user={this.props.user}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id={'collapse' + user.login.username} className="collapse" aria-labelledby={'heading' + user.login.username} data-parent="#accordionExample">
                    <div className="card-body">
                        <div className='row offset-md-1'>
                            <div className='col-3 first-name'>
                                <b>{user.name.first}</b> {genderIco}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3 offset-md-1'>
                                <b>Username</b> {user.login.username} <br/>
                                <b>Registered</b> {user.registered.date}<br/>
                                <b>Email</b> {user.email}<br/>
                            </div>
                            <div className='col-3'>
                                <b>Adress</b> {user.location.street}<br/>
                                <b>City</b> {user.location.city}<br/>
                                <b>Zip Code</b> {user.location.postcode}<br/>
                            </div>
                            <div className='col-3'>
                                <b>Birthday</b> {user.dob.date}<br/>
                                <b>Phone</b> {user.phone}<br/>
                                <b>Cell</b> {user.cell}<br/>
                            </div>
                            <div className='col-2'>
                                <img src={user.picture.large} alt='Avatar' className='rounded-circle img-thumbnail'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class UserTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const maleGenderOnly = this.props.maleGenderOnly;
        const femaleGenderOnly = this.props.femaleGenderOnly;

        const rows = [];

        this.props.users.forEach((user) => {
            user.name.first  = (user.name.first.substring(0,1).toUpperCase())+user.name.first.substring(1);
            user.name.last  = (user.name.last.substring(0,1).toUpperCase())+user.name.last.substring(1);
            user.registered.date  = user.registered.date.substring(0,10);
            user.dob.date  = user.dob.date.substring(0,10);
            if (user.name.first.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return;
            }
            if (maleGenderOnly && !(user.gender === 'male')) {
                return;
            }
            if (femaleGenderOnly && !(user.gender === 'female')) {
                return;
            }
            rows.push(
                <UserRow
                    user={user}
                    key={user.login.username} />
            );
        });

        return (
            <div>
                <div className='container col-12'>
                    <div className='row'>
                        <div className='col-1'>
                        </div>
                        <div className='col-2'>
                            <b>Last name</b>
                        </div>
                        <div className='col-2'>
                            <b>First name</b>
                        </div>
                        <div className='col-2'>
                            <b>Username</b>
                        </div>
                        <div className='col-2'>
                            <b>Phone</b>
                        </div>
                        <div className='col-2'>
                            <b>Location</b>
                        </div>
                        <div className='col-1'>
                        </div>
                    </div>
                </div>
                <div className='accordion striped-rows' id="accordionExample">
                    {rows}
                </div>
            </div>

        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleMaleGenderChange = this.handleMaleGenderChange.bind(this);
        this.handleFemaleGenderChange = this.handleFemaleGenderChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleMaleGenderChange(e) {
        this.props.onMaleGenderChange(e.target.checked);
    }

    handleFemaleGenderChange(e) {
        this.props.onFemaleGenderChange(e.target.checked);
    }

    render() {
        return (
            <form>
                <div className='container search-form'>

                    <div className='row justify-content-center'>
                        <div className='search-title col-3'>
                            <p>Search by first name</p><br/>
                        </div>
                        <div className='col-4'>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={this.props.filterText}
                            onChange={this.handleFilterTextChange}
                        />
                        </div>
                    </div>
                    <div className='row justify-content-around'>
                        <div className='col-3'>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={this.props.maleGenderOnly}
                                onChange={this.handleMaleGenderChange}
                            />
                            {' '}
                            Male gender
                        </div>
                        <div className='col-3'>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={this.props.femaleGenderOnly}
                                onChange={this.handleFemaleGenderChange}
                            />
                            {' '}
                            Female gender
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

class FilterableUserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            maleGenderOnly: false,
            femaleGenderOnly: false

        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleMaleGenderChange = this.handleMaleGenderChange.bind(this);
        this.handleFemaleGenderChange = this.handleFemaleGenderChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleMaleGenderChange(maleGenderOnly) {
        this.setState({
            maleGenderOnly: maleGenderOnly
        })
    }

    handleFemaleGenderChange(femaleGenderOnly) {
        this.setState({
            femaleGenderOnly: femaleGenderOnly
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    maleGenderOnly={this.state.maleGenderOnly}
                    femaleGenderOnly={this.state.femaleGenderOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onMaleGenderChange={this.handleMaleGenderChange}
                    onFemaleGenderChange={this.handleFemaleGenderChange}
                />
                <UserTable
                    users={this.props.users}
                    filterText={this.state.filterText}
                    maleGenderOnly={this.state.maleGenderOnly}
                    femaleGenderOnly={this.state.femaleGenderOnly}
                />
            </div>
        );
    }
}

// const USERS2 = [
//     {gender: "female", category:'Programmer', last: 'Makogon', first: 'Kate', username: 'makkate2000', phone: '0689808244', location: 'Ukraine'},
//     {gender: "male", category:'Programmer', last: 'Dotsenko', first: 'Vlad', username: 'vladdots', phone: '066666666', location: 'Ukraine'},
//     {gender: "male", category:'Sysadmin', last: 'Makogon', first: 'Oleg', username: 'makoleg', phone: '0684490273', location: 'Ukraine'}
//
// ];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: [],
            showPopup: false,
            genderMale: 0,
            genderFemale: 0
        };
    }
    componentDidMount() {
        fetch("https://randomuser.me/api/?results=10")
            .then(res => res.json())
            .then(
                (result) => {
                    let countMale = 0;
                    let countFemale = 0;
                    result.results.forEach((user) => {
                        if (user.gender === 'male') {
                            countMale++;
                        }
                    });
                    result.results.forEach((user) => {
                        if (user.gender === 'female') {
                            countFemale++;
                        }
                    });
                    this.setState({
                        isLoaded: true,
                        users: result.results,
                        genderMale : countMale*10,
                        genderFemale: countFemale*10
                        //genderFemale : this.props.users.forEach((user) => {(this.state.user.gender === 'female')? genderFemale++ : genderFemale})
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const { error, isLoaded} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App align-items-center">

                    <ControlledPopup genderMale={this.state.genderMale} genderFemale={this.state.genderFemale}/>
                    <FilterableUserTable users={this.state.users}/>
                </div>
            );
        }
    }
}

export default App;

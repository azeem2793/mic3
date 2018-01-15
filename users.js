//#region User's Table
var UserTableRow = React.createClass({
    openPlanetInfo: function (planeturl) {
        ReactDOM.render(
            <PlanetCard dataUrl={planeturl} />,
            document.getElementById('root')
        );
    },
    render: function () {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.height}</td>
                <td>{this.props.item.mass}</td>
                <td>{this.props.item.created}</td>
                <td>{this.props.item.edited}</td>
                <td>  <a className="btn" onClick={() => this.openPlanetInfo(this.props.item.homeworld)}>{this.props.item.homeworld}</a></td>

            </tr>
        );
    }
});

var UserTable = React.createClass({
    getInitialState: function () {
        return {
            items: []
        }
    },
    componentDidMount: function () {
        $.get(this.props.dataUrl, function (data) {
            if (this.isMounted()) {
                this.setState({
                    items: data.results
                });
            }
        }.bind(this));
    },
    render: function () {
        var rows = [];
        this.state.items.forEach(function (item) {
            rows.push(<UserTableRow key={item.name} item={item} />);
        });

        return (
            <table id="peopleTable" className="table table-bordered table-responsive">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Height</th>
                        <th>Mass</th>
                        <th>Created</th>
                        <th>Edited</th>
                        <th>Planet</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>);
    }
});
ReactDOM.render(
    <UserTable dataUrl="https://swapi.co/api/people/?page=1" />,
    document.getElementById('userdatatable')
);
//#endregion


//#region Planet-Info card

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

var PlanetCard = React.createClass({
    getInitialState: function () {
        return {
            item: '',
            toggle: true
        }
    },
    componentDidMount: function () {
        $.get(this.props.dataUrl, function (data) {
            if (this.isMounted()) {
                this.setState({
                    item: data,
                    toggle: true
                });
            }
        }.bind(this));
    },
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    },
    closeCard: function () {
        $("#planetModal").remove();
    },
    render: function () {

        return (
            <div className="modal" id="planetModal" style={this.state.toggle ? display : display}>
                <div className="modal-content">
                    <h4>Planet Information</h4>
                    <div>
                        <p>Name: {this.state.item.name}</p>
                        <p>Diameter: {this.state.item.diameter}</p>
                        <p>Climate: {this.state.item.climate}</p>
                        <p>Population: {this.state.item.population}</p>
                    </div>
                    <a className="btn btn-danger" onClick={this.closeCard}>Close</a>
                </div>
            </div>
        );
    }
});
//#endregion
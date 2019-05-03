import React, {Component} from 'react';
import './App.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import {generateMockData} from './generate-mock-data';
import './styles.scss';
import Chance from 'chance';

const chance = new Chance();

class App extends Component {
    componentDidMount() {
        const NameList = ['Matt', 'Nathan', 'Kalyan', 'Bill', 'John', 'Asuvani', 'Mark', 'Mike', 'Megan'];
        const generatedData = generateMockData(NameList);
        this.setState({rowData: generatedData.rowData, columnDefs: generatedData.columnDefs});
    }

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [],
            rowData: [{}],
            defaultColDef: {
                editable: true,
                resizable: true,
                sortable: true
            },
            newPerson: '',
            functionalArea: ''
        };
    }

    onGridReady = params => {
        this.setState({
            gridApi: params.api,
            columnApi: params.columnApi
        });
        //this.state.gridApi.setRowData(this.state.rowData);
        this.state.gridApi.sizeColumnsToFit();
        window.addEventListener('resize', () => {
            params.api.sizeColumnsToFit();
        });
    };

    addPerson = event => {
        event.preventDefault();
        //let newColDef = {...this.state.columnDefs[this.state.columnDefs.length - 1]};
        const newId = chance.hash({length: 10});
        let newColDef = {
            headerName: this.state.newPerson,
            field: newId,
            valueFormatter: params => {
                return params.value === 0 ? '' : params.value;
            },
            editable: true,
            cellClass: params => {
                return `cell-color-${params.value} center-text`;
            },
            aggFunc: 'sum'
        };

        let updatedRowData = this.state.rowData.map(el => {
            el[newId] = 0;
            return el;
        });

        let temp = this.state.columnDefs.concat(newColDef);
        this.state.gridApi.setColumnDefs(temp);
        this.setState({rowData: updatedRowData, columnDefs: temp}, () => {
            this.state.gridApi.sizeColumnsToFit();
        });
    };

    addFunctionalArea = event => {
        event.preventDefault();
        const newId = chance.hash({length: 10});
        const newArea = this.state.functionalArea;
        let updatedRowData = this.state.rowData.map(el => {
            el[newId] = 0;
            return el;
        });
        let newRowData = {...this.state.rowData[this.state.rowData.length - 1]};
        newRowData[newId] = 0;
        Object.keys(newRowData).map(el => {
            if (el === 'keyArea') {
                newRowData[el] = newArea;
            } else if (el !== 'groupHack') {
                newRowData[el] = 0;
            }
        });
        updatedRowData = updatedRowData.concat(newRowData);
        this.setState({rowData: updatedRowData});
    };

    handleFAChange = e => {
        this.setState({functionalArea: e.target.value});
    };
    handleAddPersonChange = e => {
        this.setState({newPerson: e.target.value});
    };

    render() {
        return (
            <div className='app-container'>
                <div
                    className='ag-theme-balham'
                    style={{
                        height: '90vh',
                        width: '100%'
                    }}
                >
                    <div className='actions-container'>
                        <div className='action'>
                            <label>
                                Add Functional Area:
                                <input type='text' className='action-input' onChange={this.handleFAChange} />
                                <button onClick={this.addFunctionalArea}>Add</button>
                            </label>
                        </div>
                        <div className='action'>
                            <label>
                                Add Person:
                                <input type='text' className='action-input' onChange={this.handleAddPersonChange} />
                                <button onClick={this.addPerson}>Add</button>
                            </label>
                        </div>
                    </div>

                    <AgGridReact
                        onGridReady={this.onGridReady}
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        groupDefaultExpanded={1}
                        suppressAggFuncInHeader={true}
                        autoGroupColumnDef={{
                            headerName: '',
                            pinned: 'left',
                            width: 1,
                            resizable: false,
                            filter: false,
                            menuTabs: [],
                            suppressSizeToFit: true,
                            checkbox: false,
                            cellRenderer: 'agGroupCellRenderer'
                        }}
                        defaultColDef={{
                            sortable: true,
                            resizable: true,
                            filter: true
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default App;

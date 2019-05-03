import React, {Component} from 'react';
import './App.css';
import './styles.scss';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {generateMockData} from './generate-mock-data';

class App extends Component {
    componentDidMount() {
        const NameList = ['Matt', 'Nathan', 'Kalyan', 'Bill', 'John', 'Asuvani', 'Mark', 'Mike', 'Megan'];
        const generatedData = generateMockData(NameList);

        console.log(generatedData.columnDefs);
        console.log(this.state.columnDefs);
        this.setState({rowData: generatedData.rowData, columnDefs: generatedData.columnDefs});
    }

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {
                    field: 'keyArea',
                    headerName: 'Functional Area'
                }
            ],

            rowData: [
                // {keyArea: 'Zeke busicpi oga.', '2eca01a876': 3, '782400d7f2': 5, e7f5633c45: 4},
                // {keyArea: 'Okeehak sezha rupud.', '2eca01a876': 2, '782400d7f2': 4, e7f5633c45: 5},
                // {keyArea: 'Peciibo al offasad.', '2eca01a876': 3, '782400d7f2': 0, e7f5633c45: 3},
                // {keyArea: 'Utbiin reb iffod.', '2eca01a876': 5, '782400d7f2': 4, e7f5633c45: 3}
                {}
            ],
            defaultColDef: {
                editable: true,
                resizable: true,
                sortable: true
            }
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

    render() {
        return (
            <div className='app-container'>
                <div
                    className='ag-theme-balham'
                    style={{
                        height: '500px',
                        width: '100%'
                    }}
                >
                    <AgGridReact
                        onGridReady={this.onGridReady}
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        groupIncludeFooter={true}
                        // groupIncludeTotalFooter={true}
                    />
                </div>
            </div>
        );
    }
}

export default App;

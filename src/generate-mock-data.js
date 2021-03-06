import Chance from 'chance';
import * as d3 from 'd3';

const chance = new Chance();

export const generateMockData = NameList => {
    let mockData = [];
    let aggDataRow = [];
    let aggRange = [];
    let colorRange;

    const generateHeaders = NameList => {
        let columnIds = NameList.map(el => chance.hash({length: 10}));
        let defsList = [
            {
                headerName: 'Functional Area',
                field: 'keyArea',
                suppressSizeToFit: true,
                pinned: 'left',
                editable: true
            },
            {
                field: 'groupHack',
                headerName: '',
                rowGroup: true,
                pinned: 'left',
                groupDefaultExpanded: true,
                hide: true,
                width: 5,
                menuTabs: [],
                sortable: false,
                resizable: false,
                filter: false,
                cellClass: 'groupHack'
            },
            {
                headerName: 'Total',
                pinned: 'left',
                valueGetter: params => {
                    let total = 0;
                    const colIds = Object.keys(params.data).map(curr => {
                        if (curr !== 'keyArea' && curr !== 'y' && curr !== 'groupHack') {
                            return curr;
                        } else {
                            return false;
                        }
                    });
                    var filtered = colIds.filter(el => el);
                    filtered.map(el => {
                        total += parseInt(params.data[el]);
                    });
                    return total;
                },
                editable: false,
                aggFunc: 'sum',
                cellClass: 'total-col center-text',
                suppressSizeToFit: true,
                width: 75,
                menuTabs: [],
                field: 'y',
                cellStyle: params => {
                    if (params.node.aggData) {
                        aggDataRow = Object.values(params.node.aggData);
                        aggDataRow.sort((a, b) => {
                            return a - b;
                        });
                        //aggDataMax = aggData[aggData.length - 1];
                    }
                    if (params.node.data && !params.node.aggData) {
                        if (aggRange.length === 0) {
                            params.api.forEachNode(node => {
                                if (!node.aggData) {
                                    let vals = Object.values(node.data).filter(x => typeof x === 'number');
                                    const total = vals.reduce((acc, curr) => acc + curr);
                                    aggRange.push(total);
                                }
                            });
                            aggRange.sort((a, b) => {
                                return a - b;
                            });
                            colorRange = d3
                                .scaleLinear()
                                .domain([0, aggRange[aggRange.length - 1]])
                                .interpolate(d3.interpolateHcl)
                                .range([d3.rgb('#ff9396'), d3.rgb('#ade795')]);
                        }
                        let temp = Object.values(params.node.data);
                        let vals = temp.filter(x => typeof x === 'number');
                        let rowTotal = vals.reduce((acc, curr) => acc + curr);
                        return {backgroundColor: colorRange(rowTotal)};
                    }
                }
            }
        ];
        for (var i = 0; i < NameList.length; i++) {
            let colDef = {};
            colDef.headerName = NameList[i];
            colDef.field = columnIds[i];
            colDef.valueFormatter = params => {
                return params.value === 0 ? '' : params.value;
            };
            colDef.editable = true;
            colDef.cellClass = params => {
                return `cell-color-${params.value} center-text`;
            };
            colDef.aggFunc = 'sum';
            defsList.push(colDef);
        }
        return defsList;
    };

    const generateAreaNames = count => {
        let areaNameList = [];
        for (var i = 0; i < count; i++) {
            areaNameList.push(chance.sentence({words: 3}));
        }
        return areaNameList;
    };

    const generateRow = (peopleList, areaName) => {
        let newRow = {};
        for (var i = 0; i < peopleList.length; i++) {
            const temp = chance.natural({min: 0, max: 15});
            newRow[peopleList[i].field] = temp > 5 ? 0 : temp;
        }
        newRow.keyArea = areaName;
        newRow.groupHack = `x`;
        return newRow;
    };

    const columnDefs = generateHeaders(NameList);
    const areaNameList = generateAreaNames(chance.natural({min: 15, max: 40}));
    for (var i = 1; i < areaNameList.length; i++) {
        mockData.push(generateRow(columnDefs, areaNameList[i]));
    }
    return {rowData: mockData, columnDefs};
};

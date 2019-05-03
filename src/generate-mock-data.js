import Chance from 'chance';

const chance = new Chance('test');

export const generateMockData = NameList => {
    const numOfBaseMachines = 10;
    const numOfRows = 100;
    let mockData = [];
    //const NameList = ['Matt', 'Nathan', 'Kalyan'];

    const generatePeople = colList => {
        let nameList = [];
        for (var i = 1; i < colList.length; i++) {
            nameList.push({
                baseMachineCode: chance.hash({casing: 'upper', length: 6}),
                baseMachineName: chance.sentence({words: 3})
            });
        }
        return nameList;
    };

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
                headerName: 'Total',
                valueGetter: params => {
                    let total = 0;
                    columnIds.map(el => {
                        total += parseInt(params.data[el]);
                    });
                    return total;
                },
                editable: false,
                aggFunc: 'sum',
                cellClass: 'total-col',
                suppressSizeToFit: true,
                width: 60
            }
        ];
        for (var i = 0; i < NameList.length; i++) {
            let colDef = {};
            //const id = chance.hash({length: 10});
            //const id = columnIds[i];
            colDef.headerName = NameList[i];
            colDef.field = columnIds[i];
            colDef.editable = true;
            colDef.cellClass = params => {
                return `cell-color-${params.value}`;
            };
            colDef.children = [
                {
                    headerValueGetter: params => {
                        console.log(params);
                    },
                    // aggFunc: 'sum',
                    // headerName: 'xx',
                    field: columnIds[i],
                    editable: true,
                    cellClass: params => {
                        return `cell-color-${params.value}`;
                    }
                }
            ];
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
            newRow[peopleList[i].field] = chance.natural({min: 0, max: 5});
        }
        newRow.keyArea = areaName;
        // let newRow = {
        //     //optionGroupName: chance.sentence({ words: 6 }),
        //     optionGroupName: groupNameList[Math.floor(Math.random() * (groupNameList.length - 1 - 0) + 0)],
        //     optionCodeName: chance.sentence({words: 3}),
        //     optionCode: chance.natural({min: 1000, max: 9999}),
        //     optionTakeRates: []
        // };
        // for (var i = 0; i < modelList.length; i++) {
        //     newRow.optionTakeRates.push({
        //         baseMachineCode: modelList[i].baseMachineCode,
        //         baseMachineName: modelList[i].baseMachineName,
        //         takeRateCount: chance.natural({min: 0, max: 400}),
        //         takeRatePercent: chance.floating({min: 0, max: 100, fixed: 1})
        //     });
        // }
        return newRow;
    };

    //const peopleList = generatePeople(NameList);
    const peopleList = NameList;
    const columnDefs = generateHeaders(NameList);
    const areaNameList = generateAreaNames(chance.natural({min: 15, max: 20}));
    for (var i = 1; i < areaNameList.length; i++) {
        mockData.push(generateRow(columnDefs, areaNameList[i]));
    }
    return {rowData: mockData, columnDefs};
};
export const staticMockData = () => {
    return [
        {
            optionGroupName: 'Grand Total',
            optionCodeName: '',
            optionCode: '',
            optionTakeRates: [
                {
                    baseMachineCode: '459ENW',
                    baseMachineName: '4630 Sprayer',
                    takeRateCount: 258,
                    takeRatePercent: 100
                },
                {
                    baseMachineCode: '4620NW',
                    baseMachineName: '4730 Sprayer',
                    takeRateCount: 453,
                    takeRatePercent: 100
                },
                {
                    baseMachineCode: '462ENW',
                    baseMachineName: '4730 Sprayer Carb',
                    takeRateCount: 138,
                    takeRatePercent: 100
                },
                {
                    baseMachineCode: '462FNW',
                    baseMachineName: '4730 Sprayer Carb B',
                    takeRateCount: 604,
                    takeRatePercent: 100
                },
                {
                    baseMachineCode: '-1',
                    baseMachineName: 'Grand Total',
                    takeRateCount: 1453,
                    takeRatePercent: 100
                }
            ]
        },
        {
            optionGroupName: 'Ag Management Solutions Autotrac Activations',
            optionCodeName: 'Auto Trac Activation sf1',
            optionCode: 1841,
            optionTakeRates: [
                {
                    baseMachineCode: '459ENW',
                    baseMachineName: '4630 Sprayer',
                    takeRateCount: 69,
                    takeRatePercent: 26.7
                },
                {
                    baseMachineCode: '4620NW',
                    baseMachineName: '4730 Sprayer',
                    takeRateCount: 27,
                    takeRatePercent: 6.0
                },
                {
                    baseMachineCode: '462ENW',
                    baseMachineName: '4730 Sprayer Carb',
                    takeRateCount: 0,
                    takeRatePercent: 0
                },
                {
                    baseMachineCode: '462FNW',
                    baseMachineName: '4730 Sprayer Carb B',
                    takeRateCount: 124,
                    takeRatePercent: 20.5
                },
                {
                    baseMachineCode: '-1',
                    baseMachineName: 'Grand Total',
                    takeRateCount: 220,
                    takeRatePercent: 15.1
                }
            ]
        },
        {
            optionGroupName: 'Ag Management Solutions Autotrac Activations',
            optionCodeName: 'Auto Trac Activation sf3',
            optionCode: '1841',
            optionTakeRates: [
                {
                    baseMachineCode: '459ENW',
                    baseMachineName: '4630 Sprayer',
                    takeRateCount: 169,
                    takeRatePercent: 65.5
                },
                {
                    baseMachineCode: '4620NW',
                    baseMachineName: '4730 Sprayer',
                    takeRateCount: 32,
                    takeRatePercent: 7.1
                },
                {
                    baseMachineCode: '462ENW',
                    baseMachineName: '4730 Sprayer Carb',
                    takeRateCount: 10,
                    takeRatePercent: 7.2
                },
                {
                    baseMachineCode: '462FNW',
                    baseMachineName: '4730 Sprayer Carb B',
                    takeRateCount: 369,
                    takeRatePercent: 61.1
                },
                {
                    baseMachineCode: '-1',
                    baseMachineName: 'Grand Total',
                    takeRateCount: 580,
                    takeRatePercent: 39.9
                }
            ]
        },
        {
            optionGroupName: 'Ag Management Solutions Autotrac Activations',
            optionCodeName: 'Less Autotrac Activation',
            optionCode: '1845',
            optionTakeRates: [
                {
                    baseMachineCode: '459ENW',
                    baseMachineName: '4630 Sprayer',
                    takeRateCount: 1,
                    takeRatePercent: 0.4
                },
                {
                    baseMachineCode: '4620NW',
                    baseMachineName: '4730 Sprayer',
                    takeRateCount: 79,
                    takeRatePercent: 17.4
                },
                {
                    baseMachineCode: '462ENW',
                    baseMachineName: '4730 Sprayer Carb',
                    takeRateCount: 0,
                    takeRatePercent: 0
                },
                {
                    baseMachineCode: '462FNW',
                    baseMachineName: '4730 Sprayer Carb B',
                    takeRateCount: 85,
                    takeRatePercent: 14.1
                },
                {
                    baseMachineCode: '-1',
                    baseMachineName: 'Grand Total',
                    takeRateCount: 165,
                    takeRatePercent: 11.4
                }
            ]
        },
        {
            optionGroupName: 'Auto Air Spring Leveling',
            optionCodeName: 'Less Auto Air Spring Leveling',
            optionCode: '7100',
            optionTakeRates: [
                {
                    baseMachineCode: '459ENW',
                    baseMachineName: '4630 Sprayer',
                    takeRateCount: 14,
                    takeRatePercent: 5.4
                },
                {
                    baseMachineCode: '4620NW',
                    baseMachineName: '4730 Sprayer',
                    takeRateCount: 5,
                    takeRatePercent: 1.1
                },
                {
                    baseMachineCode: '462ENW',
                    baseMachineName: '4730 Sprayer Carb',
                    takeRateCount: 0,
                    takeRatePercent: 0
                },
                {
                    baseMachineCode: '462FNW',
                    baseMachineName: '4730 Sprayer Carb B',
                    takeRateCount: 0,
                    takeRatePercent: 0
                },
                {
                    baseMachineCode: '-1',
                    baseMachineName: 'Grand Total',
                    takeRateCount: 443,
                    takeRatePercent: 30.5
                }
            ]
        },
        {
            optionGroupName: 'Auto Air Spring Leveling',
            optionCodeName: 'AUTO AIR SPRING LEVEL 5',
            optionCode: '7110',
            optionTakeRates: [
                {
                    baseMachineCode: '459ENW',
                    baseMachineName: '4630 Sprayer',
                    takeRateCount: 244,
                    takeRatePercent: 94.6
                },
                {
                    baseMachineCode: '4620NW',
                    baseMachineName: '4730 Sprayer',
                    takeRateCount: 448,
                    takeRatePercent: 98.9
                },
                {
                    baseMachineCode: '462ENW',
                    baseMachineName: '4730 Sprayer Carb',
                    takeRateCount: 138,
                    takeRatePercent: 100
                },
                {
                    baseMachineCode: '462FNW',
                    baseMachineName: '4730 Sprayer Carb B',
                    takeRateCount: 604,
                    takeRatePercent: 100
                },
                {
                    baseMachineCode: '-1',
                    baseMachineName: 'Grand Total',
                    takeRateCount: 19,
                    takeRatePercent: 1.3
                }
            ]
        }
    ];
};

// export default staticMockData;

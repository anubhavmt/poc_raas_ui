import SelectWithSearch from "@mindtickle/select-with-search";
import {usePaginationFragment, useRelayEnvironment} from "react-relay";
import {graphql} from 'graphql';
import {useCallback, useMemo} from "react";
import {QueryRenderer} from 'react-relay';
import {getEnvironment} from './relay.environment';

const {RelayEnvironmentProvider} = require('react-relay/hooks');

export const MODULE_DATA_QUERY = graphql`
    query SelectWithSearchPOCQuery(
        $first: Int
        $after: ID
        $searchText: String
        $seriesIds: [ID!]
        $milestoneIds: [ID!]
        $moduleTypes: [ModuleType!]
    ) {
        ...SelectWithSearchPOC_modules
        @arguments(
            first: $first
            after: $after
            searchText: $searchText
            seriesIds: $seriesIds
            milestoneIds: $milestoneIds
            moduleTypes: $moduleTypes
        )
    }
`;

export const MODULE_PAGINATION_QUERY = graphql`
    fragment SelectWithSearchPOC_modules on Query
    @argumentDefinitions(
        first: { type: Int }
        after: { type: ID }
        searchText: { type: String }
        seriesIds: { type: "[ID!]" }
        milestoneIds: { type: "[ID!]" }
        moduleTypes: { type: "[ModuleType!]" }
    )
    @refetchable(queryName: "ModuleListDataRefetchQuery") {
        module {
            listModules(
                first: $first
                after: $after
                searchText: $searchText
                seriesIds: $seriesIds
                milestoneIds: $milestoneIds
                moduleTypes: $moduleTypes
            ) @connection(key: "ModuleListData_listModules") {
                edges {
                    node {
                        id
                        name
                        type
                        parentList {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`;

const CUSTOM_SUB_LABEL_OPTIONS = [
    {
        value: 'longText',
        label: 'mogambo kabhi kabhi bohot khush hota hai',
        color: '#00B8D9',
        subLabel: 100,
    },
    {
        value: 'ocean',
        label: 'Oceangfcfgcgscgfscfgscghghcfghsacfgcfgcsaccfcfcfascfgcfasgfhags',
        color: '#00B8D9',
        disabled: true,
        subLabel: 100,
    },
    {value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true, subLabel: 150},
    {value: 'purple', label: 'Purple', color: '#5243AA', subLabel: 120},
    {value: 'red', label: 'Red', color: '#FF5630', subLabel: 110},
    {value: 'orange', label: 'Orange', color: '#FF8B00', subLabel: 90},
    {value: 'yellow', label: 'Yellow', color: '#FFC400', subLabel: 80},
    {value: 'green', label: 'Green', color: '#36B37E', subLabel: 30},
    {value: 'forest', label: 'Forest', color: '#00875A', subLabel: 40},
    {value: 'slate', label: 'Slate', color: '#253858', subLabel: 10},
    {value: 'silver', label: 'Silver', color: '#666666', subLabel: 11},
];

export const colourOptions = [
    {
        value: 'ocean',
        label: 'Oceangfcfgcgscgfscfgscghghcfghsacfgcfgcsaccfcfcfascfgcfasgfhags',
        color: '#00B8D9',
        disabled: true,
    },
    {value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true},
    {value: 'purple', label: 'Purple', color: '#5243AA'},
    {value: 'red', label: 'Red', color: '#FF5630'},
    {value: 'orange', label: 'Orange', color: '#FF8B00'},
    {value: 'yellow', label: 'Yellow', color: '#FFC400'},
    {value: 'green', label: 'Green', color: '#36B37E'},
    {value: 'forest', label: 'Forest', color: '#00875A'},
    {value: 'slate', label: 'Slate', color: '#253858'},
    {value: 'silver', label: 'Silver', color: '#666666'},
];


export const filterColors = search =>
    colourOptions.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));

export const promiseOption = ({search}) =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(filterColors(search));
        }, 1000);
    });


export const promiseCustomSubLabelOptions = ({search}) =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(
                CUSTOM_SUB_LABEL_OPTIONS.filter(i => i.label.toLowerCase().includes(search.toLowerCase()))
            );
        }, 1000);
    });


function CheckBoxStyleRenderer({data}) {
    return <p>"helloe world"</p>;
}


function SelectionWrapper({entities}) {

    const {data, loadNext} = usePaginationFragment(MODULE_PAGINATION_QUERY, entities);

    console.log(data)

    const handleLoadMoreData = useCallback(
        () =>
            new Promise((resolve, reject) =>
                loadNext(25, {
                    onComplete: err => {
                        if (err) {
                            reject();
                        }
                        resolve();
                    },
                })
            ),
        [loadNext]
    );

    return (
        <SelectWithSearch
            entities={props}
            async={true}
            promiseOption={handleLoadMoreData}
            // defaultValue={[colourOptions[2]]}
            onChange={(value) => {
                console.log(value)
            }}
        />);

}

function SelectWithSearchPOC() {

    const renderQuery = ({error, props}) => {
        if (error) {
            return <p>Sorry didn't found your module</p>
        } else {
            return <SelectionWrapper entities={props}/>
        }
    }
    const environment = useRelayEnvironment();
    return (
        <QueryRenderer
            environment={environment}
            query={MODULE_DATA_QUERY}
            variables={{
                "first": 25,
                "after": "-1",
                "searchText": "",
                "seriesIds": [],
                "milestoneIds": [],
                "moduleTypes": [
                    "COURSE",
                    "UPDATE",
                    "ASSESSMENT",
                    "CHECKLIST",
                    "ILT",
                    "REINFORCEMENT",
                    "MISSION",
                    "COACHING",
                    "VOICE_OVER_PPT_COACHING",
                    "VIDEO_PITCH_COACHING",
                    "TASK_EVALUATION_COACHING",
                    "SCREEN_CAPTURE_COACHING",
                    "ONE_TO_ONE_COACHING"
                ]
            }}
            render={renderQuery}
        />
    );
}

function SelectWithSearchPOCWithRelay() {
    const environment = useMemo(() => getEnvironment(), []);
    return (
        <>
            <RelayEnvironmentProvider environment={environment}>
                <SelectWithSearchPOC/>
            </RelayEnvironmentProvider>
        </>
    );
}

export default SelectWithSearchPOCWithRelay;
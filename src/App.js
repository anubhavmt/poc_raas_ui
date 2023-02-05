import "./styles.css";
import {useCallback, useState} from "react";
import Create from "./CreateTemplate";
import response from "./response.json";
import TableItemList from "./TableItemList";
import Divider from "@mindtickle/divider";
import {StyledWrapperDiv} from "./style";
import EllipsisTooltip from "@mindtickle/ellipsis-tooltip";
import ModuleLabel from "./ModuleLabel";
import Dropdown from "./Dropdown";
import config from './config.json'
import SelectWithSearch from '@mindtickle/select-with-search'
import {injectIntl} from "react-intl";
import {graphql, usePaginationFragment} from "react-relay";
import SelectWithSearchPOC from "./SelectWithSearchPOC";


export function getrule(curRule, ruleType) {
    if (curRule) {
        const expression = response.data.node.condition;
        const action = response.data.node.action;

        return {
            condition: {
                expressionType: expression.expressionType,
                expression: expression.expressions.map((obj) => {
                    return {
                        id: Math.random() * 10,
                        objectId: obj.objectId,
                        operatorType: obj.operatorType,
                        dimensionName: obj.dimensionName,
                        dimensionValue: obj.dimensionValue,
                        dimensionType: obj.dimensionType,
                        objectType: obj.objectType
                    };
                })
            },
            action: {
                ACTION_RETRIES: action.ACTION_RETRIES,
                type: action.type,
                addedType: action.addedType,
                values: action.values.map((obj) => {
                    return {
                        type: obj.type,
                        values: obj.values
                    };
                })
            },
            context: {
                ruleType: response.data.node.context.ruleType
            }
        };
    } else {
        return {
            condition: {
                expressionType: "AND",
                expression: [{id: "2"}]
            },
            action: {
                values: [{id: "34"}]
            },
            context: {
                ruleType: Object.keys(config)[0]
            }
        };
    }
}

function App(props) {

    const listOfComponentsToDisplay =

        getrule("fetchRule").condition.expression.map(({
                                                           objectId,
                                                           operatorType,
                                                           dimensionName,
                                                           dimensionValue,
                                                           dimensionType, objectType
                                                       }, index) => {

            return (
                < ModuleLabel
                    index={index}
                    operatorType={operatorType}
                    dimensionName={dimensionName}
                    dimensionValue={dimensionValue}
                    dimensionType={dimensionType}
                    objectId={objectId}
                    objectType={objectType}
                />)
        })


    const renderConditionContent = (item, i) => {
        return (
            <>
                {i > 0 && <Divider plain>{"AND"}</Divider>}
                <StyledWrapperDiv>
                    <EllipsisTooltip
                        showTooltipWhenEllipsis={true}
                        title={item}
                        wrapperClassName="tableItemList"
                    >
                        {item}
                    </EllipsisTooltip>
                </StyledWrapperDiv>
            </>)
    };

    const moreItemConfig = {
        renderMoreContent: renderConditionContent,
        numContentsToExclude: 0,
        viewMoreText: "View all condition",
    };


    let fetchRule = null;
    const nowrule = getrule(fetchRule);
    const [rule, updaterule] = useState(nowrule);
    const [rule_type, setruleType] = useState(nowrule.context.ruleType)
    const Ruleslist = Object.keys(config);

    function ruletypeChange(value) {

        const obj = {
            condition: {
                expressionType: "AND",
                expression: [{id: "2"}]
            },
            action: {
                values: [{id: "34"}]
            },
            context: {
                ruleType: value
            }
        }

        setruleType(value);
        updaterule(obj);

    }


    return (
        <div className="App">

            ...........................Picker......................................................

            <SelectWithSearchPOC/>


            <br/><br/><br/><br/><br/><br/>
            ...........................Table condition show......................................................
            <TableItemList contents={listOfComponentsToDisplay} moreItemConfig={moreItemConfig}/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>


            {fetchRule ? "MANAGE RULE" : "CREATE RULE"}
            <br/><br/>
            <br/><br/>


            <div className='parent'>
                Change rule type
                <Dropdown selectValue={rule_type} filterData={Ruleslist}
                          setFilteredData={ruletypeChange}/>
            </div>
            <br/><br/><br/>


            <Create rule={rule} updaterule={updaterule} rule_type={rule_type}/>


        </div>
    );
}

export default injectIntl(App);
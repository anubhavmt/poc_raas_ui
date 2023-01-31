import React, {useEffect, useState} from "react";
import './style'
import config from "./config.json";
import Multiselect from "multiselect-react-dropdown";
import Dropdown from "./Dropdown";
import {getrule} from "./App";

function ListConfig({list_attribute}) {
    const element = list_attribute.map((value) => (
        <option key={value} value={value}>
            {value}
        </option>
    ));

    return element;
}

function Operator({selectedValue, rule_type, expressionParent}) {
    const exconfig = config[rule_type].objects[expressionParent][selectedValue];

    if (exconfig) {
        let operator = exconfig["validator"]["operator"].map((value) => (
            <option key={value} value={value}>
                {value}
            </option>
        ));
        return operator;
    }

    return "";
}

function AttributeValue({selectedValue, changeValue, alreadyvalue, rule_type, expressionParent}) {
    const exconfig = config[rule_type].objects[expressionParent][selectedValue];
    const [value, updatevalue] = useState(alreadyvalue);

    function updateValue(val) {
        updatevalue(val.target?.value);

        changeValue(val.target?.value);
    }

    if (exconfig) {
        const valuetype = exconfig.validator.value.Type;
        if (valuetype === "Enum") {
            let values = exconfig.validator.value.EnumValues.map((valu) => (
                <option key={valu.value} value={valu.value}>
                    {valu.text}
                </option>
            ));
            return (
                <>
                    {value}
                    <select id="opera" onChange={updateValue} value={value}>
                        <option hidden>Select your option</option>
                        {values}
                    </select>
                </>
            );
        } else if (valuetype === "NoRange") {
            const min = exconfig.validator.value.RangeValues.min;
            const max = exconfig.validator.value.RangeValues.max;
            const step = exconfig.validator.value.RangeValues.step;

            return (
                <>
                    {value}
                    <input
                        type="number"
                        id="points"
                        name="points"
                        // step={step}
                        // min={min}
                        // max={max}
                        value={value}
                        onChange={updateValue}
                    />
                </>
            );
        }
    }

    return "";
}

function MySelectCondition({
                               expression,
                               expressiontype,
                               updateexpression,
                               updateexpressiontype,
                               rule_type

                           }) {

    const [value, updateValue] = useState(expression);


    function changeParent(val) {

        const newexpression = {
            id: value.id,
            objectId: undefined,
            operatorType: undefined,
            dimensionName: undefined,
            dimensionValue: undefined,
            dimensionType: undefined,
            expressionParent: val.target.value
        };
        updateValue(newexpression);
        updateexpression(newexpression);
    }

    function change(val) {
        const type =
            config[rule_type].objects[value.expressionParent][val.target.value]
                .attributeType;

        const newexpression = {
            id: value.id,
            objectId: undefined,
            operatorType: undefined,
            dimensionName: val.target.value,
            dimensionValue: undefined,
            dimensionType: type,
            expressionParent: value.expressionParent
        };
        updateValue(newexpression);
        updateexpression(newexpression);
    }

    function changeoperator(val) {
        const newexpression = {
            id: value.id,
            objectId: value.objectId,
            operatorType: val.target.value,
            dimensionName: value.dimensionName,
            dimensionValue: value.dimensionValue,
            dimensionType: value.dimensionType,
            expressionParent: value.expressionParent
        };
        updateValue(newexpression);
        updateexpression(newexpression);
    }

    function changeValue(val) {
        const valuenew = {
            id: value.id,
            objectId: value.objectId,
            operatorType: value.operatorType,
            dimensionName: value.dimensionName,
            dimensionValue: val,
            dimensionType: value.dimensionType,
            expressionParent: value.expressionParent
        };
        updateValue(valuenew);
        updateexpression(valuenew);
    }

    function changeObjectid(val) {
        const valuenew = {
            id: value.id,
            objectId: val.target.value,
            operatorType: value.operatorType,
            dimensionName: value.dimensionName,
            dimensionValue: value.dimensionValue,
            dimensionType: value.dimensionType,
            expressionParent: value.expressionParent
        };
        updateValue(valuenew);
        updateexpression(valuenew);
    }

    return (
        <div>

            {value?.expressionParent ?? ""}&ensp;
            <select id="lang" onChange={changeParent} value={value?.expressionParent ?? ""}>
                <option hidden>Select your option</option>
                <ListConfig list_attribute={Object.keys(config[rule_type].objects)}/>
            </select>
            &ensp;
            {!!value.expressionParent ? (
                <>
                    {value?.dimensionName ?? ""}&ensp;
                    <select id="lang" onChange={change} value={value?.dimensionName ?? ""}>
                        <option hidden>Select your option</option>
                        <ListConfig list_attribute={Object.keys(config[rule_type].objects[value.expressionParent])}/>
                    </select>
                    &ensp;</>) : ''}
            {(value?.dimensionName ?? "") !== "" ? (
                <>
                    {value?.objectId ?? ""}
                    <select
                        id="lang"
                        onChange={changeObjectid}
                        value={value?.objectId ?? ""}
                    >
                        <option hidden>Select your option</option>
                        <option value={"1234"}> {"1234"} </option>
                        <option value={"5678"}> {"5678"} </option>
                    </select>
                </>
            ) : (
                ""
            )}
            &ensp; &ensp;
            {(value?.dimensionName ?? "") !== "" ? (
                <>
                    is &ensp;
                    {value.operatorType}
                    <select
                        id="opera"
                        onChange={changeoperator}
                        value={value.operatorType}
                    >
                        <option hidden>Select your option</option>
                        <Operator expressionParent={value.expressionParent} selectedValue={value.dimensionName}
                                  rule_type={rule_type}/>
                    </select>
                </>
            ) : (
                ""
            )}
            &ensp;
            {(value?.operatorType ?? "") !== "" ? (
                <AttributeValue
                    selectedValue={value?.dimensionName}
                    changeValue={changeValue}
                    expressionParent={value.expressionParent}
                    alreadyvalue={value?.dimensionValue ?? ""}
                    rule_type={rule_type}
                />
            ) : (
                ""
            )}
            <br/>
            <br/>
        </div>
    );
}

function Typeofcondition({action, updateaction, rule_type}) {
    const actions = config[rule_type].actions;
    return (
        <>
            {action?.type ?? ""}
            &ensp;
            <select
                id="opera"
                onChange={(v) => updateaction(v.target.value)}
                value={action.type}
            >
                <option hidden>Select your option</option>
                {actions.map((valu) => (
                    <option key={valu.actionOn} value={valu.actionOn}>
                        {valu.actionOn}
                    </option>
                ))}
            </select>
        </>
    );
}

function MySelectAction({action, updateactions, rule_type}) {
    const [id, updateid] = useState([]);

    const [actionhere, updateactionhere] = useState(action);

    function updateActionType(newactiontype) {
        const newtype = {
            id: "34",
            type: newactiontype,
            values: []
        };
        updateactionhere(newtype);
        updateactions(newtype);
    }

    function updateActionValue(action) {
        const actionvalues = action.map((obj) => obj.id);

        const newaction = {
            id: actionhere.id,
            type: actionhere.type,
            values: actionvalues
        };

        updateactionhere(newaction);
        updateactions(newaction);
    }

    let selectedvaluess = [];
    if ((actionhere?.type ?? "") !== "") {
        selectedvaluess = actionhere.values.map((obj) => {
            if (obj === "1") {
                return {
                    name: "Option 1️⃣",
                    id: 1
                };
            } else {
                return {
                    name: "Option 2️⃣",
                    id: 2
                };
            }
        });
    }
    return (
        <>
            <Typeofcondition action={actionhere} updateaction={updateActionType} rule_type={rule_type}/>
            &ensp;
            {(actionhere?.type ?? "") !== "" ? (
                <Multiselect
                    options={[
                        {name: "Option 1️⃣", id: 1},
                        {name: "Option 2️⃣", id: 2}
                    ]} // Options to display in the dropdown
                    selectedValues={selectedvaluess} // Preselected value to persist in dropdown
                    onSelect={updateActionValue} // Function will trigger on select event
                    displayValue="name" // Property name to display in the dropdown options
                />
            ) : (
                ""
            )}
            &ensp;
            <br/>
            <br/>
        </>
    );
}


const Create = ({nowrule, rule_type}) => {

    const [rule, updaterule] = useState(nowrule);


    const [expressions, updateexpression] = useState(rule.condition.expression);
    const [actions, updateactions] = useState(rule.action.values);
    const [expressiontype, updateexpressiontype] = useState("AND");


    function updateRule(Rule) {
        updaterule(Rule);
    }

    function updateActions(action, index) {
        let actionIndex = actions;
        actionIndex[index] = action;

        updateactions(actionIndex);
        updateRule((preRule) => {
            return {
                condition: {
                    expressiontype: preRule.condition.expressiontype,
                    expression: preRule.condition.expression
                },
                action: {
                    values: actions
                },
                context: {
                    ruleType: preRule.context.ruleType
                }
            };
        });
    }

    function updateoneexpression(expression, index) {
        let expressionIndex = expressions;
        expressionIndex[index] = expression;

        updateexpression(expressionIndex);
        updateRule((preRule) => {
            return {
                condition: {
                    expressiontype: expressiontype,
                    expression: expressionIndex
                },
                action: {
                    values: preRule.action.values
                },
                context: {
                    ruleType: preRule.context.ruleType
                }
            };
        });
    }

    function updateExpressionType(type) {
        updateexpressiontype(type);
        updateRule((preRule) => {
            return {
                condition: {
                    expressiontype: type,
                    expression: preRule.condition.expression
                },
                action: {
                    values: preRule.action.values
                },
                context: {
                    ruleType: preRule.context.ruleType
                }
            };
        });
    }

    function onAddExpression() {
        const newex = {id: Math.random()};
        let list = expressions;
        list.push(newex);

        updateexpression(list);
        updateRule((preRule) => {
            return {
                condition: {
                    expressiontype: preRule.condition.expressiontype,
                    expression: expressions
                },
                action: {
                    values: preRule.action.values
                },
                context: {
                    ruleType: preRule.context.ruleType
                }
            };
        });
    }

    function onAddAction() {
        const newex = {id: Math.random()};
        let list = actions;
        list.push(newex);

        updateActions(list);
        updateRule((preRule) => {
            return {
                condition: {
                    expressiontype: preRule.condition.expressiontype,
                    expression: preRule.condition.expression
                },
                action: {
                    values: list
                },
                context: {
                    ruleType: preRule.context.ruleType
                }
            };
        });
    }

    function printOnSave() {
        const objectt = {
            input: {
                condition: {
                    expressionType: rule.condition.expressionType ?? "AND",
                    expressions: rule.condition.expression.map((obj) => {
                        return {
                            objectId: obj.objectId,
                            operatorType: obj.operatorType,
                            dimensionName: obj.dimensionName,
                            dimensionValue: obj.dimensionValue,
                            dimensionType: obj.dimensionType
                        };
                    })
                },
                target: {
                    reverseActionEnabled: false,
                    actions: {
                        ACTION_RETRIES: "2",
                        type: "ADD_TO_MODULE",
                        addedType: "manual",
                        values: rule.action.values.map((obj) => {
                            return {
                                type: obj.type,
                                values: obj.values
                            };
                        })
                    },
                    status: "INACTIVE",
                    description:
                        "made by anubhav just for learning , not activating it XD"
                },
                context: {
                    ruleType: rule.context.ruleType
                },
                syncExistingUsers: false
            }
        };
        console.log(objectt);
        console.log(JSON.stringify(objectt));
    }


    return (
        // select attribute
        <div>


            <p>
                .................Condition........................................................................
            </p>
            {expressions.map((expression, index) => (
                <MySelectCondition
                    expression={expression}
                    expressiontype={expressiontype}
                    updateexpression={(expression) => {
                        updateoneexpression(expression, index);
                    }}
                    updateexpressiontype={updateExpressionType}
                    rule_type={rule_type}
                />
            ))}
            &ensp;
            <button onClick={onAddExpression}>add condition</button>
            <p>

                <br/><br/><br/>
                ..................Action.............................................................................
            </p>
            {actions.map((action, index) => (
                <MySelectAction
                    rule_type={rule_type}
                    action={action}
                    updateactions={(action) => {
                        updateActions(action, index);
                    }}
                />
            ))}
            &ensp;
            <button onClick={onAddAction}>add action</button>
            <p>
                <br/><br/><br/>
                ..................save.............................................................................................
            </p>
            <button onClick={printOnSave}>Save</button>


        </div>
    );
};


export default Create;

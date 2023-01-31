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

    function changeParent(val) {

        const newexpression = {
            id: expression.id,
            objectId: undefined,
            operatorType: undefined,
            dimensionName: undefined,
            dimensionValue: undefined,
            dimensionType: undefined,
            expressionParent: val.target.value
        };
        updateexpression(newexpression);
    }

    function change(val) {
        const type =
            config[rule_type].objects[expression.expressionParent][val.target.value]
                .attributeType;

        const newexpression = {
            id: expression.id,
            objectId: undefined,
            operatorType: undefined,
            dimensionName: val.target.value,
            dimensionValue: undefined,
            dimensionType: type,
            expressionParent: expression.expressionParent
        };
        updateexpression(newexpression);
    }

    function changeoperator(val) {
        const newexpression = {
            id: expression.id,
            objectId: expression.objectId,
            operatorType: val.target.value,
            dimensionName: expression.dimensionName,
            dimensionValue: expression.dimensionValue,
            dimensionType: expression.dimensionType,
            expressionParent: expression.expressionParent
        };
        updateexpression(newexpression);
    }

    function changeValue(val) {
        const valuenew = {
            id: expression.id,
            objectId: expression.objectId,
            operatorType: expression.operatorType,
            dimensionName: expression.dimensionName,
            dimensionValue: val,
            dimensionType: expression.dimensionType,
            expressionParent: expression.expressionParent
        };
        updateexpression(valuenew);
    }

    function changeObjectid(val) {
        const valuenew = {
            id: expression.id,
            objectId: val.target.value,
            operatorType: expression.operatorType,
            dimensionName: expression.dimensionName,
            dimensionValue: expression.dimensionValue,
            dimensionType: expression.dimensionType,
            expressionParent: expression.expressionParent
        };
        updateexpression(valuenew);
    }

    return (
        <div>

            {expression?.expressionParent ?? ""}&ensp;
            <select id="lang" onChange={changeParent} value={expression?.expressionParent ?? ""}>
                <option hidden>Select your option</option>
                <ListConfig list_attribute={Object.keys(config[rule_type].objects)}/>
            </select>
            &ensp;
            {!!expression.expressionParent ? (
                <>
                    {expression?.dimensionName ?? ""}&ensp;
                    <select id="lang" onChange={change} value={expression?.dimensionName ?? ""}>
                        <option hidden>Select your option</option>
                        <ListConfig
                            list_attribute={Object.keys(config[rule_type].objects[expression.expressionParent])}/>
                    </select>
                    &ensp;</>) : ''}
            {(expression?.dimensionName ?? "") !== "" ? (
                <>
                    {expression?.objectId ?? ""}
                    <select
                        id="lang"
                        onChange={changeObjectid}
                        value={expression?.objectId ?? ""}
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
            {(expression?.dimensionName ?? "") !== "" ? (
                <>
                    is &ensp;
                    {expression.operatorType}
                    <select
                        id="opera"
                        onChange={changeoperator}
                        value={expression.operatorType}
                    >
                        <option hidden>Select your option</option>
                        <Operator expressionParent={expression.expressionParent}
                                  selectedValue={expression.dimensionName}
                                  rule_type={rule_type}/>
                    </select>
                </>
            ) : (
                ""
            )}
            &ensp;
            {(expression?.operatorType ?? "") !== "" ? (
                <AttributeValue
                    selectedValue={expression?.dimensionName}
                    changeValue={changeValue}
                    expressionParent={expression.expressionParent}
                    alreadyvalue={expression?.dimensionValue ?? ""}
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


    function updateActionType(newactiontype) {
        const newtype = {
            id: "34",
            type: newactiontype,
            values: []
        };

        updateactions(newtype);
    }

    function updateActionValue(acti) {
        const actionvalues = acti.map((obj) => obj.id);

        const newaction = {
            id: action.id,
            type: action.type,
            values: actionvalues
        };

        updateactions(newaction);
    }

    let selectedvaluess = [];
    if ((action?.type ?? "") !== "") {
        selectedvaluess = action.values.map((obj) => {
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
            <Typeofcondition action={action} updateaction={updateActionType} rule_type={rule_type}/>
            &ensp;
            {(action?.type ?? "") !== "" ? (
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


const Create = ({rule, updaterule, rule_type}) => {


    const expressiontype = rule.condition.expressiontype;


    function updateRule(Rule) {
        updaterule(Rule);
    }

    function updateActions(action, index) {
        let actionIndex = rule.action.values;
        actionIndex[index] = action;

        updateRule((preRule) => {
            return {
                condition: {
                    expressiontype: preRule.condition.expressiontype,
                    expression: preRule.condition.expression
                },
                action: {
                    values: actionIndex
                },
                context: {
                    ruleType: preRule.context.ruleType
                }
            };
        });
    }

    function updateoneexpression(expression, index) {
        let expressionIndex = rule.condition.expression;
        expressionIndex[index] = expression;

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
        let list = rule.condition.expression;
        list.push(newex);

        updateRule((preRule) => {
            return {
                condition: {
                    expressiontype: preRule.condition.expressiontype,
                    expression: list
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
        let list = rule.action.values;
        list.push(newex);

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
            {rule.condition.expression.map((expression, index) => (
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
            {rule.action.values.map((action, index) => (
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

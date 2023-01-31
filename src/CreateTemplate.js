import { useState } from "react";
import './style'
import config from "./config.json";
import Multiselect from "multiselect-react-dropdown";
import TableItemList from "./TableItemList";
import ModuleLabel from "./ModuleLabel";
import {StyledWrapperDiv} from "./style";
import EllipsisTooltip from "@mindtickle/ellipsis-tooltip";
import Divider from '@mindtickle/divider'

function ListConfig() {
  const expressions = config.opportunity_rules.objects.opportunity;
  const list_attribute = Object.keys(expressions);
  const element = list_attribute.map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));

  return element;
}

function Operator({ selectedValue }) {
  const exconfig = config.opportunity_rules.objects.opportunity[selectedValue];

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

function AttributeValue({ selectedValue, changeValue, alreadyvalue }) {
  const exconfig = config.opportunity_rules.objects.opportunity[selectedValue];
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
  updateexpressiontype
}) {
  const [value, updateValue] = useState(expression);

  function change(val) {
    const type =
      config.opportunity_rules.objects.opportunity[val.target.value]
        .attributeType;

    const newexpression = {
      id: value.id,
      objectId: undefined,
      operatorType: undefined,
      dimensionName: val.target.value,
      dimensionValue: undefined,
      dimensionType: type
    };
    updateValue(newexpression);
    updateexpression(value);
  }

  function changeoperator(val) {
    const newexpression = {
      id: value.id,
      objectId: value.objectId,
      operatorType: val.target.value,
      dimensionName: value.dimensionName,
      dimensionValue: value.dimensionValue,
      dimensionType: value.dimensionType
    };
    updateValue(newexpression);
    updateexpression(value);
  }

  function changeValue(val) {
    const valuenew = {
      id: value.id,
      objectId: value.objectId,
      operatorType: value.operatorType,
      dimensionName: value.dimensionName,
      dimensionValue: val,
      dimensionType: value.dimensionType
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
      dimensionType: value.dimensionType
    };
    updateValue(valuenew);
    updateexpression(valuenew);
  }

  return (
    <div>
      {value?.dimensionName ?? ""}&ensp;
      <select id="lang" onChange={change} value={value?.dimensionName ?? ""}>
        <ListConfig />
      </select>
      &ensp;
      {(value?.dimensionName ?? "") !== "" ? (
        <>
          {value?.objectId ?? ""}
          <select
            id="lang"
            onChange={changeObjectid}
            value={value?.objectId ?? ""}
          >
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
            <Operator selectedValue={value.dimensionName} />
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
          alreadyvalue={value?.dimensionValue ?? ""}
        />
      ) : (
        ""
      )}
      <br />
      <br />
    </div>
  );
}

function Typeofcondition({ action, updateaction }) {
  const actions = config.opportunity_rules.actions;
  return (
    <>
      {action?.type ?? ""}
      &ensp;
      <select
        id="opera"
        onChange={(v) => updateaction(v.target.value)}
        value={action.type}
      >
        {actions.map((valu) => (
          <option key={valu.actionOn} value={valu.actionOn}>
            {valu.actionOn}
          </option>
        ))}
      </select>
    </>
  );
}
function MySelectAction({ action, updateactions }) {
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
      <Typeofcondition action={actionhere} updateaction={updateActionType} />
      &ensp;
      {(actionhere?.type ?? "") !== "" ? (
        <Multiselect
          options={[
            { name: "Option 1️⃣", id: 1 },
            { name: "Option 2️⃣", id: 2 }
          ]} // Options to display in the dropdown
          selectedValues={selectedvaluess} // Preselected value to persist in dropdown
          onSelect={updateActionValue} // Function will trigger on select event
          displayValue="name" // Property name to display in the dropdown options
        />
      ) : (
        ""
      )}
      &ensp;
      <br />
      <br />
    </>
  );
}
const Create = ({ rule, updateRule }) => {
  const [expressions, updateexpression] = useState(rule.condition.expression);
  const [actions, updateactions] = useState(rule.action.values);
  const [expressiontype, updateexpressiontype] = useState("AND");

  function updateActions(action, index) {
    let actionIndex = actions;
    actionIndex[index] = action;

    updateexpression(actionIndex);
    updateRule((preRule) => {
      return {
        condition: {
          expressiontype: preRule.condition.expressiontype,
          expression: preRule.condition.expression
        },
        action: {
          values: actions
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
        }
      };
    });
  }
  function onAddExpression() {
    const newex = { id: Math.random() };
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
        }
      };
    });
  }

  function onAddAction() {
    const newex = { id: Math.random() };
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
        />
      ))}
      &ensp;
      <button onClick={onAddExpression}>add condition</button>
      <p>
        ..................Action.............................................................................
      </p>
      {actions.map((action, index) => (
        <MySelectAction
          action={action}
          updateactions={(action) => {
            updateActions(action, index);
          }}
        />
      ))}
      &ensp;
      <button onClick={onAddAction}>add action</button>
      <p>
        ..................save.............................................................................................
      </p>
      <button onClick={printOnSave}>Save</button>


    </div>
  );
};


export default Create;

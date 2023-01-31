import "./styles.css";
import { useState } from "react";
import Create from "./CreateTemplate";
import response from "./response.json";
import TableItemList from "./TableItemList";
import Divider from "@mindtickle/divider";
import {StyledWrapperDiv} from "./style";
import EllipsisTooltip from "@mindtickle/ellipsis-tooltip";
import ModuleLabel from "./ModuleLabel";

function getrule(curRule) {
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
            dimensionType: obj.dimensionType
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
      }
    };
  } else {
    return {
      condition: {
        expressionType: "AND",
        expression: [{ id: "2" }]
      },
      action: {
        values: [{ id: "34" }]
      }
    };
  }
}

export default function App() {
  let fetchRule = "null";
  const nowrule = getrule(fetchRule);
  const [rule, updaterule] = useState(nowrule);

  function updateRule(Rule) {
    updaterule(Rule);
  }
  const listOfComponentsToDisplay =

      getrule("fetchRule").condition.expression.map(({ objectId, operatorType, dimensionName, dimensionValue, dimensionType}, index ) => {

        return(
            < ModuleLabel
                index = {index}
                operatorType = {operatorType}
                dimensionName = {dimensionName}
                dimensionValue = {dimensionValue}
                dimensionType = {dimensionType}
                objectId = {objectId}
            />)
      })




  const renderConditionContent = (item, i) => {
    return(
        <>
          {i>0 && <Divider plain>{"AND"}</Divider>}
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


  return (
    <div className="App">
      <Create rule={rule} updateRule={updateRule} />

      <br /><br /><br />
      ...........................Table condition show......................................................
      <br /><br />
      <TableItemList contents={listOfComponentsToDisplay} moreItemConfig={moreItemConfig} />
    </div>
  );
}

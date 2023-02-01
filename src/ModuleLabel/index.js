import styled from 'styled-components';
import ModuleIcon from '@mindtickle/module-icon';
import config from "../config.json";
import theme from '@mindtickle/styles/lib/theme';
import mixins from '@mindtickle/styles/lib/mixins.js';
import EllipsisTooltip from '@mindtickle/ellipsis-tooltip';

export const getpopoverRelativeToBody = () => document.body;


const StyledModuleLabel = styled.div`
  ${mixins.truncate()};
  line-height: 32px;
  border-bottom: 1px dashed transparent;
  display: flex;
  align-items: center;

  .moduleName {
    ${mixins.truncate()};
    display: inline-block;
    border-bottom: 1px dashed transparent;
    max-width: 160px;
    margin: 0 4px;

    &:hover {
      border-bottom: 1px dashed ${theme.colors.SHARK};
    }

    .midText {
      vertical-align: middle;
      padding-left: 6px;
    }
  }

  .moduleIcon {
    margin: 0 12px 0 0;
    border-radius: 2px;
    height: 17px;
    width: 17px;
    font-size: 12px;
    line-height: 18px;
    flex: 0 0 17px;
  }

  .multipresentIcon {
    font-size: 12px;
    color: ${theme.colors.ICON};
    margin-left: 8px;
    line-height: 20px;
  }
`;

const ModuleLabelLayout = ({

                               objectId, operatorType, dimensionName, dimensionValue, dimensionType
                               , objectType
                           }) => {
    const exconfig = config.opportunity_rules.objects.opportunity[dimensionName];

    if (!!exconfig == false) {
        return (<p>No conditions</p>)
    }
    const validatortype = exconfig.validator.value.Type;

    let postText = '';
    if (validatortype == 'Enum') {
        postText = dimensionValue
    } else {
        postText = operatorType + " than " + dimensionValue
    }
    return (
        <StyledModuleLabel className="moduleLabel">
            <ModuleIcon moduleType={'ILT'} className="moduleIcon"/>
            <span>{dimensionName}</span>
            &nbsp;
            <span>of</span>
            &nbsp;
            <span>{objectType}</span>
            &nbsp;
            <span><b>{objectId}</b></span>
            &nbsp;
            <span> is</span>
            &nbsp;

            <EllipsisTooltip title={`${postText}`} getPopupContainer={getpopoverRelativeToBody}>
                {`${postText}`}
            </EllipsisTooltip>
        </StyledModuleLabel>
    );
};

export default ModuleLabelLayout;


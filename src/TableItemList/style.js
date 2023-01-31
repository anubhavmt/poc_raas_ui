import styled from 'styled-components';
import theme from '@mindtickle/styles/lib/theme.js';
import Popover from '@mindtickle/popover';

export const StyledListBlock = styled.div`
  .moreEntitiesWrapper {
    margin: 0 0 0 28px;
    border-bottom: 1px dashed transparent;
    float: left;
    line-height: 32px;

    .moreEntities {
      border-bottom: 1px dashed ${theme.colors.SHARK};
    }
  }
`;

export const StyledListPopover = styled(Popover)`
  .auto-popover-content {
    border: 1px solid ${theme.colors.ALTO};
    border-radius: 4px;
    background-color: Black;
    box-shadow: ${theme.boxShadow.LEVEL1};
    padding: 18px 0;
  }

  .auto-popover-title {
    padding: 0 16px;
  }

  .auto-popover-inner-content {
    display: none;
  }

  .auto-popover-inner {
    max-height: 136px;
    overflow: auto;
    border: 0;
    border-radius: 0;
    background-color: ${theme.colors.BLACK};
    box-shadow: none;
    padding: 0;

    .linkSeriesBlock .linkSeriesText {
      color: ${theme.colors.BLACK};
    }
  }

  .tableItemList {
    color: ${theme.colors.BLACK};
    font-weight: 400;
  }

  .auto-divider-plain.auto-divider-with-text {
    margin: 0;
    line-height: 16px;
    font-size: 12px;
    font-weight: bold;
  }
`;

import {StyledListBlock, StyledListPopover} from './style';
import EllipsisTooltip from '@mindtickle/ellipsis-tooltip';
import Grid from '@mindtickle/grid';

export const POPOVER_WIDTH = {
    width: '393px',
};

const {Row} = Grid;


const renderContent = (item, i) => (
    <Row key={i}>
        <EllipsisTooltip showTooltipWhenEllipsis={true} title={item} wrapperClassName="tableItemList">
            {item}
        </EllipsisTooltip>
    </Row>
);


function TableItemList(props) {

    const {contents, moreItemConfig: {viewMoreText, renderMoreContent}} = props;


    let contentsToDisplay = contents, contentsOnPopover = [];

    if (contents.length > 1) {
        contentsToDisplay = contents.slice(0, 1);
        contentsOnPopover = contents.slice(0);
    }

    return (

        <StyledListBlock className="listBlockWrapper">
            <div className="contentTitleWrapper">
                <div className="content-title">{contentsToDisplay.map(renderContent)}</div>
                <StyledListPopover
                    overlayStyle={POPOVER_WIDTH}
                    title={contentsOnPopover.map(renderMoreContent)}
                    placement={'bottomRight'}
                >
                    <div className="moreEntitiesWrapper">
              <span className="moreEntities">
                {!!contentsOnPopover.length && viewMoreText}
              </span>
                    </div>
                </StyledListPopover>
            </div>
        </StyledListBlock>

    );

}

export default TableItemList;

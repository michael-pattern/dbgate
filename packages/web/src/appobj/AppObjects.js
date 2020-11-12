// @ts-nocheck

import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { FontIcon } from '../icons';
import { showMenu } from '../modals/DropDownMenu';
import useTheme from '../theme/useTheme';
import { useSetOpenedTabs, useAppObjectParams } from '../utility/globalState';

const AppObjectDiv = styled.div`
  padding: 5px;
  &:hover {
    background-color: ${(props) => props.theme.left_background_blue[1]};
  }
  cursor: pointer;
  white-space: nowrap;
  font-weight: ${(props) => (props.isBold ? 'bold' : 'normal')};
`;

const AppObjectSpan = styled.span`
  white-space: nowrap;
  font-weight: ${(props) => (props.isBold ? 'bold' : 'normal')};
`;

const IconWrap = styled.span`
  margin-right: 5px;
`;

const StatusIconWrap = styled.span`
  margin-left: 5px;
`;

export function AppObjectCore({
  title,
  icon,
  Menu,
  data,
  makeAppObj,
  onClick,
  isBold,
  isBusy,
  component = 'div',
  prefix = null,
  statusIcon,
  statusTitle,
  ...other
}) {
  const appObjectParams = useAppObjectParams();
  const theme = useTheme();

  const handleContextMenu = (event) => {
    if (!Menu) return;

    event.preventDefault();
    showMenu(event.pageX, event.pageY, <Menu data={data} makeAppObj={makeAppObj} {...appObjectParams} />);
  };

  const Component = component == 'div' ? AppObjectDiv : AppObjectSpan;

  let bold = false;
  if (_.isFunction(isBold)) bold = isBold(appObjectParams);
  else bold = !!isBold;

  return (
    <Component
      onContextMenu={handleContextMenu}
      onClick={onClick ? () => onClick(data) : undefined}
      isBold={bold}
      theme={theme}
      {...other}
    >
      {prefix}
      <IconWrap>{isBusy ? <FontIcon icon="icon loading" /> : <FontIcon icon={icon} />}</IconWrap>
      {title}
      {statusIcon && (
        <StatusIconWrap>
          <FontIcon icon={statusIcon} title={statusTitle} />
        </StatusIconWrap>
      )}
    </Component>
  );
}

export function AppObjectControl({ data, makeAppObj, component = 'div' }) {
  const appObjectParams = useAppObjectParams();
  const appobj = makeAppObj(data, appObjectParams);
  return <AppObjectCore {...appobj} data={data} makeAppObj={makeAppObj} component={component} />;
}

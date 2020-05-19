import React from 'react';
import { PageHeader, Tooltip } from 'antd';

export const GetBalanceInfo = (props) => {
  var balance = parseInt(props.balanceInfo);
  const Description = (props) => (
    <React.Fragment>
      <Tooltip title={props.tips || null}>
        <h4 style={{
          cursor: 'pointer'
        }}>{props.title}</h4>

        <span style={{
          overflowWrap: 'break-word',
          color: '#0199ff'
        }}>{props.value || 0}</span>
      </Tooltip>
    </React.Fragment>
  );
  return (
        <Description title="可用余额(ether)" value={ balance/(10**18) } />
  );
};

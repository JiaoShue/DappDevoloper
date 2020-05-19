import { Card, Input, message } from 'antd';
import React, { useState } from 'react';
import { getBalance } from '../apis';
import { GetBalanceInfo } from './GetBalanceInfo';

export const GetBalance = () => {
  const [balanceInfo, setBalanceInfo] = useState('');
  const [userAccount, setUserAccount] = useState('');
  return (
    <Card title={<h3>账户余额查询</h3>} style={{
      marginBottom: 16
    }}>
      <Input.Search
        style={{
          marginBottom: 16
        }}
        placeholder={'请输入账号'}
        enterButton={'查询'}
        value={userAccount}
        onChange={({ target: { value } }) => setUserAccount(value)}
        onSearch={async () => {
          const rst = await (await getBalance(userAccount)).json();
          
          if (rst.status === 'success') {
            message.success('搜索成功!');
            setBalanceInfo(rst.data);
          } else {
            message.error('搜索失败!');
          }
        }}
      />
      {balanceInfo&&<GetBalanceInfo balanceInfo={ balanceInfo }/>}
    </Card>
  );
};

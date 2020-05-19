import { Card, Radio, Row, Input, Select, Tooltip, Button, PageHeader, Tag, Popconfirm, message } from 'antd';
import React, { useState } from 'react';
import { sendTransaction,submitInfo } from '../apis';
import { strToHexCharCode } from '../Utils/HexHelper';
export const Account = (props) => {
  const [sourceAccount, setSourceAccount] = useState('');//useState参数为初始值，state所读为最新值，setState负责更新改变
  const [txPassword, setTxPassword] = useState('');
  const [distAccount, setDistAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState('');
  const [sourAccount, setSourAccount] = useState('');//useState参数为初始值，state所读为最新值，setState负责更新改变
  const [sourPassword, setSourPassword] = useState('');
  const [info, setInfo] = useState('');
  return (
    <Card>
      <Row>
            <PageHeader
              title={<h3>转账</h3>}
              style={{ padding: 0, marginBottom: 20 }}
            >
              <Input
                placeholder={'请输入本人账号'}
                style={{ marginBottom: 10 }}
                onChange={({ target: { value } }) => {
                  setSourceAccount({
                    value
                  });
                }}
              />
              <Input
                type={'password'}
                placeholder={'请输入账户密码'}
                style={{ marginBottom: 10 }}
                onChange={({ target: { value } }) => {
                  setTxPassword({
                    value
                  });
                }}
              />
              <Input
                placeholder={'请输入目的账户'}
                style={{ marginBottom: 10 }}
                onChange={({ target: { value } }) => {
                  setDistAccount({
                    value
                  });
                }}
              />
              <Input
                placeholder={'请输入金额'}
                style={{ marginBottom: 10 }}
                onChange={({ target: { value } }) => {
                  setAmount({
                    value
                  });
                }}
              />
              <Input
                placeholder={'请输入备注'}
                style={{ marginBottom: 10 }}
                onChange={({ target: { value } }) => {
                  setData({
                    value
                  });
                }}
              />
              <Button block type={'primary'} onClick={async () => {
                props.setMsg(
                  [
                    ...props.msgList,
                    '开始转账',
                  ]
                );
                const rst = await (await sendTransaction(sourceAccount.value,txPassword.value,distAccount.value,amount.value,strToHexCharCode(data.value))).json();
                if (rst.status === 'error') {
                  message.error('转账失败');
                  props.setMsg(
                    [
                      ...props.msgList,
                      '[no_ansi]<span style="color: #de0002">转账失败</span>, 请检查账号密码是否正确，余额是否充足',
                      '等待下一步操作...'
                    ]
                  );
                } else {
                  message.success('转账成功');
                  props.setMsg(
                    [...props.msgList,
                      '[no_ansi]<span style="color: #42d48c">转账成功</span>',
                      '交易ID为：',
                      rst.data.transactionHash,
                      '等待下一步操作...']
                  );
                }
              }}>提交</Button>
            </PageHeader>
      </Row>
    </Card>
  );
};

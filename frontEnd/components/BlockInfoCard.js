import React, { useEffect, useState } from 'react';
import { Card, Col, List, PageHeader, Row, Statistic, Tag, Tooltip } from 'antd';
import io from 'socket.io-client';

export const BlockInfoCard = (props) => {
  const socket = io();
  const [BlockInfo, setBlockInfo] = useState({number: 0});
  useEffect(() => {
    socket.on('BlockInfo', function(data) {
      const newBlockInfo = JSON.parse(data.message);
      if (newBlockInfo.number !== BlockInfo.number) {
        setBlockInfo(newBlockInfo);
      } else if (newBlockInfo.number === BlockInfo.number) {
        props.setMining(false);
      }
    });
    return () => {
      socket.disconnect();
    };
  });
  const number = (BlockInfo && BlockInfo.number) || 0;
  const FirstBlock = (BlockInfo.blocks && BlockInfo.blocks.length && BlockInfo.blocks[BlockInfo.blocks.length - 1]) || {};
  const Description = (props) => (
    <React.Fragment>
      <Tooltip title={props.tips || null}>
      <h4 style={{
        marginTop: 10,
        cursor: 'pointer'
      }}>{props.title}</h4>

      <span style={{
        overflowWrap: 'break-word',
        color: '#0199ff'
      }}>{props.value || '暂无数据'}</span>
      </Tooltip>
    </React.Fragment>
  );
  return (
    <Card title={<h3>区块信息概览</h3>}>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="区块高度" value={number} valueStyle={{ color: '#42d48c' }}/>
        </Col>
        <Col span={8}>
          <Statistic title="出块难度" value={FirstBlock.difficulty || 0} valueStyle={{ color: '#0199ff' }}/>
        </Col>
        <Col span={8}>
          <Statistic title="Gas上限" value={FirstBlock.gasLimit || 0} valueStyle={{ color: '#ffad36' }}/>
        </Col>
      </Row>
      <Row>
        <PageHeader title={'最近区块信息'}
                    subTitle={`时间戳: ${FirstBlock.timestamp || '暂无数据'}`}
                    style={{
                      paddingLeft: 0,
                      paddingRight: 0
                    }}>
          <Description title={'最新块哈希'} value={FirstBlock.hash}/>
          <Description title={'父块哈希'} value={FirstBlock.parentHash}/>
          <Description title={'状态Merkle根'}
                       value={FirstBlock.stateRoot}
                       tips={'状态是区块链上的临时数据（e.g用户的余额), 会随着交易的发生而变化, 状态Merkle根是所有区块链内账户地址-账户信息键值对的根哈希, 账户信息中包含每一个用户的智能合约地址的merkle根(storageRoot)'}/>
          <Description title={'收据Merkle根'} value={FirstBlock.receiptsRoot}/>
          <Description title={'交易Merkle根'} value={FirstBlock.transactionsRoot} tips={'交易是区块链上的永久数据, 每一个区块都有自己独立的交易merkle根'}/>
          <Description title={'矿工地址'} value={FirstBlock.miner}/>
          {
            <List
              header={<h4>块上交易哈希</h4>}
              dataSource={FirstBlock.transactions || ['暂无数据']}
              renderItem={(t) => {
                return (
                  <List.Item key={t}>
                    <List.Item.Meta
                      title={t}
                    />
                  </List.Item>
                );
              }}
            />
          }
        </PageHeader>
      </Row>
    </Card>
  );
};

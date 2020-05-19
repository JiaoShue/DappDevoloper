import MyLayout from '../components/MyLayout.js';
import { MicroTerminal } from '../components/MicroTerminal.js';
import {
  checkCluster, checkStats,
   getAccountList,
  getNodeList, getSignerList,
  reopenRedis
} from '../apis';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { uniq, compact, flatten, uniqBy } from 'lodash';
import { Button, Card, Icon, Modal, Upload, Tooltip, Row, Col,Input,Badge, Select, Alert, Layout } from 'antd';
import { UserListCard } from '../components/UserListCard';
import { Account } from '../components/Account';
import { TransactionSearch } from '../components/TransactionSearch';
import { GetBalance } from '../components/GetBalance';
import { BlockSearch } from '../components/BlockSearch';

checkStats().then(r => r).catch(e => e);

const index = (props) => {
  const [NodeList] = useState(props.NodeList);
  const [AccountList] = useState(uniqBy(props.AccountList, 'address'));
  
  const preMsgList = props.status === 'success' ?
    ['[no_ansi]欢迎进入核心功能测试页面']
      .concat(['等待下一步操作...'])
    : props.status === 'warning'
      ? ['[no_ansi]<span style="color:#ffad36">平台停止中或尚未启动完成</span>']
        .concat(['等待下一步操作...'])
      : ['等待下一步操作...'];
  const [msgList, setMsg] = React.useState(preMsgList);
  const [status, setStatus] = useState(props.status);
  let nowMsgList = msgList.slice(0);
  useEffect(() => {
    const socket = io();
    /**
     * websocket的监听事件
     * 监听newMsg
     */
    socket.on('newMsg', function(newMsg) {
      const msgSegments = compact(newMsg.data.split('\n'));
      let newMsgList = msgList.slice(0).map(msg => {
        for (const newmsg of msgSegments) {
          if (
            (newmsg.indexOf(msg.trim()) > -1 ||
              msg.indexOf(newmsg.trim()) > -1) &&
            msg !== ''
          ) {
            return newmsg;
          }
        }
        return msg;
      });
      newMsgList = uniq([...newMsgList, ...msgSegments]);
      setMsg(newMsgList);
      nowMsgList = newMsgList.slice(0);
    });


    /**
     * 当平台内部master节点启动后, 会主动向redis发布事件
     * 宿主机server订阅事件, 接受到信息后判断master节点load完成
     */
    socket.on('onLoad', async () => {
      setMsg([...nowMsgList, `[no_ansi]欢迎进入核心功能测试页面！`, '等待下一步操作...']);
      setStatus('success');
    });


    /**
     * 当一段子进程信息完成输出后, websocket发出终止信号
     * 客户端打印出相应提示
     */
    socket.on('close', function(data) {
      if (data && data.status === 'success') {
        setMsg([...nowMsgList, '平台启动成功! 如果是第一次启动, 需要等待大约2分钟直至启动完成。', '等待下一步操作...']);
        setStatus('success');
      } else if (data && data.status === 'error') {
        setMsg([...nowMsgList, '平台启动失败!', '等待下一步操作...']);
        setStatus('default');
      } else {
        setMsg([...nowMsgList, '平台恢复启动成功!']);
        setStatus('success');
      }
    });

    return () => {
      socket.disconnect();
    };
  });


  return (
    <React.Fragment>
      <Layout>
        <MyLayout>
          <Row gutter={16}>
            <Col span={15}>
              <Card
                style={{
                    padding: 5
                }}
                title={
                  (<Badge status={status}>
                    <h3>
                      核心功能测试
                    </h3>
                  </Badge>)
                }
                
              >
                <MicroTerminal msgList={msgList}/>
              </Card>
              <Row gutter={16}>
                <Col span={14}>
                  <UserListCard AccountList={AccountList}/>
                </Col>
                <Col span={10}>
                  <Account
                    NodeList={NodeList}
                    setMsg={setMsg}
                    msgList={msgList}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={9}>
              <TransactionSearch/>
              <GetBalance/>
              <BlockSearch/>
            </Col>
          </Row>
          <style jsx>
            {`
            a {
              font-family: 'Roboto';
            }

            ul {
              padding: 0;
            }

            li {
              list-style: none;
              margin: 5px 0;
            }

            a {
              text-decoration: none;
              color: blue;
            }

            a:hover {
              opacity: 0.6;
            }

          `}
          </style>
          <style jsx global>
            {`
            body {
              background-color: '#D9D9D9' !important;
            }

            h3 {
              color: #213146;
              margin-bottom: 0px;
            }
          `}
          </style>
        </MyLayout>
      </Layout>
    </React.Fragment>
  );
};

index.getInitialProps = async () => {
  try {
    const NodeList = await (await getNodeList()).json();
    const Accounts = await (await getAccountList()).json();
    const SignerList = await (await getSignerList()).json();
    let AccountList = [];
    for (const account of flatten(Accounts)) {
      let status;
      if (SignerList.includes(account)) {
        status = 'signer';
      } else {
        status = 'user';
      }
      AccountList.push({
        address: account,
        status
      });
    }
    if (NodeList && NodeList.length > 0) {
      console.log('开始唤起redis');
      reopenRedis().then(_ => {
        console.log('唤起完毕, 结果');
      }).catch(e => e);
    }
    return {
      status: 'success',
      NodeList: NodeList,
      AccountList: uniqBy(AccountList, 'address'),
      SignerList: SignerList
    };
  } catch (err) {
    console.log(err);
    const hasCreated = (await (await checkCluster()).json()).status;
    return {
      status: hasCreated === 'success' ? 'warning' : 'default',
      NodeList: [],
      AccountList: [],
      SignerList: []
    };
  }
};

export default index;
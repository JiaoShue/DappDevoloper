pragma solidity >=0.4.0 <0.7.0;
contract MessageHelper{
    //用户，区块链地址=>{用户名，角色，联系人列表[]} 
    struct UserData{
        string userName;
        bool admin;//true为管理员，false为普通用户
        address[] contacts;
    }
    //消息，{发送者，消息内容，接受者，时间} 
    struct MessageData{
        bytes32 mesID;
        address sender;
        string content;
        address receiver;
        uint timeStamp;
    }
    //公告，{发送者，消息内容，时间} 
    struct NoticeData{
        bytes32 noticeID;
        address sender;
        string content;
        uint timeStamp;
    }
    mapping (address=>UserData) user;
    mapping (bytes32=>MessageData) message;
    mapping (bytes32=>NoticeData) notice;
    uint mesCount=0;
    uint notiCount=0;
    
    //*系统账户初始化
    // 账户名需要在数据库备份，否则丢失后无法找回
    event loginitUser(bool);
    function initUser(address account,string memory userName,bool admin)public{
        user[account].userName=userName;
        user[account].admin=admin;
        emit loginitUser(true);
    }
    
    // *获取用户信息
    function getUserInfo(address account)public view returns(string memory,bool){
        return (user[account].userName,user[account].admin);
    }
   
    event logsendMessage(bytes32,address,string,address,uint);
    //* 需要web系统首先显示发送状态为正在发送，发送成功时显示发送成功及消息序号，失败时显示失败原因
    function sendMessage(address sender,string memory content,address receiver)public{
        bytes32 mesID=keccak256(toBytes(mesCount));
        message[mesID]=MessageData({
            mesID:mesID,
            sender:sender,
            content:content,
            receiver:receiver,
            timeStamp:now
        });
        mesCount=mesCount+1;
        emit logsendMessage(mesID,sender,content,receiver,now);
    }
    //获取消息数量
    function getMessageCount()public view returns(uint){
        return mesCount;
    }
    
    //*获取消息(历史消息需要数据库存储)，每次从上一次最后一条消息的索引开始直至达到消息数组的length值
    function getMessage(bytes32 mesID)public view returns(bytes32,address,string memory,address,uint){
        return (message[mesID].mesID,message[mesID].sender,message[mesID].content,message[mesID].receiver,message[mesID].timeStamp);
    }
    
    //*发布公告
    event logaddNotice(bytes32,address,string,uint);
    function addNotice(address sender,string memory content)public{
        if(user[sender].admin==true){
            bytes32 noticeID=keccak256(toBytes(notiCount));
            notice[noticeID]=NoticeData({
                noticeID:noticeID,
                sender:sender,
                content:content,
                timeStamp:now
            });
            notiCount=notiCount+1;
            emit logaddNotice(noticeID,sender,content,now);
        }else{
            emit logaddNotice(bytes32(""),sender,"非管理员不可发布公告",now);
        }
    }
    //获取公告数量
    function getNoticeCount()public view returns(uint){
        return notiCount;
    }
    
    //*获取公告(历史消息需要数据库存储)，每次从上一次最后一条消息的索引开始直至达到消息数组的length值
    function getNotice(bytes32 noticeID)public view returns(bytes32,address,string memory,uint){
        return (notice[noticeID].noticeID,notice[noticeID].sender,notice[noticeID].content,notice[noticeID].timeStamp);
    }
    
    //*添加联系人
    event logaddContact(bool);
    function addContact(address account,address contact)public{
        user[account].contacts.push(contact);
        emit logaddContact(true);
    }
    //获取联系人数量
    function getContactsCount(address account)public view returns(uint){
        return user[account].contacts.length;
    }
    //返回当前用户联系人列表
    function getContacts(address account)public view returns(address[] memory){
        return user[account].contacts;
    }
    function toBytes(uint256 x) public pure returns (bytes memory b) {
        b = new bytes(32);
        assembly { mstore(add(b, 32), x) }
    }
}
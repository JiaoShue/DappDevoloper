pragma solidity >=0.4.0 <0.7.0;
contract Ballot{
    //投票人结构体
    struct Voter {
        string empNo;//工号
        string name;//姓名
        string password;//密码
        string ballotID;//投票场次ID
        string organization;//所属组织
        uint weight;//投票权重
    }
    //候选人结构体
    struct Candidate{
        string empNo;//工号
        string name;//姓名
        string password;//密码
        string ballotID;//投票场次ID
        string organization;//所属组织
        string describe;//自我描述
        bool canBeVote;//是否有被投票权
        uint supportCount;//候选人得票数
    }
    struct Config{
        address starter;//投票发起者区块链账号
        string empNo;//投票发起者工号
        string name;//投票发起者姓名
        string password;//密码
        string title;//投票主题
        uint victorCount;//最终当选者数量
        string organization;//所属组织
        uint createTime;//场次确立时间
        uint startTime;//开始时间
        uint endTime;//结束时间
        address[] candidates;//本场投票候选人
        address[] victors;//本场投票获胜者
    }
    string BallotID;//投票场次ID
    mapping(address=>Voter) voter;//用区块链账号标识投票人
    mapping(address=>Candidate) candidate;//用区块链账号标识候选人
    mapping(string=>Config) config;//用投票场次ID标示每场投票
    
    
    string[] ballots;
    //初始化投票
    event loginit(string);
    function init(string memory ballotID,address starter,string memory empNo,string memory organization,
    string memory name,string memory password,string memory title,uint victorCount) public{
        config[ballotID].starter = starter;
        config[ballotID].empNo = empNo;
        config[ballotID].name = name;
        config[ballotID].password = password;
        config[ballotID].title = title;
        config[ballotID].victorCount = victorCount;
        config[ballotID].organization = organization;
        config[ballotID].createTime = now;
        config[ballotID].startTime = 0;
        config[ballotID].endTime = 0;
        BallotID = ballotID;
        ballots.push(ballotID);
        emit loginit("初始化投票成功!");
    }
    //投票人申请加入
    event logvoterApply(string);
    function voterApply(address userID,string memory empNo,string memory name,
    string memory ballotID,string memory password,string memory organization) public{
        if(keccak256(bytes(ballotID))!=keccak256(bytes(BallotID))){
            emit logvoterApply("申请失败,投票场次错误!");
        }
        voter[userID].empNo = empNo;
        voter[userID].name = name;
        voter[userID].password = password;
        voter[userID].ballotID = ballotID;
        voter[userID].organization = organization;
        voter[userID].weight = 0;
        emit logvoterApply("申请成功!");
    }
    //候选人申请加入
    event logcandidateApply(string);
    function candidateApply(address userID,string memory empNo,string memory name,string memory password,
    string memory ballotID,string memory organization,string memory describe) public{
        if(keccak256(bytes(ballotID))!=keccak256(bytes(BallotID))){
            emit logcandidateApply("申请失败,投票场次错误!");
        }
        candidate[userID].empNo = empNo;
        candidate[userID].name = name;
        candidate[userID].password = password;
        candidate[userID].ballotID = ballotID;
        candidate[userID].organization = organization;
        candidate[userID].describe = describe;
        candidate[userID].canBeVote = false;
        config[ballotID].candidates.push(userID);
        emit logcandidateApply("申请成功!");
    }
    //审核投票人
    event logcheckVoter(string);
    function checkVoter(uint weight,address[] memory voters) public{
        for(uint i = 0;i < voters.length;i++){
            voter[voters[i]].weight = weight;
        }
        emit logcheckVoter("审核完成！");
    }
    //审核候选人
    event logcheckCandidate(string);
    function checkCandidate(address[] memory candids) public{
        for(uint i = 0;i<candids.length;i++){
            candidate[candids[i]].canBeVote = true;
        }
        emit logcheckCandidate("审核完成！");
    }
    //开始投票
    event logstartVote(string);
    function startVote(string memory ballotID,uint interval) public{
        config[ballotID].startTime = now;
        config[ballotID].endTime = config[ballotID].startTime + interval * 60;
        emit logstartVote("投票已开始!");
    }
    //投票
    event logvote(string);
    function vote(address voterID,address candidateID,string memory ballotID)public{
        if(config[ballotID].startTime == 0){
            emit logvote("投票未开始!");
            return;
        }
        if(now > config[ballotID].endTime){
            emit logvote("投票已结束!");
            return;
        }
        if(voter[voterID].weight<=0){
            emit logvote("投票人身份非法!");
            return;
        }
        if(candidate[candidateID].canBeVote==false){
            emit logvote("候选人身份非法!");
            return;
        }
        voter[voterID].weight--;
        candidate[candidateID].supportCount++;
        emit logvote("投票成功!");
    }
    //求出获胜的候选人
    event logcalcRes(string);
    function calcRes(string memory ballotID)public{
        address temp;
        if(now < config[ballotID].endTime){
            emit logcalcRes("请投票结束后再验票!");
            return;
        }
        for (uint i = 0; i < config[ballotID].candidates.length; i++) {
            for (uint j = i+1; j < config[ballotID].candidates.length; j++) {
                if(candidate[config[ballotID].candidates[j]].supportCount>candidate[config[ballotID].candidates[i]].supportCount){
                    temp = config[ballotID].candidates[j];
                    config[ballotID].candidates[j] = config[ballotID].candidates[i];
                    config[ballotID].candidates[i] = temp;
                }
            }
        }
        for (uint i = 0; i < config[BallotID].victorCount; i++) {
            config[ballotID].victors.push(config[ballotID].candidates[i]);
        }
        emit logcalcRes("智能合约验票完成!");
    }
    //读取某场投票获胜的候选人
    function getVictors(string memory ballotID)public view returns(address[] memory) {
        return config[ballotID].victors;
    }
    //查看投票人信息
    function getVoterInfo(address userID) public view returns(string memory empNo,string memory name,string memory ballotID,
    string memory organization,uint weight){
        empNo = voter[userID].empNo;
        name = voter[userID].name;
        ballotID = voter[userID].ballotID;
        organization = voter[userID].organization;
        weight = voter[userID].weight;
    }
    //查看候选人信息
    function getCandidateInfo(address userID) public view returns(string memory empNo,string memory name,string memory ballotID,
    string memory organization,string memory describe,bool canBeVote,uint supportCount){
        empNo = candidate[userID].empNo;
        name = candidate[userID].name;
        ballotID = candidate[userID].ballotID;
        organization = candidate[userID].organization;
        describe = candidate[userID].describe;
        canBeVote = candidate[userID].canBeVote;
        supportCount = candidate[userID].supportCount;
    }
    //查看投票场次
    function getBallotID() public view returns(string memory){
        return BallotID;
    }
    //查看指定场次投票信息
    function getBallotInfo(string memory ballotID) public view returns(address starter,string memory empNo,string memory name,
    string memory title,uint victorCount,string memory organization,uint createTime,uint startTime,uint endTime){
        starter = config[ballotID].starter;
        empNo = config[ballotID].empNo;
        name = config[ballotID].name;
        title = config[ballotID].title;
        victorCount = config[ballotID].victorCount;
        organization = config[ballotID].organization;
        createTime = config[ballotID].createTime;
        startTime = config[ballotID].startTime;
        endTime = config[ballotID].endTime;
    }
}


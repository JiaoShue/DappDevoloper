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
    }
    string BallotID;//投票场次ID
    mapping(address=>Voter) voter;//用区块链账号标识投票人
    mapping(address=>Candidate) candidate;//用区块链账号标识候选人
    mapping(string=>Config) config;//用投票场次ID标示每场投票
    address[] candidates;
    address[] victors;
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
        candidates.push(userID);
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
    //投票
    event logvote(string);
    function vote(address voterID,address candidateID)public{
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
    function calcRes()public{
        address temp;
        for (uint i = 0; i < candidates.length; i++) {
            for (uint j = i+1; j < candidates.length; j++) {
                if(candidate[candidates[j]].supportCount>candidate[candidates[i]].supportCount){
                    temp = candidates[j];
                    candidates[j] = candidates[i];
                    candidates[i] = temp;
                }
            }
        }
        for (uint i = 0; i < config[BallotID].victorCount; i++) {
            victors.push(candidates[i]);
        }
    }
    //读取获胜的候选人
    function getVictors()public view returns(address[] memory) {
        return victors;
    }
    //查看投票人姓名
    function getVoterName(address userID) public view returns(string memory){
        return voter[userID].name;
    }
    //查看投票人工号
    function getVoterEmpNo(address userID) public view returns(string memory){
        return voter[userID].empNo;
    }
    //查看投票人所属场次
    function getVoterBallotID(address userID) public view returns(string memory){
        return voter[userID].ballotID;
    }
    //查看投票人所属组织
    function getVoterOrg(address userID) public view returns(string memory){
        return voter[userID].organization;
    }
    //查看投票人投票权值
    function getVoterLegal(address userID) public view returns(uint){
        return voter[userID].weight;
    }
    //查看候选人姓名
    function getCandidateName(address userID) public view returns(string memory){
        return candidate[userID].name;
    }
    //查看候选人工号
    function getCandidateEmpNo(address userID) public view returns(string memory){
        return candidate[userID].empNo;
    }
    //查看候选人自我介绍
    function getCandidateDescribe(address userID) public view returns(string memory){
        return candidate[userID].describe;
    }
    //查看候选人所属场次
    function getCandidateBallotID(address userID) public view returns(string memory){
        return candidate[userID].ballotID;
    }
    //查看候选人所属组织
    function getCandidateOrg(address userID) public view returns(string memory){
        return candidate[userID].organization;
    }
    //查看候选人是否有投票权
    function getCandidateLegal(address userID) public view returns(bool){
        return candidate[userID].canBeVote;
    }
    //查看投票场次
    function getBallotID() public view returns(string memory){
        return BallotID;
    }
    //查看投票发起人区块链账号
    function getStarter(string memory ballotID) public view returns(address){
        return config[ballotID].starter;
    }
    //查看投票发起人工号
    function getStarterEmpNo(string memory ballotID) public view returns(string memory){
        return config[ballotID].empNo;
    }
    //查看投票发起人姓名
    function getStarterName(string memory ballotID) public view returns(string memory){
        return config[ballotID].name;
    }
    //查看投票主题
    function getBallotTitle(string memory ballotID) public view returns(string memory){
        return config[ballotID].title;
    }
    //查看最终当选人数量
    function getVictorCount(string memory ballotID) public view returns(uint){
        return config[ballotID].victorCount;
    }
    //查看最终当选人数量
    function getOrganization(string memory ballotID) public view returns(string memory){
        return config[ballotID].organization;
    }
    //查看投票发起时间
    function getCreateTime(string memory ballotID) public view returns(uint){
        return config[ballotID].createTime;
    }
    //查看投票开始时间
    function getStartTime(string memory ballotID) public view returns(uint){
        return config[ballotID].startTime;
    }
    //查看投票结束时间
    function getEndTime(string memory ballotID) public view returns(uint){
        return config[ballotID].endTime;
    }
}


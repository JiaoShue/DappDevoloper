pragma solidity >=0.4.0 <0.6.0;
contract Audit{
    //投票人权限信息
    struct Auditor {
        bool isStarter;
        bool canAudit;
    }
    //项目内容
    struct Proposal{
        address submitter;//项目提交者
        uint submitTime;//提交时间
        uint supported;//得票数
        bool pass;//是否通过
        uint passTime;//通过时间
        uint thresh;//方案通过所需获得支持的最低百分比
        uint endTime;//投票截止时间
        uint auditorCount;//当前方案投票参与者人数
        bool checked;//方案投票结果是否被验证
    }
    uint auditorCount;//本次审核的投票者人数
    address starter;//审核管理机构
    mapping(address=>Auditor) auditor;
    mapping(string=>Proposal) proposal;
    //初始化参与人
    event loginit(string);
    function init(address operator,address[] memory auditors) public{
        starter=operator;
        auditor[operator].isStarter=true;
        auditor[operator].canAudit=true;
        for(uint i=0;i<auditors.length;i++){
            auditor[auditors[i]].canAudit=true;
            auditor[auditors[i]].isStarter=false;
        }
        auditorCount=auditors.length;
        emit loginit("初始化成功！");
    }
    //添加参与人
    event logaddAuditor(string);
    function addAuditor(address operator,address audi) public{
        if(operator!=starter){
            emit logaddAuditor("非审核管理机构不能添加审核者！");
            return;
        }
        auditor[audi].canAudit=true;
        auditor[audi].isStarter=false;
        auditorCount=auditorCount+1;
        emit logaddAuditor("添加成功！");
    }
    //移除参与人
    event logremoveAuditor(string);
    function removeAuditor(address operator,address audi) public{
        if(operator!=starter){
            emit logremoveAuditor("非审核管理机构不能移除审核者！");
            return;
        }
        auditor[audi].canAudit=false;
        auditor[audi].isStarter=false;
        auditorCount=auditorCount-1;
        emit logremoveAuditor("移除成功！");
    }
    //提交提案（审核管理机构可以执行）
    event logsubmitProposal(string);
    function submitProposal(address operator,string memory proId,uint duration,uint threshold) public{
        if(operator!=starter){
            emit logsubmitProposal("非审核管理机构不能提交提案！");
            return;
        }
        proposal[proId].submitter=operator;
        proposal[proId].submitTime=now;
        proposal[proId].supported=0;
        proposal[proId].auditorCount=auditorCount;
        proposal[proId].pass=false;
        proposal[proId].passTime=0;
        proposal[proId].endTime=now+duration;
        proposal[proId].thresh=threshold;
        emit logsubmitProposal("提交成功！");
    }
    //审核
    event logaudit(string);
    function audit(bool support,address account,string memory proId) public{
        if(auditor[account].canAudit==false){
            emit logaudit("您未被授权审核！");
            return;
        }
        if(now>proposal[proId].endTime){
            emit logaudit("该方案审核已截止！");
            return;
        }
        if(support==true){
            proposal[proId].supported++;
            emit logaudit("审核成功！");
        }
    }
    //检验审核是否通过
    event logcheck(string);
    function check(string memory proId) public{
        if(now >proposal[proId].endTime){
            proposal[proId].checked=true;
            uint approvalScore=((proposal[proId].supported)*100)/proposal[proId].auditorCount;
            if(approvalScore>proposal[proId].thresh){
                proposal[proId].pass=true;
                proposal[proId].passTime=now;
                emit logcheck("项目通过！");
            }else{
                emit logcheck("项目未通过！");
            }
            
        }else{
            emit logcheck("请审核结束后检验！");
        }
    }
    //查看审核结果
    function getResult(string memory proId) public view returns(string memory){
        if(now >proposal[proId].endTime){
            if(proposal[proId].checked==false){
                return "请先检验！";
            }else{
                return (proposal[proId].pass==true)?"success":"fail";
            }
        }else{
            return "请审核结束后查看！";
        }
    }
    //查看项目通过时间
    function getProposalPassTime(string memory proId) public view returns(uint){
        if(now >proposal[proId].endTime){
            if(proposal[proId].checked==false){
                return 0;
            }else{
                return (proposal[proId].pass==true)?proposal[proId].passTime:0;
            }
        }else{
            return 0;
        }
    }
    //查看项目支持人数
    function getPropSupportedCount(string memory proId) public view returns(uint){
        if(now >proposal[proId].endTime){
            if(proposal[proId].checked==false){
                return 0;
            }else{
                return proposal[proId].supported;
            }
        }else{
            return 0;
        }
    }
    //查看项目参审人数
    function getPropAuditorCount(string memory proId) public view returns(uint){
        return proposal[proId].auditorCount;
    }
}

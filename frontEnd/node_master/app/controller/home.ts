import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    await this.app.redis.publish("SayHi", "Hi");
    this.ctx.body = '服务启动成功！\n'
    + '该集群提供如下接口：\n'
    + '本服务器ip:7001/newActiveAccount(string 密码):创建新激活账户(POST)\n'
    + '本服务器ip:7001/submitInfo(string 账户,string 密码,string 数据):信息上链(POST)\n'
    + '本服务器ip:7001/sendTransaction(string 源账户,string 密码,string 目的账户,string 金额,string 数据):交易(POST)\n'
    + '本服务器ip:7001/getTransaction(string 交易或上链操作后返回的ID):查询交易或查看上链信息(POST)\n'
    + '本服务器ip:7001/getBalance(string 用户ID):查询用户余额(POST)\n'
    + '本服务器ip:7001/deployContract(string 合约名):部署智能合约（需要先上传合约）(POST)\n'
    + '本服务器ip:7001/getAllContractInfo:查看合约信息(GET)\n'
    + '本服务器ip:7001/execContractMethod(string 合约名,string 方法名,string 调用方式,string 调用者,'
    + '\nstring 调用者密码,任意类型[函数参数列表]):执行合约方法（需要先上传和部署合约）(POST)\n';
  }
}
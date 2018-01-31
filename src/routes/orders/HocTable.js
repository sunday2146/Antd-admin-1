/**
 *  @desc  高阶组件
 *  @func  1.模板工厂-2.反向继承
 *  1.模板工厂控制流程： 组件挂载则订阅数据源 数据卸载则取消订阅 数据变化则更新state值
 *                      将state值当作props传给子组件
 *  2.反向继承：当有权限时则渲染toolbar 并且根据不同的权限数组生成不同的toolbar 添加到子组件中
 */

import React, {Component} from 'react';
import Toolbar from './component/toolbar';
import {originToolBar,sellToolBar} from './utils/mock';
import {query,getMaxandMin,getPrev,getNext} from './utils/index';
import request from './utils/request';


 //返回被包裹组件的原有名称 即在被高阶组件包裹之后应当保留其原有名称
const getDisplayName = (component)=>{
    return component.displayName || component.name || 'Component';
}

const  HocTable = (WrappedComponent) => {
     const childname = getDisplayName(WrappedComponent);
     let toolvalue = childname==='originOrder'?originToolBar:sellToolBar
     return class HOC extends Component {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`
        constructor(props) {
            super(props);
            this.state = {
                originList:null,
                MAXID: 0,
				MINID: 0, //当前id
				CURID: 0,
            };
            this.onClickItem = this.onClickItem.bind(this)
        }
        componentDidMount() {
            this.initData()
            //console.log(this.CURID)
        }
        onClickItem(value){
            switch(value){
                case 'getPrev':this.getData(getPrev(this.state.CURID)[childname]);break;
                case 'getNext':this.getData(getNext(this.state.CURID)[childname]);break;
                default:return value;
            }
        }
        initData(){
            //获取最大最小id
            request(getMaxandMin[childname])
            .then(response => {
                const {MAXID,MINID} = response
                this.setState({
                    MAXID,
                    MINID,
                    CURID:MINID+1
                })
                if(childname==='sellOrder'){
                    request(query(this.state.MAXID)[childname]).then(originList=>{
                        this.setState({originList})
                    })
                }
            })
        }
        getData(url){
            request(url)
            .then(response => {
                //console.log(response.ID)
                this.setState({
                    originList:response,
                    CURID:response.ID
                })
            })
        }
        render() {
            return(
                <div>
                    <div className="demo-header">
                        <Toolbar data={toolvalue} onClickItem={this.onClickItem}/>
                    </div>
                    <WrappedComponent data={this.state.originList} {...this.props} />
                </div>
            )
        }
    };
  }


export default HocTable;
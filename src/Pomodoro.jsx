import React,{Component} from 'react';
import GithubCorner from 'react-github-corner';
import './Pomodoro.css';

class Pomodoro extends Component {
    constructor(){
        super();
        this.state={
            timeTypeMap:[{
                type:'Code',
                time:'25:00'
            },{
                type:'Social',
                time:'00:10'
            },{
                type:'Coffee',
                time:'15:00'
            }],
            index:0,
            time:''
        }
    }
    componentDidMount(){
        this.initStateTime();
    }
    initStateTime(){
        this.setState({
            time:this.state.timeTypeMap[this.state.index].time
        })
    }
    chooseType(e){
        const type=e.target.innerText;
        const index=this.state.timeTypeMap.findIndex(item=>{
            return item.type===type;
        })
        this.setState({
            index,
            time:this.state.timeTypeMap[index].time
        })
        this.startTimer();
    }
    startTimer(){
        clearInterval(this.timer);
        this.timer=setInterval(()=>{
            const time=this.parseTime.call(this);
            if(time){
                this.setState({
                    time
                })
            }else{
                // boom
                clearInterval(this.timer);
                console.log('boom');
            }
        },1000)
    }
    parseTime(){
        const time=this.state.time.split(':');
        let sec=+time[1];
        let min=+time[0];
        if(sec!==0){
            time[1]=(--sec+'').padStart(2,'0');
        }else if(min!==0){
            time[0]=(--min+'').padStart(2,'0');
            time[1]='59';
        }else{
            return false;
        }
        return time.join(':');
    }
    play(){
        if(this.timer) return;
        this.startTimer();
    }
    stop(){
        clearInterval(this.timer);
        this.timer=null;
    }
    render(){
        const timeTypeMap=this.state.timeTypeMap;
        const index=this.state.index;
        return (
            <section className='pomodoro'>
                <aside>
                    <GithubCorner href="https://github.com/qiangzi7723/react-pomodoro" bannerColor="#2BA0A0" octoColor="#272727"/>
                </aside>
                <section className='main'>
                    <span className='left-time'>{this.state.time}</span>
                    <span className='time-type-title'>Enjoy The {timeTypeMap[index].type} Time</span>
                    <div className='type-choose'>
                        {timeTypeMap.map((item,index)=>{
                            return <span key={index} onClick={this.chooseType.bind(this)}>{item.type}</span>
                        })}
                    </div>
                    <div className='time-control'>
                        <button className='play' onClick={this.play.bind(this)}></button>
                        <button className='stop' onClick={this.stop.bind(this)}></button>
                    </div>
                </section>
            </section>
        )
    }
}

export default Pomodoro;
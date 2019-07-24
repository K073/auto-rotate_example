import React from 'react';
import styled, { keyframes } from 'styled-components';
import './App.css';

interface IFiller {
  delay: number;
  progress: number;
}

const fillerAnim = keyframes`
    0% {background: red; width: 100px;}
    100% {background: yellow; width: 100%;}
`;

const Filler = styled.div<IFiller>`
  height: 100%;
  width: 100%;
  overflow:hidden;
  animation: ${fillerAnim} ${props => props.delay}s ease-in;  
`;


interface IState {
  orientationVertical: boolean;
  hiddenCloseBtn: boolean;
  fillerStatus: boolean;
  progressBarDelay: number;
};

interface IProps {}

class App extends React.Component<IProps, IState> {
  state = {
    orientationVertical: true,
    hiddenCloseBtn: true,
    fillerStatus: false,
    progressBarDelay: 3
  }

  _Filler = React.createRef();

  componentDidMount () {
    const supportsOrientationChange = "onorientationchange" in window,
          orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    
    if (supportsOrientationChange) {
      this.handleRotate()
      window.addEventListener(orientationEvent, this.handleRotate)
    }

    this.setState({fillerStatus: true})
    setTimeout(() => this.setState({hiddenCloseBtn: false}), this.state.progressBarDelay * 1000)
  }

  handleRotate = () => {
    const orientation: number = Number(window.orientation);

    if (orientation === 90 || orientation === -90)
      this.setState({orientationVertical: false})
    else
      this.setState({orientationVertical: true})  
  }

  render () {
    return <div className="banner" >
      <img src={ 
        this.state.orientationVertical ? 
        "https://static.aviapark.com/files/155333/nc_ss19_620x960px_1.png" : 
        "https://static.aviapark.com/files/155333/960x576_1.png" } alt=""/>
        {!this.state.hiddenCloseBtn ? <button className="closeBtn">X</button> : null}
        <div className="progressBar">
          <Filler delay={this.state.progressBarDelay} progress={100}/>
        </div>
      </div>
  }
}

export default App;
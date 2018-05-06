class Stopwatch extends React.Component {
    constructor() {
        super()
        this.state = {
            running: false,
            stylePath: 'dark.css',
            results: [],
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0    
            }
         };
    }
    
    reset(){
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0 
            }
       })
    }
    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }
    format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
    }
    start() {
        if (!this.state.running) {
            this.setState({
                running: true,
                watch: setInterval(() => this.step(), 10)
            });
        }
    }
    step() {
        let minutes = this.state.times.minutes;
        let seconds = this.state.times.seconds;
        let miliseconds = this.state.times.miliseconds;

        miliseconds++;
        if (miliseconds >= 100) {
            seconds++;
            miliseconds = 0;
        }
       if (seconds >= 60) {
            minutes++;
            seconds = 0;
        }
        this.setState({
            times: {
                miliseconds,
                seconds,
                minutes
            }
        });
    }
    stop() {
        clearInterval(this.state.watch);
        this.setState({
            running: false
        });
    }
    writeList(){
         const results = this.state.results.slice();
        results.push(this.format(this.state.times));
        this.setState({results: results})
    }
    resetList() {
        this.setState({results: []});
    }
    swapStyleSheet(sheet) {
        this.setState({
            stylePath: sheet
        })
    }
    render(){
        return (
            <div>
                <link rel="stylesheet" type="text/css" href={this.state.stylePath} />
                <div className='container'>
                    <div className='stopwatchWrapper'>
                        <h1>Stopwatch</h1>
                         <Theme onClick={this.swapStyleSheet.bind(this)} />
                        <div className='stopwatch'>{this.format(this.state.times)}</div>
                        <Nav  
                            onStart={this.start.bind(this)}
                            onStop={this.stop.bind(this)}
                            onReset={this.reset.bind(this)}
                            onList={this.writeList.bind(this)}
                            onResetList={this.resetList.bind(this)}
                        />
                   </div>
                    <ul className="results">
                        {this.state.results.map((result, index) => <li key={index}>{result}</li>)}  
                   </ul>
                </div>  
            </div>
       )
    }
}



class Theme extends React.Component {
    swap(event) {
        var sheet = event.target.value;
        this.props.onClick(sheet)
    }
    render(){
        return (
            <form>
                <input id="stylesheet1" type="radio" defaultChecked name="theme" value="dark.css" onClick={this.swap.bind(this)} />
                <label htmlFor="stylesheet1">Dark theme</label>
                <input id="stylesheet2" type="radio" name="theme" value="light.css" onClick={this.swap.bind(this)} />
                <label htmlFor="stylesheet2">Light theme</label>
            </form>
        )
    }
}



class Nav extends React.Component {
    propTypes: {
        onStart: PropTypes.func.isRequired,
        onStop: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired,
        onList: PropTypes.func.isRequired,
        onResetList: PropTypes.func.isRequired
    }
    render(){
        return(
           <nav className='controls'>
                <Button label="start" name="Start" onClick={this.props.onStart} />
                <Button label="stop"  name="Stop" onClick={this.props.onStop} />
                <Button label="reset" name="Reset" onClick={this.props.onReset} />
                <Button label="save"  name="Save result" onClick={this.props.onList} />
                <Button label="resetList" name="Reset results" onClick={this.props.onResetList} />       
           </nav>    
      )
   }
}



class Button extends React.Component {
    propTypes: {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    }
    render() {
        return (
           <a
             id={this.props.label}
              label={this.props.label}
              href="#"
              className={[this.props.label, "button"].join(' ')}
              onClick={this.props.onClick}>
              {this.props.name}
            </a>
        )
    }
}



ReactDOM.render( < Stopwatch / > , document.getElementById('app'));


import React from "react";
import axios from "axios";
import '../App.css';

export default class Button extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      newColor: "",
      colorSubmit: {backgroundColor: "red"},
      quote: "",
      author: ""
    }
  }

  hexColor(){
    let string = ["#"];
    for(let i = 0; i < 6; i++){
      let numLetter = Math.floor(16*Math.random());
      switch (numLetter) {
        case 10:
          string.push("a");
          break;
        case 11:
          string.push("b");
          break;
        case 12:
          string.push("c");
          break;
        case 13:
          string.push("d");
          break;
        case 14:
          string.push("e");
          break;
        case 15:
          string.push("f");
          break;
        default:
          string.push(numLetter.toString());
      }
    }
    return string.join("");
  }

  handleClick = () => {
    this.setState({
      newColor: this.hexColor(),
      colorSubmit: {
        backgroundColor: this.state.newColor
      }
    });
    console.log(this.state.newColor);
    this.getQuote();
  }

  getQuote = () => {
    const num = Math.floor(Math.random() * 100);
    axios.get("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      .then((res) => {
        this.setState({
          quote: res.data.quotes[num].quote,
          author: res.data.quotes[num].author
        });
      })
  }

  componentDidMount(){
    this.getQuote();
  }

  render(){
    return(
      <div style={this.state.colorSubmit} className="colorCheck">
        <button style={{border: "2px solid white"}}className="btn btn-lg btn-success buttonCustom" onClick={this.handleClick}>Change</button>
        <blockquote style={{margin: "30px", fontSize: "2em"}}>{this.state.quote}</blockquote>
        <p style={{fontSize: "1.5em"}}><em>- {this.state.author}</em></p>
      </div>
    )
  }
}

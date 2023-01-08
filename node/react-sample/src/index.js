import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HeaderLayout } from './header/header.js' // 分割したコンポーネントを外部からインポートするとき、先頭大文字
import { FooterLayout } from './footer/footer.js'
import App from './App';
import reportWebVitals from './reportWebVitals';

// class Square extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: null // this.props.valueで初期値を設定することも可能
//     };
//   }

//   render() {
//     return (
//       <button 
//         className="square"
//         // onClick={() => { console.log('click'); }}>
//         // onClick={() => { this.setState({ value: 'X' })}}>
//         // Boardクラスからpropsとして渡されている関数
//         onClick={() => { this.props.onClick() }}> 
//         {this.props.value}
//         {/* {this.state.value} */}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button 
      className='square' 
      onClick={ props.onClick }
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null), 
  //     xIsNext: true,
  //   };
  // }

  // handlerClick(i) {
  //   const squares = this.state.squares.slice(); // イミュータブルにしておく（ログ追跡用などで使用）
  //   if (calculateWinner(squares) || squares[i]) { return; }
  //   // squares[i] = 'X';
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({ 
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    return (
      // <Square 
      //   value = { this.state.squares[i] }
      //   onClick = { () => { this.handlerClick(i); } }
      // />
      <Square
        value = { this.props.squares[i] }
        onClick = { () => { this.props.onClick(i); } }
      />
    );
  }

  render() {
    // let selectPlayer = this.state.xIsNext ? 'X' : 'O';
    // const status = 'Next player: ' + selectPlayer;

    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }

    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null), 
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handlerClick(i) {
    // const history = this.state.history;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1];
    const squares = current.squares.slice(); // イミュータブルにしておく（ログ追跡用などで使用）
    if (calculateWinner(squares) || squares[i]) { return; }
    // squares[i] = 'X';
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ 
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    // const current = history[history.length -1];
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // 過去に戻すボタンの表示処理・クリックイベント
    // moveが配列のindexと同等と思えばよい
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';

      return (
        <li key = {move}>
          <button onClick = { () => { this.jumpTo(move)}}>{desc}</button>
        </li>
      )
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        
        <div className="game-board">
          <Board
            squares = { current.squares }
            onClick = { (i) => this.handlerClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// ゲーム勝者判定用
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: '未選択',
      selectBox: '未選択',
    };
  }

  handlerClick(val) {
    this.setState({
      selectRadio: val
    });
  }

  handlerChange(val) {
    this.setState({
      selectBox: val
    });
  }


  render() {
    return (
      <div>
        <div>
          <input />
        </div>
        <div>
          <textarea />
        </div>
        <div>
          <label>
            <input 
              type = "radio"
              name = "sampleButtons"
              value = "sampleButtonsA"
              onClick = { () => this.handlerClick("sampleButtonsA") }
            />
            <input 
              type = "radio"
              name = "sampleButtons"
              value = "sampleButtonsB"
              onClick = { () => this.handlerClick("sampleButtonsB") }
            />
          </label>
          <p>選択: {this.state.selectRadio}</p>
        </div>
        <div>
          <select 
            val={this.state.selectBox}
            onchange = { () => { this.handlerChange()}}
          >
            <option value="react">react</option>
          </select>
        </div>
      </div>
    );
  }
}
// ========================================
const headerLayout = ReactDOM.createRoot(document.getElementById("headerLayout"));
headerLayout.render(<HeaderLayout />);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

const shoppingList = ReactDOM.createRoot(document.getElementById("shoppingList"));
shoppingList.render(<ShoppingList name="sample"/>);

const buttons = ReactDOM.createRoot(document.getElementById('buttons'));
buttons.render(<Buttons />);

const footerLayout = ReactDOM.createRoot(document.getElementById("footerLayout"));
footerLayout.render(<FooterLayout />);
import MyComponent from './components/MyComponent'
import DisplayUsers from './components/DisplayUsers'
import ShowHideElement from './components/ShowHideElement'
import DataBinding from './components/DatabBinding'
import TicTacToe from './components/TicTacToe'

function App() {
  return (
    <div className="App">
      < MyComponent />
      < DisplayUsers />
      < ShowHideElement />
      <br/>
      <hr/>
      < DataBinding />
      <br/>
      <hr/>
      <TicTacToe />
    </div>
  );
}

export default App

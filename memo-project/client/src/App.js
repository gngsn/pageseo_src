import React, { Component } from 'react';
import plus from './plus.png';
import Modal from './components/Modal';
import './App.css';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isModalOpen: false, 
      memos: []
    }
  }
  
  openModal = () => {
    this.setState({ isModalOpen: true });
  }

  getAllMemos = () => {
    fetch('/memo')
    .then(res => res.json())
    .then(memos => 
      {
        this.setState({ memos });
        console.log( "Network success - memo : ", memos );
    }).catch(
      console.log( "Network Error" )
    );
      ;
  }
  
  closeModal = () => {
    this.setState({ isModalOpen: false });
    this.getAllMemos();
  }

  componentDidMount(){
    this.getAllMemos();
  }


  render() {
    return (
      <div className='container'>
      <div className='App'>
        <h1> 메모장 </h1><br/><br/>
        <table>
						<tbody>
							<tr className='trList'>
                {  
                this.state.memos.map ( memo =>
									<td className='cell' key={memo._id}>
                      <div className='inner'>
											<h2> {memo.title} </h2>
                      <h5> {memo.author} </h5><br/><br/>
											<h4> {memo.content} </h4><br/>
                      <h5> {memo.updatedAt.split('T')[0]} </h5>
										</div>
									</td>
                )}
                <td className='cell' >
										<div className='inner' onClick={this.openModal}>
                    <img src={plus} className='picture' alt='logo' />
										</div>
									</td>
							</tr>
						</tbody>
					</table>
          <main className='App'>
        <Modal isOpen={this.state.isModalOpen} close={this.closeModal} />
      </main>
      </div>
      </div>
    );
  }
}

export default App;
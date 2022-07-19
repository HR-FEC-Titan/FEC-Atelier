import React from "react";
// import './modal.css'
//inside whatever component that you are using this:
//1. make state called show, set to false
//2. create toggle fucntion
// showModal = e =>{
//   this.setState({
//     show: !this.state.show
//   })
// }
//3. pass it the onclose and show props and children to render
//<Modal onClose={this.showModal} show={this.state.show}>Here is where you pass it what child props to render in the modal, I passed it my form<Form/></Modal>

export default class Modal extends React.Component {

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if(!this.props.show){
        return null;
    }
  return (
    <div>
    <div>{this.props.children}</div>
    <div>
          <button
            onClick={e => {
              this.onClose(e);
            }}
          >
            Close
          </button>
        </div>
    </div>
  //   <div class="modal" id="modal">
  //   <h2>Modal Window</h2>
  //   <div class="content">{this.props.children}</div>
  //   <div class="actions">
  //     <button class="toggle-button" onClick={this.onClose}>
  //       close
  //     </button>
  //   </div>
  // </div>
   )
  }
}
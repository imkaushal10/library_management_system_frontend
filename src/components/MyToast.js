import React, {Component} from 'react';
import {Toast, ToastHeader, ToastBody} from 'reactstrap';


export default class MyToast extends Component{
    render(){
        const toastcss = {
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '1',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        };

        return (
         <div style={this.props.children.show? toastcss: null}>
                <Toast className={`"border text-white" ${this.props.children.type === "success"? "border-success bg-success": "border-danger bg-danger"}`}>
                      <ToastHeader className={`"text-white" ${this.props.children.type === "success"? "bg-success" : "bg-danger"}`} closeButton={false}>
                          <strong className="mr-auto">Success</strong>
                       </ToastHeader>    
                       <ToastBody>
                           {this.props.children.message}
                       </ToastBody>    
                </Toast>
         </div>   
            
        )
    }
}
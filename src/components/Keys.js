import React from "react";

const Key = ({text,className, eClick})=>{ ///destructuring (props) to ({text})//
    return(
        <span className={className} onClick={eClick} data-text={text}>{text}</span>
    )
}
// class Key extends React.Component{
//     render(){
//         // const text = this.props.text
//         const {text} = this.props;
//         return(
//             <span>{text}</span>
//         )
//     }
// }

export default Key
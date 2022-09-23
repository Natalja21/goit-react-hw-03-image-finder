const Btn = ({type , text, onLoading}) => (<div><button type={type} onClick={() => onLoading()}>{text}</button></div>);

export default Btn
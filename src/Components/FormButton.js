import React from 'react';
import {Link} from 'react-router-dom';

const FormButton = (props) => {
  return (<div id="button" className="row">
    <button type={props.type}>{props.title}
    </button>
  </div>)
};
const FormInput = (props) => {
  return (<div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} name={props.name} className={props.className}/>
  </div>)
};
const FormHeader = props => (<h2 id="headerTitle">{props.title}</h2>);

const OtherComponents = (props) => {
  return (<div className="alternativeLogin">
    <h4>{props.value}</h4>
    <Link to={props.link}>{props.name}</Link>

  </div>)
}

export {
  FormHeader
};
export {
  FormInput
};
export {
  OtherComponents
};
export default FormButton;
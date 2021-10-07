import React from 'react';
import { Link } from 'react-router-dom';

const FormButton = (props) => {
  return (<div >
    <button className="btn btn-lg btn-block btn-primary mt-4" type={props.type}>{props.title}
    </button>
  </div>)
};
const FormInput = (props) => {
  return (<div>
    <input type={props.type} placeholder={props.placeholder} name={props.name} className={props.className} />
  </div>)
};
const FormHeader = props => (<p className="text-center text-uppercase mt-3">{props.title}</p>);

const OtherComponents = (props) => {
  return (<div className="text-center d-block mt-2">
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
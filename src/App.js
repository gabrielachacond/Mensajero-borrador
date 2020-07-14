import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Mensajero</h1>
      <Mensajero />
    </div>
  );
}

class Mensajero extends React.Component {
  state = {
    input: "",
    mensajes: ["mensaje 1", "mensaje 2"]
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnClickSubmit = e => {
    e.preventDefault();
    const newMessageArray = Array.from(this.state.mensajes);
    newMessageArray.push(this.state.input);
    this.setState({ input: "", mensajes: newMessageArray });
  };

  handleClickBorrado = id => {
    const arregloViejo = Array.from(this.state.mensajes);
    const arregloNuevo = arregloViejo.filter(function(e, index) {
      return e[index] !== e[id];
    });
    this.setState({ input: "", mensajes: arregloNuevo });
  };

  render() {
    const { input, mensajes } = this.state;

    return (
      <div>
        <Form
          onUserInput={this.handleOnChange}
          onUserSubmit={this.handleOnClickSubmit}
          value={input}
        />
        <h2>Mensajes enviados:</h2>
        {mensajes.map((mensaje, index) => (
          <Mensajes
            key={index}
            id={`${index}`}
            userMessage={mensaje}
            onBorrar={this.handleClickBorrado}
          />
        ))}
      </div>
    );
  }
}

const Form = props => {
  return (
    <form>
      <input
        name="input"
        type="text"
        value={props.value}
        onChange={props.onUserInput}
      />
      <button onClick={props.onUserSubmit}>Enviar</button>
    </form>
  );
};

const Mensajes = props => {
  return (
    <div>
      <p>{props.userMessage}</p>
      <button className="botonBorrado" onClick={() => props.onBorrar(props.id)}>
        X
      </button>
    </div>
  );
};

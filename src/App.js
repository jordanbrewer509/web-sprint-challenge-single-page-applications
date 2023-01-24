import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import Form from "./pizza";
import schema from "./schema";
import * as yup from 'yup';
import axios from "axios";

const initialFormValues = {
  nameInput: '',
  sizeInput: '',
  pepperoni: false,
  onions: false,
  blackOlives: false,
  pineapple: false,
  'special-text': ''
}

const initialFormErrors = {
  nameInput: '',
  sizeInput: '',
  pepperoni: false,
  onions: false,
  blackOlives: false,
  pineapple: false,
  'special-text': ''
}

const initialDisabled = true;

const App = () => {
  
  const [ order, setOrder ] = useState([]);
  const [ form, setForm ] = useState(initialFormValues);
  const [ formErrors, setFormErrors ] = useState(initialFormErrors);
  const [ disabled, setDisabled ] = useState(initialDisabled);

  const postNewOrder = newOrder => {
    axios.post(`https://reqres.in/api/orders`, newOrder)
      .then(res => {
        setOrder([res.data], ...order);
        console.log(res.data)
        console.log(initialFormValues)
        console.log(form)
        setForm(initialFormValues)
      })
      .catch(err => console.error(err))
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: ""}))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }

  const inputChange = (name, value) => {
    validate(name, value); 
    setForm({ ...form, [name]: value})
  }

  const formSubmit = evt => {
    evt.preventDefault();
    const newOrder = {
      nameInput: form.nameInput.trim(),
      ...form
    }
    console.log('formsubmit')
    postNewOrder(newOrder);
  }

  useEffect(() => {schema.isValid(form).then(valid => setDisabled(!valid))}, [form])

  return (
    <div className="container">
    <Route exact path="/">

    <nav>BloomTech
      <button>Home</button>
      <button>Help</button>
    </nav>
    <header>
      <h1>Lambda Eats</h1>
    </header>
    
    <p>Your favorite food, delivered while coding</p>
    
    <Link to="/pizza.js">
    <button id="order-pizza">Pizza?</button>
    </Link>
    </Route>
    <Route path="/pizza.js">
      <Form
        values={form}
        submit={formSubmit}
        change={inputChange}
        disabled={disabled}
        errors={formErrors}
      /> 
    </Route>

    </div>
  );
};
export default App;

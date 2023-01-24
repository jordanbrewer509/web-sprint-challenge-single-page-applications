import React from "react";
import { Link, Route } from "react-router-dom";

const Form = (props) => {
    const { values, submit, change, disabled, errors } = props;

    const onChange = evt => {
        const { name, value, checked, type } = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse)
    }
    
    return (
        <Route exact path="/pizza">
            <h1>BloomTech Eats</h1>
            <Link to="/">
                <button>Home</button>
            </Link>
        <h3>Build your Own Pizza</h3>
        <form id="pizza-form" onSubmit={submit}>
            <label>First and Last Name</label>
            <input 
                name="nameInput"
                onChange={onChange}
                value={values.nameInput}
                type="text"
                id="name-input"
                placeholder="John Doe"
            />
            <label hidden>Size of Pizza</label>
                <select
                    onChange={onChange}
                    value={values.size}
                    id='size-dropdown'
                    name="sizeInput"
                >
                    <option hidden value=''>Select a Size...</option>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>
                </select>

            <label>Choice of Toppings</label>
                <label>Pepperoni</label>
                <input 
                    type="checkbox"
                    name="pepperoni"
                    onChange={onChange}
                    checked={values.pepperoni}
                />
                <label>Onions</label>
                <input 
                    type="checkbox"
                    name="onions"
                    onChange={onChange}
                    checked={values.onions}
                />
                <label>Black Olives</label>
                <input 
                    type="checkbox"
                    name="blackOlives"
                    onChange={onChange}
                    checked={values.blackOlives}
                />
                <label>Pineapple</label>
                <input 
                    type="checkbox"
                    name="pineapple"
                    onChange={onChange}
                    checked={values.pineapple}
                />
            
            <label>Special Instructions</label>
            <input 
                type="text"
                name="special-text"
                id="special-text"
                placeholder="ex. Knock twice"
                onChange={onChange} 
                value={values['special-text']}
            />

            <label hidden>Add to Order</label>
            <button id="order-button" disabled={disabled}>Add to Order</button>
            <div className="errors">
                <div>{errors.nameInput}</div>
                <div>{errors.sizeInput}</div>
            </div>
        </form>
        </Route>
    )
}
export default Form;
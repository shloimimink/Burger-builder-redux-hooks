import React from 'react';
import classes from "./Order.css";
import Button from "../UI/button/Button";


const Order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span className={classes.BoxOrder}
                     key={ig.name}>{ig.name} ({ig.amount})</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price:
                <strong>USD {Number.parseFloat(props.price)}</strong> {' '}
                <Button btnType="Danger" onClick={props.deleteSingleOrder}>DELETE</Button></p>
        </div>
    )

};

export default Order;

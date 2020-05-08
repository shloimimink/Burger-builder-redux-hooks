import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngreintsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => async dispatch => {
    try {
        const response = await axios.get('https://my-burger-470cf.firebaseio.com/ingredients.json');
        dispatch(setIngredients(response.data))

    } catch (error) {
        dispatch(fetchIngreintsFailed())
    }
};


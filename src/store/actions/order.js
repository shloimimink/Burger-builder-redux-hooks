import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderData, token) => async dispatch => {
    try {
        dispatch(purchaseBurgerStart());
        const response = await axios.post('/orders.json?auth=' + token, orderData);
        const addBurger = response.data;
        console.log("burger added", addBurger, response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))

    } catch (error) {
        dispatch(purchaseBurgerFail(error))
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const deleteOrdersSuccess = (orders) => {
    return {
        type: actionTypes.DELETE_SINGLE_ORDER,
        orders: orders
    }
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const deleteSingleOrder = (orderData) => async dispatch => {
    try {
        const response = await axios.delete('/orders.json' + orderData);
        const deleteOrder = response.data;
        console.log("order deleted", deleteOrder, response.data);
        dispatch(deleteOrdersSuccess(response.data.order, orderData))
    } catch (err) {
        console.log(err)
    }
};

export const fetchOrders = (token, userId) => async dispatch => {
    try {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        const res = await axios.get('/orders.json' + queryParams);
        const fetchOrders = [];
        for (let key in res.data) {
            fetchOrders.push({...res.data[key], id: key})
        }
        console.log(res.data);
        dispatch(fetchOrdersSuccess(fetchOrders))

    } catch (error) {
        dispatch(fetchOrderFail(error))

    }
};

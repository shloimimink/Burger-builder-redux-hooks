import React, {useEffect} from 'react';
import Order from "../../components/order/Order";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";
import {connect} from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/spinner/Spinner";


const orders = (props) => {
    const {onfetchOrders} = props;

    useEffect(() => {
        props.onfetchOrders(props.token, props.userId);
        props.onDeleteOrder(props.orderData)
    }, [onfetchOrders]);


    let orders = <Spinner/>;
    if (!props.loading) {
        orders = props.orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
                deleteSingleOrder={props.deleteSingleOrder}
            />
        ))
    }
    return (
        <div>
            {orders}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onfetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onDeleteOrder: (orderData) => dispatch(actions.deleteSingleOrder(orderData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));

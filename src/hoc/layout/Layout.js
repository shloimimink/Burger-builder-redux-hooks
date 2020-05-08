import React, {useState} from 'react';
import Aux from "../aux/Aux";
import {connect} from "react-redux";
import classes from "./Layout.css"
import Toolbar from "../../components/navigation/toolbar/Toolbar";
import SideDrawer from "../../components/navigation/sideDrawer/SideDrawer";


const layout = (props) => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

   const sideDrawerClosedHandler = () => {
       setSideDrawerIsVisible(false)
    };

   const sideDrawerToggleHandler = () => {
       setSideDrawerIsVisible(!sideDrawerIsVisible)
    };

        return (
            <Aux>
                <Toolbar
                    isAuth={props.isAuthenticated}
                    drawerToggleClicked={sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={props.isAuthenticated}
                    open={sideDrawerIsVisible}
                    closed={sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        )
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(layout);

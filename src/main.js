/**
 * Created by Developer39 on 7/28/2017.
 */
import React,{Component} from 'react';
import Menu from './components/menu';
import Footer from './components/footer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCart} from '../src/action/cartAction';

class Main extends Component{
    componentDidMount()
    {
        this.props.getCart();
    }
    render(){
        return(
            <div>
                <Menu cartItemNumber={this.props.totalQty} />
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}


function mapStateToProps(state) {`+`
     return{
         totalQty:state.cart.totalQty
     };
}

function mapDispatchToProp(dispatch) {
    return bindActionCreators({
        getCart:getCart
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProp)(Main);
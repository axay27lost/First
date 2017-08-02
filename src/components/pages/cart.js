/**
 * Created by Developer39 on 7/27/2017.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Modal,Panel,Col,Row,Well,Button,ButtonGroup,Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteToCart,updateToCart,getCart} from '../../action/cartAction';

class cart extends Component
{
    componentDidMount()
    {
        this.props.getCart();
    }

    constructor(){
        super();
        this.state={
            showModal:false
        }
    }
    open()
    {
        this.setState({showModal:true});
    }
    close()
    {
        this.setState({showModal:false});
    }
    onDelete(_id)
    {
        const currentBookToDelete=this.props.cart;
        const indexToDelete=currentBookToDelete.findIndex(
            function (cart) {
                return cart._id===_id
            }
        )
        let cartAfterDelete= [...currentBookToDelete.slice(0,indexToDelete),...currentBookToDelete.slice(indexToDelete+1)];
        this.props.deleteToCart(cartAfterDelete);
    }
    onIncrement(_id)
    {
        this.props.updateToCart(_id,1,this.props.cart);
    }
    onDecrement(_id,quantity)
    {
        if(quantity>1)
        {
            this.props.updateToCart(_id,-1,this.props.cart);
        }
    }
    render(){
        if(this.props.cart[0])
        {
            return this.renderCart();
        }else{
            return this.renderEmpty();
        }
    }
    renderEmpty(){
        return(
            <div></div>
        );
    }
    renderCart(){
        const cartItemsList=this.props.cart.map(function (cartArr) {
            return(
                <Panel key={cartArr._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6><span></span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>usd. {cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth:'300px'}}>
                                <Button bsStyle="default" bsSize="small" onClick={this.onDecrement.bind(this,cartArr._id,cartArr.quantity)}>-</Button>
                                <Button bsStyle="default" bsSize="small" onClick={this.onIncrement.bind(this,cartArr._id)}>+</Button>
                                <span>     </span>
                                <Button bsStyle="danger" bsSize="small" onClick={this.onDelete.bind(this,cartArr._id)}>DELETE</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            );
        },this)
        return(
            <Panel header="Cart" bsStyle="primary">
                {cartItemsList}
                <Row>
                    <Col xs={12}>
                        <h6>Total Amount {this.props.totalAmount}</h6>
                        <Button bsStyle="success" bsSize="small" onClick={this.open.bind(this)}>
                            Process To Click
                        </Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank You!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your Order Has Been Save</h6>
                        <p>You will receive an confirmation Email</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}>
                            <h6>total $: {this.props.totalAmount}</h6>
                        </Col>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return{
        cart:state.cart.cart,
        totalAmount:state.cart.totalAmount
    }
}
function mapDispatchToProp(dispatch) {
    return bindActionCreators({
        deleteToCart:deleteToCart,
        updateToCart:updateToCart,
        getCart:getCart
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProp) (cart);
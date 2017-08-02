/**
 * Created by Developer39 on 7/27/2017.
 */
import React,{Component} from 'react';
import {Row,Col,Well,Button,Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart,updateToCart} from '../../action/cartAction';

class BookItem extends Component{
    constructor()
    {
        super();
        this.state={
            isClicked:false
        };
    }
    onReadMore()
    {
        this.setState({isClicked:true});
    }
    handleCart()
    {
        console.log(this.props.cart);
        const book=[...this.props.cart,{
            _id:this.props._id,
            title:this.props.title,
            description:this.props.description,
            images:this.props.images,
            price:this.props.price,
            quantity:1
        }]
        if(this.props.cart.length>0)
        {
            let _id=this.props._id;
            let cartIndex=this.props.cart.findIndex(function (cart) {
                return cart._id===_id;
            })
            if(cartIndex===-1)
            {
                this.props.addToCart(book);
            }
            else
            {
                this.props.updateToCart(_id,1,this.props.cart);
            }
        }
        else
        {
            this.props.addToCart(book);
        }

    }
    render(){
        return(
            <Well>
                <Row>
                    <Col xs={12} sm={4}>
                        <Image src={this.props.images} responsive   />
                    </Col>
                    <Col xs={6} sm={8}>
                        <h6>{this.props.title}</h6>
                        <p>{(this.props.description.length>50 && this.state.isClicked === false)?
                            (this.props.description.substring(0,50)):(this.props.description)}
                            <button className="link" onClick={this.onReadMore.bind(this)}>
                                {(this.state.isClicked === false && this.props.description !== null && this.props.description.length >50)?
                                    ('...read more'):('')}
                            </button>
                        </p>
                        <h6>usd. {this.props.price}</h6>
                        <Button bsStyle="primary" onClick={this.handleCart.bind(this)}>Buy Now</Button>
                    </Col>
                </Row>
            </Well>
        );
    }
}

function mapStateToProps(state) {
    return{
        cart:state.cart.cart
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addToCart:addToCart,
        updateToCart:updateToCart
        },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps) (BookItem);

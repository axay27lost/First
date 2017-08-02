/**
 * Created by Developer39 on 7/27/2017.
 */
import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../action/bookAction';
import {Carousel,Grid,Row,Button,Col} from 'react-bootstrap';
import BookItem from './BookItem';
import BookForm from './BooksForm';
import Cart from './cart';

class BookList extends Component
{
    componentDidMount()
    {
         this.props.getBooks();
    }
    render(){

        const booksList=this.props.books.map(function (book) {
            return(
                <Col xs={12} sm={6} md={4} key={book._id}>
                    <BookItem
                        _id={book._id}
                        title={book.title}
                        description={book.description}
                        images={book.images}
                        price={book.price}
                    />
                </Col>
            )
        });

        return(
            <Grid>
                <Row>
                    <Carousel>
                        <Carousel.Item>
                            <img width={900} height={300} alt="900x300" src="/images/home1.png"/>
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={300} alt="900x300" src="/images/home2.jpg"/>
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row style={{marginTop:'15px'}}>
                    <Cart/>
                </Row>
                <Row>

                    {booksList}
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        books:state.books.books
    };
}

function mapDispatchToProps(dispatch) {
     return bindActionCreators({getBooks:getBooks},dispatch);
 }

export default connect(mapStateToProps,mapDispatchToProps)(BookList);
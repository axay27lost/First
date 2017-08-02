/**
 * Created by Developer39 on 7/27/2017.
 */
import React,{Component} from 'react';
import {MenuItem,Row,Col,Well,Image,InputGroup,DropdownButton,Panel,FormControl,FormGroup,ControlLabel,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {postBooks,deleteBooks,getBooks,resetButton} from '../../action/bookAction';
import {findDOMNode} from 'react-dom';
import axios from 'axios';

class BooksForm extends Component
{
    constructor(){
        super();
        this.state={
            images:[{}],
            img:''
        };
    }
    componentDidMount(){
        this.props.getBooks();
        axios.get('api/images')
            .then(function (response) {
                this.setState({images:response.data});
            }.bind(this))
            .catch(function (err) {
                this.setState({images:"error",img:''});
            }.bind(this))
    }
    handleSubmit(){

        const book=[{
            title:findDOMNode(this.refs.title).value,
            description:findDOMNode(this.refs.description).value,
            images:findDOMNode(this.refs.images).value,
            price:findDOMNode(this.refs.price).value
        }];

        this.props.postBooks(book);

    }
    handleSelect(img){
        this.setState({
            img:'/images/'+img
        });
    }
    resetForm()
    {
        this.props.resetButton();
        findDOMNode(this.refs.title).value=''
        findDOMNode(this.refs.description).value=''
        findDOMNode(this.refs.price).value=''
        this.setState({img:''})
    }
    onDelete(){
        let bookId=findDOMNode(this.refs.delete).value;
        this.props.deleteBooks(bookId);
    }
    render(){
        const bookList=this.props.books.map(function (book) {
            return(
                <option key={book._id}>{book._id}</option>
            );
        })
        console.log(this.state.images);
        const imgList=this.state.images.map(function (imgArr,i) {
            return(
                <MenuItem key={i} eventKey={imgArr.name} onClick={this.handleSelect.bind(this,imgArr.name)}>{imgArr.name}</MenuItem>
            );
        },this)

        return(
            <Well>

                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                                <FormControl type="text" ref="images" value={this.state.img} />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an Image"
                                    bsStyle="primary">
                                    {imgList}
                                </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive />
                        </Panel>
                    </Col>


                    <Col xs={12} sm={6}>
                        <Panel>
                            <FormGroup controlId="title" validationState={this.props.validation}>
                                <ControlLabel>
                                    Title
                                </ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Book"
                                    ref="title"
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="description" validationState={this.props.validation}>
                                <ControlLabel>
                                    Description
                                </ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Description"
                                    ref="description"
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            <FormGroup controlId="price" validationState={this.props.validation}>
                                <ControlLabel >
                                    Price
                                </ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Price"
                                    ref="price"
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            <Button bsStyle={(!this.props.style)?"primary":(this.props.style)}
                                    onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
                            >
                                {(!this.props.msg)?"Save Book":(this.props.msg)}
                            </Button>
                        </Panel>

                        <Panel style={{margineTop:'25px'}}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Select a Book Id To Delete</ControlLabel>
                                <FormControl ref="delete" componentClass="select" placeholder="select">
                                    <option value="select">select</option>
                                    {bookList}
                                </FormControl>
                            </FormGroup>
                            <Button bsStyle="danger" onClick={this.onDelete.bind(this)}>Delete Book</Button>
                        </Panel>
                    </Col>
                </Row>




            </Well>
        );
    }
}

function mapStateToProps(state) {
    return{
        books:state.books.books,
        msg:state.books.msg,
        style:state.books.style,
        validation:state.books.validation
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({postBooks,deleteBooks,getBooks,resetButton},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps) (BooksForm);
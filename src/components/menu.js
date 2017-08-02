/**
 * Created by Developer39 on 7/28/2017.
 */
import React,{Component} from 'react';
import {Nav,NavItem,Navbar,Badge} from 'react-bootstrap';

class Menu extends Component
{
    render(){
        return(
            <div>
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">React-Bootstrap</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/about">About</NavItem>
                        <NavItem eventKey={2} href="/contacts">Contact</NavItem>

                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/admin">Admin</NavItem>
                        <NavItem eventKey={2} href="/cart">Your Cart
                            {(this.props.cartItemNumber>0)?(<Badge className="badge">{this.props.cartItemNumber}</Badge>):''}
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        );
    }
}

export default Menu;
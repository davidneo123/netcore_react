import React,{useState} from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import HeaderLink from './HeaderLink';
import messages from './messages';
import A from './A';
import Img from './Img';
import Banner from './banner.jpg';
import './styles.css'


export default () => {
  const [expanded, setExpanded] = useState(false);
    return(<Navbar expanded={expanded} fixed="top" sticky="top" position="relative" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <A href="https://www.google.com/es/" target="blank">
        <Img src={Banner} alt="Logo" />
      </A>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="nav justify-content-center">
            <HeaderLink to="/HomePage" onClick={() => setExpanded(false)} className="centeredText">
              <FormattedMessage {...messages.home} />
            </HeaderLink>
            <HeaderLink to="/" onClick={() => setExpanded(false)} className="centeredText">
              <FormattedMessage {...messages.students} />
            </HeaderLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
)};

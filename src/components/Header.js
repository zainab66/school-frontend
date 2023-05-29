import React from 'react';

export default function Header({ category, title }) {
  return (
    <div className=" mb-10">
      <p className="text-lg text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </p>
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout, reset } from '../reducers/authSlice';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import logo from '../logo.svg';
// import logoUser from '../logoUser.jpg';

// import {
//   Button,
//   Container,
//   Form,
//   Nav,
//   Navbar,
//   NavDropdown,
// } from 'react-bootstrap';

// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
// import SearchIcon from '@mui/icons-material/Search';
// import TextField from '@mui/material/TextField';

// export default function Header() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     dispatch(reset());
//     navigate('/');
//   };

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Navbar bg="light" expand="lg" fixed="top">
//       <Container fluid>
//         <Navbar.Brand href="/a">
//           {' '}
//           <img
//             src={logo}
//             width="80"
//             height="30"
//             className="d-inline-block align-top logo"
//             alt="logo"
//           />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll" className="justify-content-end">
//           <Nav
//             // className="mx-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             {/* <Nav.Link href="/login">Login</Nav.Link>
//             <Nav.Link href="/register">Register</Nav.Link> */}

//             <TextField
//               id="search-bar"
//               className="text"
//               onInput={(e) => {}}
//               label="Search"
//               variant="standard"
//               placeholder="Search..."
//               size="small"
//               InputLabelProps={{ style: { fontSize: 14 } }}
//             />
//             <IconButton type="submit" aria-label="search">
//               <SearchIcon style={{ color: '0096FF' }} />
//             </IconButton>

//             <React.Fragment>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   textAlign: 'center',
//                 }}
//               >
//                 <Typography sx={{ minWidth: 100, fontSize: 15 }}>
//                   Contact
//                 </Typography>
//                 <Typography sx={{ minWidth: 100, fontSize: 15 }}>
//                   Profile
//                 </Typography>
//                 <Tooltip title="Account settings">
//                   <IconButton
//                     onClick={handleClick}
//                     size="small"
//                     sx={{ ml: 2 }}
//                     aria-controls={open ? 'account-menu' : undefined}
//                     aria-haspopup="true"
//                     aria-expanded={open ? 'true' : undefined}
//                   >
//                     <Avatar
//                       sx={{ width: 32, height: 32 }}
//                       src={logoUser}
//                     ></Avatar>
//                   </IconButton>
//                 </Tooltip>
//               </Box>
//               <Menu
//                 anchorEl={anchorEl}
//                 id="account-menu"
//                 open={open}
//                 onClose={handleClose}
//                 onClick={handleClose}
//                 PaperProps={{
//                   elevation: 0,
//                   sx: {
//                     overflow: 'visible',
//                     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                     mt: 1.5,
//                     '& .MuiAvatar-root': {
//                       width: 32,
//                       height: 32,
//                       ml: -0.5,
//                       mr: 1,
//                     },
//                     '&:before': {
//                       content: '""',
//                       display: 'block',
//                       position: 'absolute',
//                       top: 0,
//                       right: 14,
//                       width: 10,
//                       height: 10,
//                       bgcolor: 'background.paper',
//                       transform: 'translateY(-50%) rotate(45deg)',
//                       zIndex: 0,
//                     },
//                   },
//                 }}
//                 transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                 anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//               >
//                 <MenuItem>
//                   <Avatar /> Profile
//                 </MenuItem>
//                 <MenuItem>
//                   <Avatar /> My account
//                 </MenuItem>
//                 <Divider />
//                 <MenuItem>
//                   <ListItemIcon>
//                     <PersonAdd fontSize="small" />
//                   </ListItemIcon>
//                   Add another account
//                 </MenuItem>
//                 <MenuItem>
//                   <ListItemIcon>
//                     <Settings fontSize="small" />
//                   </ListItemIcon>
//                   Settings
//                 </MenuItem>
//                 <MenuItem onClick={handleLogout}>
//                   <ListItemIcon>
//                     <Logout fontSize="small" />
//                   </ListItemIcon>
//                   Logout
//                 </MenuItem>
//               </Menu>
//             </React.Fragment>
//             {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
//               <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action4">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
//             </NavDropdown> */}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

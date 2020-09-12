/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import UserProfile from '../userProfile/UserProfile.jsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import MuiButton from '@material-ui/core/Button';
import menuItems from './utils/menuItems';
import bookOffIcon from './utils/icons/book_off.svg';
import dashboardOffIcon from './utils/icons/dashboard_off.svg';
import favoriteOffIcon from './utils/icons/favorite_off.svg';
import historyOffIcon from './utils/icons/history_off.svg';
import bookOnIcon from './utils/icons/book_on.svg';
import dashboardOnIcon from './utils/icons/dashboard_on.svg';
import favoriteOnIcon from './utils/icons/favorite_on.svg';
import historyOnIcon from './utils/icons/history_on.svg';
import exitIcon from './utils/icons/exit.svg';
import { withStyles } from '@material-ui/core';
import './MenuList.css';
import './MenuBurger.css';
import Axios from 'axios';
import { getToken, authContext } from './../../adalConfig';

const ListItemIcon = withStyles((theme) => ({
	root: {
		'min-width': '36px'
	}
}))(MuiListItemIcon);

const Button = withStyles((theme) => ({
	root: {
		borderRadius: '100px',
		height: '28px',
		width: '87%',
		display: 'table',
		margin: '0 auto'
	},
	label: {
		textTransform: 'none',
		'font-family': 'Inter',
		'font-weight': 600,
		'font-size': '12px',
		'line-height': '16px',

		color: '#050237'
	}
}))(MuiButton);

const fetchedMenuItems = menuItems;

class MenuList extends React.Component {
	constructor(props) {
		super(props);

		this.svgHandler = this.svgHandler.bind(this);
		this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
		this.handleMenuSubItemClick = this.handleMenuSubItemClick.bind(this);
		this.handleAccountBtnClick = this.handleAccountBtnClick.bind(this);
		this.handleLogout = this.handleLogout.bind(this);

		this.state = {
			selectedItem: menuItems[0],
			selectedSubItem: null,
			openSubmenu: false
		};
	}

	async componentDidMount() {
		const promise = await Axios.get(process.env.REACT_APP_API_URL + '/menu/categories', {
			headers: { Authorization: `Bearer ${getToken()}` }
		});
		const { data } = await promise;
		fetchedMenuItems[1].subItems = data;
	}

	svgHandler(title, isActive = false) {
		switch (title) {
			case 'dashboard':
				if (isActive) return dashboardOnIcon;
				return dashboardOffIcon;
			case 'library':
				if (isActive) return bookOnIcon;
				return bookOffIcon;
			case 'wishlist':
				if (isActive) return favoriteOnIcon;
				return favoriteOffIcon;
			case 'reservations':
				if (isActive) return historyOnIcon;
				return historyOffIcon;
			case 'logout':
				return exitIcon;
			default:
				return null;
		}
	}

	handleMenuItemClick(menuItem) {
		this.props.onFilter(1);
		if (menuItem.subItems && menuItem.subItems.length >= 1) {
			if (this.state.selectedItem === fetchedMenuItems[1] && this.state.openSubmenu) {
				this.setState({
					openSubmenu: false
				});
			} else {
				this.setState({
					openSubmenu: true
				});
			}
			this.setState({
				selectedItem: menuItem,
				selectedSubItem: menuItem.subItems[0]
			});
		} else {
			this.setState({
				selectedItem: menuItem
			});
		}
	}

	handleMenuSubItemClick(subItem) {
		this.setState({
			selectedSubItem: subItem
		});
	}

	handleAccountBtnClick() {
		this.setState({
			selectedItem: null
		});
	}

	handleClick = () => {
		const menu = document.querySelector('.menu');
		menu.classList.toggle('animated-menu-open');
	};

	handleLogout() {
		authContext.logOut();
	}

	render() {
		return (
			<div className="menu-wrapper">
				<input onClick={this.handleClick} type="checkbox" className="burger-toggler" />
				<div className="burger">
					<div />
				</div>
				<div className="menu">
					<div>
						<div className="menu-top">
							<UserProfile user={this.props.user} />
							<List>
								{menuItems.map((menuItem) => {
									let listItem, listSubItems;

									listItem = (
										<Link to={menuItem.redirect_path} id="menu-links">
											<ListItem
												button
												onClick={(e) => {
													this.handleMenuItemClick(menuItem);
												}}
												key={menuItem.title}
											>
												<ListItemIcon>
													<img
														src={this.svgHandler(
															menuItem.title,
															menuItem === this.state.selectedItem
														)}
														alt={menuItem.title}
													/>
												</ListItemIcon>
												<ListItemText
													disableTypography
													primary={menuItem.text}
													className={`list_item-text ${menuItem === this.state.selectedItem
														? 'list_item-text-active'
														: ''}`}
												/>
											</ListItem>
										</Link>
									);

									if (menuItem.subItems != null) {
										listSubItems = (
											<Collapse
												in={menuItem === this.state.selectedItem && this.state.openSubmenu}
												timeout="auto"
												unmountOnExit
											>
												<List component="div" disablePadding>
													{menuItem.subItems.map((subItem, index) => (
														<Link
															to={subItem.redirect_path}
															id="menu-links"
															key={subItem.text}
														>
															<ListItem
																button
																onClick={() => {
																	this.handleMenuSubItemClick(subItem);
																	this.props.onFilter(subItem.id);
																}}
															>
																<ListItemText
																	disableTypography
																	primary={subItem.text}
																	className={`list_subitem-text ${subItem ===
																	this.state.selectedSubItem
																		? 'list_item-text-active'
																		: ''}`}
																/>
															</ListItem>
														</Link>
													))}
												</List>
											</Collapse>
										);
									}

									return (
										<div className="list_item-wrapper" key={`${menuItem.title}-listItem-wrapper`}>
											<div
												className={`list_item ${menuItem === this.state.selectedItem
													? 'list_item-active'
													: null}`}
											>
												<React.Fragment key={menuItem.title}>{listItem}</React.Fragment>
												<React.Fragment key={`${menuItem.title}-subitems`}>
													{listSubItems}
												</React.Fragment>
											</div>
											{menuItem === this.state.selectedItem ? (
												<div id="list_item-active_line" />
											) : null}
										</div>
									);
								})}
							</List>
						</div>

						<div className="menu-bottom">
							<div className="menu-bottom-manage_account-button">
								<Link id="link-to-profile" to="/profile">
									<Button variant="outlined" onClick={this.handleAccountBtnClick}>
										Manage my account
									</Button>
								</Link>
							</div>

							<div className="menu-bottom-logout-button">
								<ListItem button onClick={this.handleLogout}>
									<ListItemIcon>
										<img src={this.svgHandler('logout')} alt="log out" />
									</ListItemIcon>
									<ListItemText disableTypography primary="Log out" className="list_item-text" />
								</ListItem>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MenuList;

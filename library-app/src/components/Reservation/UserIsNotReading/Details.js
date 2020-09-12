import React from 'react';
import { Button, RadioGroup } from '@material-ui/core';
import OfficeDetails from './OfficeDetails.js';
import EnterWaitlist from '../../modals/enterWaitlistModal.jsx';
import CheckOut from '../../CheckOut/checkOut.jsx';
import axios from 'axios';
import { getToken } from '../../../adalConfig';

const styles = {
	Main: {},
	Header: {
		color: '#050237',
		marginTop: '0.5rem',
		marginBottom: '0.5rem',
		fontStyle: 'normal',
		fontWeight: 600,
		fontSize: '1rem'
	},
	Button: {
		marginTop: '0.25rem',
		marginBottom: '0.25rem',
		maxWidth: '14.0625rem',
		minWidth: '10rem',
		maxHeight: '2.5rem',
		width: '100%',
		minHeight: '2rem',
		borderRradius: 3,
		textTransform: 'none',
		fontWeight: 600
	}
};

class Details extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			kaunasRadioValue: 'Kaunas',
			vilniusRadioValue: 'Vilnius',
			selected: 'Kaunas', //the default radio choice

			isKaunasBackgroundWhite: true, //should make a proper method to not need to manualy change these
			isVilniusBackgroundWhite: false,
			openCheckOut: false,
			fetchedData: []
		};
	}

	async componentDidMount() {
		const fetchedData = await this.fetchReservationDetails(this.props.id);
		this.setState({ fetchedData });
	}
	fetchReservationDetails = async (id) => {
		let fetchedData = [];
		const { data: library } = await axios.get(process.env.REACT_APP_API_URL + `/library/${id}`, {
			headers: { Authorization: `Bearer ${getToken()}` }
		});
		if (library.length > 1) {
			for (const lib of library) {
				const { data: details } = await axios.get(process.env.REACT_APP_API_URL + `/library/count/${lib.id}`, {
					headers: { Authorization: `Bearer ${getToken()}` }
				});
				fetchedData.push(details);
			}
		} else if (library.length === 1) {
			const { data } = await axios.get(process.env.REACT_APP_API_URL + `/library/count/${library[0].id}`, {
				headers: { Authorization: `Bearer ${getToken()}` }
			});
			fetchedData.push(data);
		}
		return fetchedData;
	};
	handleChange = (event) => {
		this.setState({
			selected: event.target.value
		});
		if (this.state.selected === this.state.kaunasRadioValue) {
			this.setState({
				isKaunasBackgroundWhite: false,
				isVilniusBackgroundWhite: true
			});
		} else if (this.state.selected === this.state.vilniusRadioValue) {
			this.setState({
				isVilniusBackgroundWhite: false,
				isKaunasBackgroundWhite: true
			});
		}
	};

	setOpenCheckOut = (event) => {
		this.setState({
			openCheckOut: true
		});
	};
	handleRadio = (office) => {
		return office === 'Kaunas' ? this.state.kaunasRadioValue : this.state.vilniusRadioValue;
	};
	handleOfficeBackground = (office) => {
		return office === 'Kaunas' ? this.state.isKaunasBackgroundWhite : this.state.isVilniusBackgroundWhite;
	};
	handleOffices = () => {
		return this.state.fetchedData.length > 1 ? (
			this.state.fetchedData.map((data) => (
				<OfficeDetails
					key={data.id}
					officeName={data.officeName}
					bookQuantity={data.freeBookCount}
					officeRadio={this.handleRadio(data.officeName)}
					isOfficeBackgroundWhite={this.handleOfficeBackground(data.officeName)}
					address={data.officeAddress} //don't know how to add newlines
					onCantFindModal={this.props.onCantFindModal}
				/>
			))
		) : (
			<OfficeDetails
				officeName={this.state.fetchedData[0].officeName}
				bookQuantity={this.state.fetchedData[0].freeBookCount}
				officeRadio={this.handleRadio(this.state.fetchedData[0].officeName)}
				isOfficeBackgroundWhite={this.handleOfficeBackground(this.state.fetchedData[0].officeName)}
				address={this.state.fetchedData[0].officeAddress} //don't know how to add newlines
				onCantFindModal={this.props.onCantFindModal}
			/>
		);
	};
	handleRenderCheck = () => {
		return this.state.fetchedData.length > 0 ? (
			<div style={styles.Main}>
				<span style={styles.Header}>Reserve at</span>
				<RadioGroup value={this.state.selected} onChange={this.handleChange}>
					{this.handleOffices()}
				</RadioGroup>
				<div>{this.handleButtonRender()}</div>
				<CheckOut
					office={this.props.office}
					bookCheckOut={this.props.book}
					openCheckOut={this.state.openCheckOut}
					onClose={() =>
						this.setState({
							openCheckOut: false
						})}
					id={this.props.id}
				/>
			</div>
		) : (
			<div />
		);
	};
	handleButtonRender = () => {
		let selected = this.state.fetchedData.filter((data) => data.officeName === this.state.selected);
		if (selected.length === 0) {
			selected = this.state.fetchedData[0];
			return selected.freeBookCount === 0 ? (
				<EnterWaitlist book={this.props.book} />
			) : (
				<Button style={styles.Button} variant="contained" color="primary" onClick={this.setOpenCheckOut}>
					Check out
				</Button>
			);
		}
		return selected[0].freeBookCount > 0 ? (
			<Button style={styles.Button} variant="contained" color="primary" onClick={this.setOpenCheckOut}>
				Check out
			</Button>
		) : (
			<EnterWaitlist book={this.props.book} />
		);
	};
	render() {
		return this.handleRenderCheck();
	}
}

export default Details;

import React from 'react';
import { Link, Box, Radio } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		secondary: {
			main: '#4568FB'
		}
	},
});

const styles = {
	Box: {
		marginTop: '0.5rem',
		marginBottom: '0.5rem',
		borderRadius: '0.375rem',
		border: '1px solid #DCDCDC',
		boxSizing: 'border-box',
		maxWidth: '14.0625rem',
		minHeight: '9.875rem'
	},
	Text: {
		color: '#050237',
		fontSize: '0.875rem',
		fontWeight: 600,
		marginLeft: 40,
		marginRight: '1rem',
		marginBottom: '1rem'
	},
	SvgIcon: {
		position: 'absolute',
		width: 24,
		height: 24,
		marginTop: 8,
		marginLeft: 4,
		viewBox: '0 0 24 24',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg'
	},
	Address: {
		fontSize: '0.875rem',
		color: '#050237',
		opacity: 0.5,
		marginLeft: 40,
		marginRight: '1rem',
		marginBottom: '1rem'
	},

};

class OfficeDetails extends React.Component {
	render() {

		let backgroundColor;
		if (this.props.isOfficeBackgroundWhite === true) {
			backgroundColor = '';
		} else {
			backgroundColor = '#DCDCDC';
		}

		if (this.props.bookQuantity > 0)
			return (
				<Box style={styles.Box} bgcolor={backgroundColor}>
					<ThemeProvider theme={theme}>
						<Radio value={this.props.officeRadio} />
					</ThemeProvider>
						<svg id="radio-btn-office" style={styles.SvgIcon}>
							<path
								d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z"
								fill="black"
							/>
						</svg>
						<div style={styles.Text}>
							<div>{this.props.officeName}</div>
							<div style={{ color: '#3BA77A' }}>{this.props.bookQuantity} available</div>
						</div>
						<div style={styles.Address}>{this.props.address}</div>
						<div style={styles.Text}>
							<Link
								component="button"
								onClick={this.props.onCantFindModal}
								style={{ color: '#4568FB', fontWeight: 600 }}
							>
								Can't find a copy?
							</Link>
						</div>
					</Box>
		
			);
		else
			return (
					<Box style={styles.Box} bgcolor={backgroundColor}>
						<ThemeProvider theme={theme}>
							<Radio value={this.props.officeRadio} />
						</ThemeProvider>
							<svg style={styles.SvgIcon}>
								<path
									d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z"
									fill="black"
								/>
							</svg>
							<div style={styles.Text}>
								<div>{this.props.officeName}</div>
								<div style={{ color: '#EE3D57' }}>Currently unavailable</div>
							</div>
							<div style={styles.Address}>{this.props.address}</div>
					</Box>
			);
	}
}

export default OfficeDetails;

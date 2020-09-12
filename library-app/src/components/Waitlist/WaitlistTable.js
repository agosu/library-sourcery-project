import React from 'react';
import Table from '../../components/Table/table';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import '../../containers/Active_reservation/Active_reservation.css';

const Styles = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction:column;
  table {

    tr {
        td:nth-child(1) {
        opacity: 1.0;
        img{
          border-radius: 50%;
        }
        }
        td:nth-child(2)
        {
          font-family: 'Inter', sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          opacity: 1.0; 
        }
      }
      
      td {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        /* identical to box height, or 143% */


        /* Main type */

        color: #050237;
        opacity: 0.5;
      }
    }

    th {
      font-family: 'Inter', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      /* identical to box height, or 167% */
      
      text-transform: uppercase;
      
      /* Main type */
      
      color: #050237;
      opacity: 0.3;
    }
  }
.ActiveReservation{
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: left;


}

`;

export default function WaitlistTable({ data }) {
	const columns = React.useMemo(
		() => [
			{
				Header: '',
				accessor: 'image',
				id: 'images',
				Cell: ({ row }) => <img height={34} width={34} src={row.original.image} />
			},
			{
				id: 'Employee',
				Header: 'Employee',
				accessor: 'name'
			},
			{
				Header: 'Office',
				accessor: 'office'
			},
			{
				Header: 'Requested On',
				accessor: 'bookedFrom'
			},
			{
				Header: '',
				accessor: 'placeholder'
			}
		],
		[]
	);
	const result = React.useMemo(() => data, []);
	return (
		<div id="active-reservations-wrapper">
			<Styles>
				<header className="ActiveReservation">Waitlist</header>

				<Table columns={columns} data={result} />
			</Styles>
		</div>
	);
}

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IEvent } from '../models/IEvent';
import { theme } from '../theme';
import { IEventColumn } from '../models/IEventColumn';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    tableCellHeadline: {
        background: theme.palette.background.paper,
        borderBottom: "2px solid #3D4752",
        height: "25px"
    },
    tableCell: {
        borderBottom: "2px solid #3D4752",
        height: "42px"
    },
    tableContainer: {
        maxHeight: "440px",
        minHeight: "440px",
    },
    firstCell: {
        paddingLeft: "5%",
    }
});

const EventsTable = (props: IEventsTableProps) => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.tableContainer}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {props.columns.map((column, index) => (
                            <TableCell
                                className={`${classes.tableCellHeadline} ${index === 0 ? classes.firstCell : ""}`}
                                key={column.id}
                                sx={{ width: column.width }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows
                        .map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                    {props.columns.map((column, index) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} className={`${classes.tableCell} ${index === 0 ? classes.firstCell : ""}`} sx={{ width: column.width }}
                                            >
                                                {column.format && column.format(value)}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
interface IEventsTableProps {
    rows: Array<IEvent>;
    columns: readonly IEventColumn[];
}

export default EventsTable;
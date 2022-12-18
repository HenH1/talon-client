import React from 'react';
import Paper from '@mui/material/Paper';
import { IEvent } from '../models/IEvent';
import { IUser } from '../models/IUser';
import { theme } from '../theme';
import EventTypeSelect from './EventTypeSelect';
import dateFormat from "dateformat";
import { Chip, Container, Typography } from '@mui/material';
import { baseURL } from '../utils/Consts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { convertEventTypeStringForUI, convertEventTypeStringForReq } from '../utils/Common';
import { IEventColumn } from '../models/IEventColumn';
import EventsTable from './EventsTable';
import { createUseStyles } from 'react-jss';
import { Severity } from "../utils/Consts";

const useStyles = createUseStyles({
    headlineText: {
        fontSize: "17px",
        paddingBottom: "26px"
    },
    paperContainer: {
        overflow: 'hidden',
        boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.7)",
        borderRadius: "8px",
        width: "100%",
        height: "fit-content",
        marginTop: "2.87%"
    },
    headlineContainer: {
        textAlign: "left",
        padding: "17px 0 15px 16px",
        margin: 0,
    },
    severityColorLow: {
        backgroundColor: "#3A90E5"
    },
    severityColorMedium: {
        backgroundColor: "#FFB547"
    },
    severityColorHigh: {
        backgroundColor: "#F06161"
    },
    userMailCell: {
        color: theme.palette.text.secondary,
        fontSize: "13px"
    },
    dateCell: {
        fontSize: "13px"
    },
    severityCell: {
        fontSize: "11px",
        borderRadius: "8px"
    }
});

const EventsContainer = () => {
    const classes = useStyles();
    const firstPage = 0;
    const [page, setPage] = useState(firstPage);
    const [rowsCount, setRowsCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<Array<IEvent>>([]);
    const [selectedEventTypesName, setSelectedEventTypesName] = useState<Array<string>>([]);

    const columns: readonly IEventColumn[] = [
        {
            id: 'eventType', label: 'Event Type', width: "25%",
            format: (eventType) => convertEventTypeStringForUI(eventType)
        },
        {
            id: 'severity', label: 'Severity', width: "20%",
            format: (severity) => <Chip className={`${classes.severityCell} ${getColorForSeverity(severity)}`} label={severity.toUpperCase()} />
        },
        {
            id: 'user', label: 'User', width: "25%",
            format: (user: IUser) => <div>{user.name}<div className={classes.userMailCell}>{user.email}</div></div>
        },
        {
            id: 'time', label: 'Date', width: "25%",
            format: (timeStamp) => {
                const date = new Date(timeStamp);
                return (<div className={classes.dateCell}> {dateFormat(date, "yyyy/mm/dd | hh:MM:ss")}</div>);
            }
        },
    ];

    const getColorForSeverity = (severity: string) => {
        switch (severity) {
            case Severity.LOW:
                return classes.severityColorLow;
            case Severity.MEDIUM:
                return classes.severityColorMedium;
            case Severity.HIGH:
                return classes.severityColorHigh;
        }
    }

    const getData = async (url: string) => {
        const response = await axios.get(baseURL + url);
        setRows(response.data.data);
        setRowsCount(response.data.count);
    };

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (amonutRowsPerPage: number) => {
        setRowsPerPage(amonutRowsPerPage);
        setPage(firstPage);
    };

    const handleFilterChange = (selectedEventTypesName: Array<string>) => {
        setSelectedEventTypesName(selectedEventTypesName);
        setPage(firstPage);
    }

    useEffect(() => {
        const convertedString = selectedEventTypesName.map((val: string) => convertEventTypeStringForReq(val));
        const url = `/events/page/${[page]}/amount/${rowsPerPage}${selectedEventTypesName.length > 0 ? `?eventTypes=${convertedString}` : ``}`;
        getData(url);
    }, [page, rowsPerPage, selectedEventTypesName]);

    return (
        <Paper className={classes.paperContainer}>
            <Container className={classes.headlineContainer}>
                <Typography className={classes.headlineText}>Events Table</Typography>
                <EventTypeSelect selectedEventTypesName={selectedEventTypesName} handleFilterChange={handleFilterChange} />
            </Container>
            <EventsTable rows={rows} columns={columns} />
            <Pagination
                rowsCount={rowsCount}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
export default EventsContainer;
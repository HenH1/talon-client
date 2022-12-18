import React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { createUseStyles } from 'react-jss';
import { theme } from '../theme';
import { useEffect, useState } from 'react';
import { baseURL } from '../utils/Consts';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import { convertEventTypeStringForUI } from '../utils/Common';

const useStyles = createUseStyles({
    select: {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "1px solid #FFFFFF3B"
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: "1px solid #FFFFFF3B",
            borderRadius: "8px"

        },
        '& .MuiSvgIcon-root': {
            color: theme.palette.text.secondary
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            border: "1px solid #FFFFFF3B"
        },
        '& .MuiOutlinedInput-input': {
            overflowY: "auto",
            maxHeight: "30px",
            height: "30px",
            margin: "20px 0 11px 14px",
            padding: 0,
        }
    },
    label: {
        '&.Mui-focused': {
            color: theme.palette.text.secondary
        }
    },
    form: {
        width: "29.85%",
        height: "61px",
        maxHeight: "61px"
    },
    chipsBox: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px'
    },
    chip: {
        background: "#FFFFFF29"
    }
});

const EventTypeSelect = (props: IEventTypeSelectProps) => {
    const [eventTypesName, setEventTypesName] = useState<Array<string>>([]);
    const classes = useStyles();

    const getEventTypes = async (url: string) => {
        const response = await axios.get(baseURL + url);
        const arrNewStrEvents = response.data.map((val: string) => convertEventTypeStringForUI(val));
        setEventTypesName(arrNewStrEvents);
    };
    const handleChange = (event: SelectChangeEvent<typeof eventTypesName>) => {
        const selected = event.target.value;
        const updatedSelected = typeof selected === 'string' ? selected.split(',') : selected;
        props.handleFilterChange(updatedSelected);
    };

    const handleDelete = (selectedVal: string) => () => {
        const updatedSelected = props.selectedEventTypesName.filter(name => name !== selectedVal);
        props.handleFilterChange(updatedSelected);
    };

    useEffect(() => {
        getEventTypes(`/getEventTypes`);
    }, []);

    return (
        <FormControl className={classes.form}>
            <InputLabel className={classes.label} id="filter-event-type-label">Event Type Filter</InputLabel>
            <Select
                labelId="filter-event-type-label"
                id="filter-event-type"
                multiple
                value={props.selectedEventTypesName}
                onChange={handleChange}
                className={classes.select}
                input={<OutlinedInput id="filter-event-type" label="Event Type Filter" />}
                renderValue={(selected) => (
                    <Box className={classes.chipsBox} >
                        {selected.map((value) => (
                            <Chip key={value}
                                label={value}
                                size="small"
                                className={classes.chip}
                                onDelete={handleDelete(value)}
                                deleteIcon={
                                    <CancelIcon
                                        onMouseDown={(event: React.MouseEvent) => event.stopPropagation()}
                                    />
                                } />
                        ))}
                    </Box>
                )}
            >
                {eventTypesName.map((eventType) => (
                    <MenuItem
                        key={eventType}
                        value={eventType}
                    >
                        {eventType}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

interface IEventTypeSelectProps {
    selectedEventTypesName: Array<string>;
    handleFilterChange: (selectedEventTypesName: Array<string>) => void;
}


export default EventTypeSelect;
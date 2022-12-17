import React from 'react';
import { TablePagination } from "@mui/material";
import { theme } from "../theme";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    paginationContainer: {
        '& .MuiSelect-icon': {
            color: theme.palette.text.secondary
        },
        '& .MuiIconButton-root.Mui-disabled': {
            color: theme.palette.text.primary
        }
    }
});

const Pagination = (props: IPaginationProps) => {
    const classes = useStyles();
    const paginationOption = [5, 10, 25]; // Can be also prop for generic purposes
    const onPageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => props.handleChangePage(page);

    const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => props.handleChangeRowsPerPage(+event.target.value);

    return (
        <TablePagination
            className={classes.paginationContainer}
            rowsPerPageOptions={paginationOption}
            component="div"
            count={props.rowsCount}
            rowsPerPage={props.rowsPerPage}
            page={props.page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
        />

    );
}

interface IPaginationProps {
    rowsCount: number;
    page: number;
    rowsPerPage: number;
    handleChangeRowsPerPage: (amonutRowsPerPage: number) => void;
    handleChangePage: (page: number) => void;
}

export default Pagination;
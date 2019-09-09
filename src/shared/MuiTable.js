import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        border: '1px solid black',
        borderRadius: 'unset'
    },
    tableWrapper: {
        maxHeight: 400,
        overflow: 'auto',
    },
});

CustomMuiTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        field: PropTypes.string,
        align: PropTypes.string,
        minWidth: PropTypes.string,
        maxWidth: PropTypes.string,
        format: PropTypes.func
    })),
    rows: PropTypes.array.isRequired,
    displayHeader: PropTypes.bool,
    scrollable: PropTypes.bool,
    hover: PropTypes.bool,
    pagination: PropTypes.bool
};

CustomMuiTable.defaultProps = {
    displayHeader: true
};

export default function CustomMuiTable(props) {
    const { rows, columns, hover, pagination } = props;
    const classes = useStyles();
    const numOfRecords = pagination ? 5 : rows.length;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(numOfRecords);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    return (
        <Paper className={classes.root}>
            <div className={props.scrollable ? classes.tableWrapper : ''}>
                <Table stickyHeader>
                    {props.displayHeader ? 
                    (<TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.field}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                >
                                    {column.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>) : null}
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                            return (
                                <TableRow hover={hover} role="checkbox" tabIndex={-1} key={i}>
                                    {columns.map(column => {
                                        const value = row[column.field];
                                        return (
                                            <TableCell key={column.field} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
            {pagination ? (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            ) : null}

        </Paper>
    );
}

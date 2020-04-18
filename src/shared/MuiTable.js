import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
    },
    tableBodyScroll: {
        display: 'block',
        maxHeight: 350,
        overflow: 'auto',
        border: '2px solid lightgrey',
        borderRadius: '2px',
    },
    tableBody: {
        display: 'block',
        border: '2px solid lightgrey',
        borderRadius: '2px',
    },
    tableCellHead: {
        fontSize: '0.75rem',
        backgroundColor: '#fff',
        textTransform: 'uppercase',
        borderBottom: 'hidden'
    },
    tableHeadScroll: {
        display: 'table',
        width: '99%',
        tableLayout: 'fixed',
    },
    tableHead: {
        display: 'table',
        width: '100%',
        tableLayout: 'fixed',
    },
    tableRow: {
        display: 'table',
        width: '100%',
        tableLayout: 'fixed',
    },
    tablePagination: {
        borderBottom: '2px solid lightgrey',
        borderRight: '2px solid lightgrey',
        borderLeft: '2px solid lightgrey',
        fontSize: '0.75rem'
    },
    actionBtnMargin: {
        marginRight: 10,
    },
});

CustomMuiTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        field: PropTypes.string,
        align: PropTypes.string,
        minWidth: PropTypes.string,
        maxWidth: PropTypes.string,
        format: PropTypes.func,
        actions: PropTypes.object
        // PropTypes.objectOf(PropTypes.shape({
        //     edit: PropTypes.bool,
        //     delete: PropTypes.bool
        // }))
    })),
    rows: PropTypes.array.isRequired,
    displayHeader: PropTypes.bool,
    scrollable: PropTypes.bool,
    hover: PropTypes.bool,
    pagination: PropTypes.bool,
    hasActionsAccess: PropTypes.bool.isRequired,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func
};

CustomMuiTable.defaultProps = {
    displayHeader: true
};

export default function CustomMuiTable(props) {
    const { rows, displayHeader, columns, hover, scrollable, pagination, hasActionsAccess, onEditClick, onDeleteClick } = props;
    const classes = useStyles();
    const numOfRecords = pagination ? 5 : rows.length;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(numOfRecords);
    if (!hasActionsAccess) {
        columns.splice(columns.findIndex(x => x.name === 'Actions'));
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    return (
        <Paper className={classes.root}>
            <Table stickyHeader>
                {displayHeader ?
                    (<TableHead className={scrollable ? classes.tableHeadScroll : classes.tableHead}>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    className={classes.tableCellHead}
                                    key={column.field}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                                >
                                    {column.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>) : null}
                <TableBody className={scrollable ? classes.tableBodyScroll : classes.tableBody}>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                        return (
                            <TableRow className={classes.tableRow} hover={hover} role="checkbox" tabIndex={-1} key={i}>
                                {columns.map(column => {
                                    let returnElement = '';
                                    if (column.actions) {
                                        if (column.actions.edit && column.actions.delete) {
                                            returnElement = (
                                                <TableCell key={column.field} align={column.align}>
                                                    <Button variant="outlined" color="primary" size="small" className={classes.actionBtnMargin}
                                                        onClick={() => onEditClick(row.id)}>Edit</Button>
                                                    <Button variant="outlined" color="secondary" size="small"
                                                        onClick={() => onDeleteClick(row.id)}>Delete</Button>
                                                </TableCell>);
                                        } else if (column.actions.edit) {
                                            returnElement = (
                                                <TableCell key={column.field} align={column.align}>
                                                    <Button variant="outlined" color="primary" size="small"
                                                        onClick={() => onEditClick(row.id)}>Edit</Button>
                                                </TableCell>);
                                        } else if (column.actions.delete) {
                                            returnElement = (
                                                <TableCell key={column.field} align={column.align}>
                                                    <Button variant="outlined" color="secondary" size="small"
                                                        onClick={() => onDeleteClick(row.id)}>Delete</Button>
                                                </TableCell>);
                                        }
                                    }
                                    else {
                                        const value = row[column.field];
                                        returnElement = (
                                            <TableCell key={column.field} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    }
                                    return returnElement;
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {pagination ? (
                <TablePagination
                    className={classes.tablePagination}
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

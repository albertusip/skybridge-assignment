import React, { memo, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import '../../style/UserList.css';

const formatDate = (s) => {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octtober', 'November', 'December'];
    s = s.replace(/-/g, '/');
    const d = new Date(s);

    return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}

const UserListApp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState({});
    const [tableOptions, setTableOptions] = useState({
        pageCount: 0,
        currentPage: 0,
        paginate: 10,
        page: 1,
        search: ''
    });

    const fetchData = useCallback(async (page = {}) => {
        try {
            setIsLoading(true);
            const result = await axios.post(' https://api-hangman.jpcc.my.id/api/user/filtered', {
                paginate: tableOptions.paginate,
                page: (page.selected + 1) || 1 ,
                search: tableOptions.search
            });
            setUsers(result.data);
            setTableOptions({ ...tableOptions, pageCount: result.last_page, currentPage: result.current_page});
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
        // eslint-disable-next-line
    }, [tableOptions.pageCount, tableOptions.currentPage, tableOptions.paginate, tableOptions.search])

    const handleSearchInput = () => (event) => {
        setTableOptions({ ...tableOptions, search: event.target.value });
    }

    const handleRowInput = () => (event) => {
        setTableOptions({ ...tableOptions, paginate: event.target.value });
    }

    useEffect(() => {
        fetchData();
    }, [tableOptions.search, tableOptions.paginate, fetchData]);

    return (
        <>
            <Row >
                <Col xs={12}>
                    <h5 className="section-title text-left mt-3 mb-0">
                        List of All Users
                    </h5>
                    <br></br>
                </Col>
                <Col
                    xs={12}
                    className="my-3"
                >
                    <Row>
                        <Col
                            xs={12}
                            sm={5}
                            className="my-1 my-sm-0"
                        >
                            <InputGroup className="mb-3">
                                <FormControl
                                    value={tableOptions.search}
                                    onChange={handleSearchInput()}
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="search"
                                />
                            </InputGroup>
                        </Col>
                        <Col
                            xs={12}
                            sm={7}
                            className="text-right my-1 my-sm-0"
                        >
                            <div className="d-inline-block mr-2">
                                <small>Row per page:</small>
                            </div>
                            <Form.Group className="d-inline-block">
                                <Form.Control
                                    value={tableOptions.pagination}
                                    onChange={handleRowInput()}
                                    disabled={isLoading}
                                    as="select"
                                    placeholder="Search User">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    {
                        isLoading ? 
                            <div className="w-100 text-center my-5">
                                <Spinner animation="grow" />
                            </div>
                            :
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Birthday</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.data && users.data.map((item, index) =>
                                            <tr key={`user-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{item.fullname}</td>
                                                <td>{`${item.birthplace}, ${formatDate(item.birthdate)}`}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                    }
                    <div className="d-flex">
                        <ReactPaginate
                            previousLabel="Prev"
                            nextLabel="Next"
                            breakLabel="..."
                            breakClassName="break-me"
                            pageCount={tableOptions.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={2}
                            onPageChange={fetchData}
                            initialPage={tableOptions.currentPage}
                            containerClassName="pagination"
                            subContainerClassName="pages pagination"
                            activeClassName="active" />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default memo(UserListApp);
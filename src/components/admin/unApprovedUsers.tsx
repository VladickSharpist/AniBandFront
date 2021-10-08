import { AxiosError } from "axios";
import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { api } from "../../api/api";
import { Table } from "../Table";
import { UnApprovedUser } from "./unApprovedUser";

function UnApprovedUsers() {
    
    const columns = React.useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'id',
            },
            {
                Header: 'Username',
                accessor: 'userName',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Date of registration',
                accessor: 'registrationDate',
            }
        ], [])

    const { data, isError, isLoading } = useQuery(
        'unApprovedUsers', 
        api.account.getUnApprovedUsers,)


    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError){
        return <div>Error!</div>
    }

    return(
        <Table columns={columns} data={data?.data} />
        // <div>{
        //     data?.data.map((user) => (
        //             <UnApprovedUser key = {user.id} {...user}/>
        //         )
        //     )
        // }</div>
    )
}


export { UnApprovedUsers }
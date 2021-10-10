import { PropsWithChildren, useEffect } from "react";
import styled from "styled-components";
import { useAuthState } from "../hooks/useAuthState"
import LogButton from "./LogButton";

function Layout(props: PropsWithChildren<unknown>){

    const user = useAuthState();
    
    useEffect(()=>{

    },[user.isAuthenficated])

    return (
    <LayoutWrapper>
        Layout 
        <LogButton/>
        {props.children}
    </LayoutWrapper>)
}

const LayoutWrapper = styled.div``;

export {Layout}
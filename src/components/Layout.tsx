import { PropsWithChildren } from "react";
import styled from "styled-components";
import { useAuthState } from "../hooks/useAuthState"

function Layout(props: PropsWithChildren<unknown>){

    const user = useAuthState();
    
    return (
    <LayoutWrapper>
        {user.isAuthenficated ? 'Authorized Layout': 'Layout'}
        {props.children}
    </LayoutWrapper>)
}

const LayoutWrapper = styled.div``;

export {Layout}
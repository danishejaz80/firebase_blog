import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'

const GlobalStyle = createGlobalStyle({
    "#root": {
        height: "100%"
    },
    "body": {
        background: "#F7F9FC"
    }
})

const Root = styled.div`
    display: flex;
    min-height: 100vh;
`

const AppContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const MainContent = styled.div`
    flex: 1;
    background: #fff;

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
        flex: none;
    }

    .MuiPaper-root .MuiPaper-root {
        box-shadow: none;
    }
`

function Layout(props) {
    return (
        <Root>
            <GlobalStyle />
            <AppContent>
                <Header {...props} />
                <MainContent className="px-3 py-2">
                    {props.children}
                </MainContent>
                <Footer {...props} />
            </AppContent>
        </Root>
    )
}

export default Layout

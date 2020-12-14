import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'

import { publicR as publicRoutes } from './index'

import { connect } from 'react-redux'
import AppLayout from '../layouts/Layout'
import Page404 from '../pages/auth/Page404'

const RedirectToSignIn = () => {
    return (
        <Route
            render={(props) => (
                <Redirect
                    to={{
                        pathname: '/sign-in',
                        state: {
                            from: props.location,
                        },
                    }}
                />
            )}
        />
    )
}

const RestrictedRoute = ({ component: Component, authUser, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                authUser ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/sign-in',
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    )
            }
        />
    )
}
const childRoutes = (Layout, routes) =>
    routes.map(({ children, path, component: Component }, index) =>
        children ? (
            // Route item with children
            children.map(({ path, component: Component }, index) => (
                <Route
                    key={index}
                    path={path}
                    exact
                    render={(props) => (
                        <Layout {...props}>
                            <Component {...props} />
                        </Layout>
                    )}
                />
            ))
        ) : (
                // Route item without children
                <Route
                    key={index}
                    path={path}
                    exact
                    render={(props) => (
                        <Layout {...props}>
                            <Component {...props} />
                        </Layout>
                    )}
                />
            )
    )

const Routes = ({ authUser }) => (
    <Router>
        <Switch>
            {publicRoutes.map(({ path, component: Component }, index) => {
                return (
                    <Route
                        key={index}
                        path={path}
                        exact
                        render={(props) => (
                            <AppLayout {...props}>
                                <Component {...props} />
                            </AppLayout>
                        )}
                    />
                )
            })}

            {/* {
                authUser.user ?
                    < RestrictedRoute
                        component={() =>
                            childRoutes(DashboardLayout, dashboardRoutes)
                        }
                        authUser={authUser}
                    />
                    :
                    <RedirectToSignIn />
            } */}

            <Route
                render={(props) => (
                    <AppLayout {...props}>
                        <Page404 />
                    </AppLayout>
                )}
            />
        </Switch>
    </Router>
)
const mapStateToProps = ({ auth }, ownProps) => {
    const { authUser } = auth
    return { authUser }
}
export default connect(mapStateToProps, {})(Routes)

import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({
  component: Component,
  connect,
  isLoggedIn,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn && connect ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

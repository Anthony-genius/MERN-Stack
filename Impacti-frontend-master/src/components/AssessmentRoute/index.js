import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function AssessmentRoute({
  component: Component,
  auth,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        auth && auth.user && !auth.user.emailConfirmed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/dashboard',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

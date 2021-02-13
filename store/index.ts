import { getAccessorType } from 'typed-vuex'

import * as login from './login'
import * as events from './events'

export type RootState = ReturnType<
  typeof login.state | typeof events.state
>

export const accessorType = getAccessorType({
  modules: {
    login,
    events
  },
})
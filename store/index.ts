import { getAccessorType } from 'typed-vuex'

import * as login from './login'

export type RootState = ReturnType<
  typeof login.state
>

export const accessorType = getAccessorType({
  modules: {
    login
  },
})
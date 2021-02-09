import { Middleware, Context } from '@nuxt/types'

const authenticated: Middleware = ({
  redirect,
  app: { $accessor },
}: Context) => {
    console.log($accessor)
  if (!$accessor.login.hasUserInfo) {
    return redirect('/login')
  }
}
export default authenticated
import { LoaderArgs } from '@remix-run/node';
import { authenticator } from '~/util/authenticator.server'

export let loader = ({ request }: LoaderArgs) => {
  return authenticator.authenticate('google', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}

export default function Callback() {
  return <div>test</div>;
}
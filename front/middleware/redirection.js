export default function ({ store, redirect }) {
  if (!store.state.token) {
    store.dispatch('setMessage', 'You are disconnected, please login ; )')
    return redirect('/login')
  }
  return redirect('/')
}

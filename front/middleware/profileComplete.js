export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (store.state.token === null) {
    store.dispatch('setMessage', 'You are disconnected, please login ;)')
    return redirect('/login')
  }
}

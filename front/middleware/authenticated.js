export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.token) {
    store.commit('setMessage', 'You are disconnected, please login ; )')
    return redirect('/login')
  }
}

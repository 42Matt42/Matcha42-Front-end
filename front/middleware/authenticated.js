export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.token) {
    store.dispatch('setMessage', 'You are disconnected, please login ; )')
    return redirect('/login')
  }
  if (!store.state.loadedUsers.profile_complete) {
    store.dispatch('setMessage', 'Please, complete your profile before to continue')
    return redirect('/login/settings')
  }
}

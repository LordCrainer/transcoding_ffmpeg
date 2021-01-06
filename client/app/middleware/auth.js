export default function({ store, redirect }) {
  if (!Object.keys(store.state.users.user).length) {
    redirect("/appChat/?message=noUser");
  }
}

import Input from '@components/Input';

export default function SignInForm() {
  return (
    <form hx-boost="true" action="/api/sign-up" method="post">
      <Input type="email" name="email" placeholder="E-mail" />
      <Input type="password" name="password" placeholder="Password" />
      <Input type="submit" value="Sign in" class="contrast" />
    </form>
  );
}

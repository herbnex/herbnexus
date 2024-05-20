import * as Layouts from "@herbnexus/components/layouts";
import * as Login from "@herbnexus/components/login";

const LoginPage = () => {
  return (
    <Layouts.Auth>
      <Login.Form />
    </Layouts.Auth>
  );
};

export default LoginPage;

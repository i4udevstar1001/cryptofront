import { useEffect } from "react";
import styles from "./styles.module.sass";
import { ArrowRight, Mail, Lock } from "react-feather";
import Input from "../../GlobalComponents/FormInput";
import { Switch, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import logo from "../../Assets/Images/logo_main_horizontal.png";
import WelcomeImg from "../../Assets/Images/welcome.png";
import {Link, useHistory} from 'react-router-dom';
import AuthService from "../../Services/auth.service";

const Login = () => {
  const history = useHistory()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if( AuthService.getCurrentUser() != null ) {
      history.push('/')
    }
  }, [history]);

  const onSubmit = ({email, password}) => {
    // AuthService.login(email, password).then(
    //   () => {
    //     this.setState({
    //       redirect: "/profile"
    //     });
    //   },
    //   error => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     this.setState({
    //       loading: false,
    //       message: resMessage
    //     });
    //   }
    // );
    AuthService.login();
    history.push('/');
  };

  return (
    <div className={styles.container}>
      <header>
        <Link to={'/'}>
          <img src={logo} alt="CryptoAces" className={styles.logo} />
        </Link>
      </header>
      <div className={styles.containerBg}>
        <div className={styles.avatar}>
          <img src={WelcomeImg} alt="" />
        </div>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Login</h1>
          <form>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  type={"email"}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Enter your Email Address"}
                  error={errors.email && "Enter your Email Address"}
                  icon={<Mail color={"#122645"} size={20} />}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  type={"password"}
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  placeholder={"Enter your password"}
                  togglepassword="1"
                  error={errors.password && "Enter your password"}
                  icon={<Lock color={"#122645"} size={20} />}
                />
              )}
            />
            <p>Are you a verified</p>
            <Controller
              control={control}
              name="verified"
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch
                  checkedChildren="yes"
                  unCheckedChildren="no"
                  defaultChecked
                  onChange={(e) => onChange(e)}
                />
              )}
            />
            <div className={styles.submit} onClick={handleSubmit(onSubmit)}>
              <span>Login</span>
              <ArrowRight size={20} />
            </div>
          </form>
          <div className={styles.footer}>
            <p>Don't have an account? </p>
            <Button type={"primary"} onClick={()=>history.push('/register')} className={styles.submitBtn}>Sign up</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  Login;
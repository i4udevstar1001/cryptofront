import { useEffect } from "react";
import styles from "./styles.module.sass";
import { User, Plus, UserPlus, Mail, Lock } from "react-feather";
import Input from "../../GlobalComponents/FormInput";
import { Switch, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import logo from "../../Assets/Images/logo_main_horizontal.png";
import {Link, useHistory} from 'react-router-dom';
import AuthService from "../../Services/auth.service";

const Register = () => {
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

  const onSubmit = ({username, email, password}) => {
    // Register
  };

  return (
    <div className={styles.container}>
      <header>
        <Link to={'/'}>
          <img src={logo} alt="" className={styles.logo} />
        </Link>
      </header>
      <div className={styles.containerBg}>
        <div className={styles.avatar}>
          <User color={"white"} size={120} />
          <button>
            <Plus color={"white"} size={30} />
          </button>
        </div>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Register</h1>
          <form>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  type={"text"}
                  placeholder={"Enter your name/username"}
                  error={errors.username && "Enter your Username"}
                  icon={<User color={"#122645"} size={20} />}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  type={"email"}
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
              <UserPlus size={20} />
              <span>Register</span>
            </div>
          </form>
          <div className={styles.footer}>
            <p>Already have an account? </p>
            <Button type={"primary"} onClick={()=>history.push('/login')} className={styles.submitBtn}>Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  Register;
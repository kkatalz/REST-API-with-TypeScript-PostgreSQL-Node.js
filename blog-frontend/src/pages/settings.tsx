import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../services/user.service";
import { useAuthStore } from "../shared/data-access/store/auth.store";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { UpdateUserValidationSchema } from "../shared/data-access/zod-schema";
import { Error } from "../shared/ui/error";
import { pruneEmpty } from "../utils/omit-empty-fields";

export const Settings = () => {
  const { user, setUser, setAuthState } = useAuthStore();
  const initialValues = {
    image: user?.image ?? "",
    bio: user?.bio ?? "",
    username: user?.username ?? "",
    password: "",
    email: user?.email ?? "",
  };

  const navigate = useNavigate();

  const { mutate, isError, error } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log(data.user);
      setUser(data.user);
      navigate("/");
    },
  });
  console.log(error);

  const handleLogout = () => {
    setAuthState(undefined, false);
    navigate("/login");
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            {isError && <Error error={(error as AxiosError).message} />}
            <Formik
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(
                UpdateUserValidationSchema
              )}
              onSubmit={(user) => {
                const payload = pruneEmpty(user);
                mutate({ user: payload });
              }}
              validateOnChange
            >
              {({ errors, touched }) => (
                <Form>
                  <fieldset>
                    <fieldset className="form-group">
                      <Field
                        name="image"
                        className="form-control"
                        type="text"
                        placeholder="URL of profile picture"
                      />
                      {errors.image && touched.image ? (
                        <span>{errors.image}</span>
                      ) : null}
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        name="username"
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Your Name"
                      />
                      {errors.username && touched.username ? (
                        <span>{errors.username}</span>
                      ) : null}
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        name="bio"
                        as="textarea"
                        className="form-control form-control-lg"
                        rows={8}
                        placeholder="Short bio about you"
                      ></Field>
                      {errors.bio && touched.bio ? (
                        <span>{errors.bio}</span>
                      ) : null}
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        name="email"
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Email"
                      />
                      {errors.email && touched.email ? (
                        <span>{errors.email}</span>
                      ) : null}
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        name="password"
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="New Password"
                      />
                      {errors.password && touched.password ? (
                        <span>{errors.password}</span>
                      ) : null}
                    </fieldset>
                    <button
                      className="btn btn-lg btn-primary pull-xs-right"
                      type="submit"
                    >
                      Update Settings
                    </button>
                  </fieldset>
                </Form>
              )}
            </Formik>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

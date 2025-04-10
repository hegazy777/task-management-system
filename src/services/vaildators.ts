import * as Yup from "yup";

// repeated validation
const email = Yup.string().email("Invalid email").required("Email is required");
const otp = Yup.string()
  .required("OTP is required")
  .length(4, "OTP length is 4 characters");

const newPassword = Yup.string()
  .matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
  )
  .required("Password is required")
  .min(8, "Password length should be at least 8 characters");
const confirmNewPassword = Yup.string()
  .required("Confirm Password is required")
  .min(8, "Password length should be at least 8 characters")
  .oneOf([Yup.ref("password")], "Passwords do not match")
  .oneOf([Yup.ref("newPassword")], "Passwords do not match");

const country = Yup.string()
  .required("Country name is required")
  .min(4, "Country name length should be at least 4 characters");
const phoneNumber = Yup.string()
  .required("Phone number is required")
  .matches(/^01[0125][0-9]{8}$/, "Invalid phone number");

const userName = Yup.string()
  .required("Username is required")
  .min(4, "Username length should be at least 4 characters")
  .matches(
    /^[A-Za-z]*\d+/,
    "Username must contain characters and end with numbers without spaces"
  );
// validation schemas
export const verifySchemaValidation = Yup.object().shape({
  email,
  code: otp,
});

export const resetSehemaValidation = Yup.object().shape({
  email,
  seed: otp,
  password: newPassword,
  confirmPassword: confirmNewPassword,
});
export const forgetSehemaValidation = Yup.object().shape({
  email,
});
export const loginSehemaValidation = Yup.object().shape({
  email,
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password length should be at least 8 characters"),
});

export const registerSehemaValidation = Yup.object().shape({
  userName,
  email,
  country,
  phoneNumber,
  password: newPassword,
  confirmPassword: confirmNewPassword,
});

export const changePasswordSehemaValidation = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Old password is required")
    .min(8, "Old password length is already set to be at least 8 characters"),
  newPassword: newPassword,
  confirmNewPassword: confirmNewPassword,
});

export const projectDataSehemaValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});
// export const categoryDataSehemaValidation = Yup.object().shape({
//   name: Yup.string()
//     .required("Categroy name is required")
//     .min(2, "Categroy length shoud be at least 2 characters"),
// });
// export const recipeDataSehemaValidation = Yup.object().shape({
//   name: Yup.string().required("Recipe name is required"),
//   description: Yup.string().required("Recipe description is required"),
//   price: Yup.number().required("Recipe price is required"),
//   recipeImage: Yup.string(),
//   categoryIds: Yup.number(),
//   tagId: Yup.number().required("Tag is required"),
// });

// export const editProfileSehemaValidation = Yup.object().shape({
//   userName,
//   email,
//   country,
//   phoneNumber,
//   profileImage: Yup.string(),
//   confirmPassword: newPassword,
// });

// register 
export const emailVefication = {
  required: `email is requird`,
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: `must be valid email`,
  },
}

export const userNameValidation = {

  required: `name is required`,
  pattern: {
    value: /^[A-Za-z][A-Za-z0-9]{2,}[0-9]$/,
    message: ` Must start with letters, end with numbers, be 4+ chars, no spaces `
  }
}
export const countryVerfication ={
  required: "country is requird",
  pattern: {
    value: /^[A-Z][a-zA-Z\s]*$/,
    message: `Country must start with a capital letter and contain only letters`,
  }

}
export const phoneNumberVefication =  {
  required: "phoneNumber  is requird",
  pattern: {
    value: /^01[0125][0-9]{8}$/,
    message: `must be egyption Number`,
  }

}
export const passwValidation ={
  required: " password is requird",
  pattern: {
    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    message: `Minimum eight characters and add some of #?!@$%^&*._-`,
  }
}

//verify-account
export const verfiVerfication =  {
  required: " OTP is requird",

  pattern:{
    value:/^[A-Za-z0-9]+$/,
    message:"please enter the code we sent"
  }
              }
                
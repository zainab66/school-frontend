import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .email('Please provide a valid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
});

export const signupSchema = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .email('Please provide a valid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  userName: yup
    .string(' Name should be a string')
    .min(3, ' Name should have a minimum length of 3')
    .required(' Name is required'),
  dashboardName: yup
    .string(' Dashboard Name should be a string')
    .min(3, ' Dashboard Name should have a minimum length of 3')
    .required(' Dashboard Name is required'),
});

export const profileSchema = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .email('Please provide a valid email address')
    .required('Email address is required'),
  name: yup
    .string(' Name should be a string')
    .min(3, ' Name should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required(' Name is required'),
  image: yup.mixed().required('An image is required'),
});

export const teacherProfileSchema = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .email('Please provide a valid email address')
    .required('Email address is required'),
  firstName: yup
    .string(' First Name should be a string')
    .min(3, 'First Name should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('First Name is required'),
  lastName: yup
    .string(' Last Name should be a string')
    .min(3, 'Last Name should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required(' Last Name is required'),
  image: yup.mixed().required('An image is required'),
});

export const inviteTeacherSchemaArabic = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .email('الرجاء إدخال عنوان بريد إلكتروني صالح')
    .required('عنوان البريد الإلكتروني مطلوب'),
  firstName: yup
    .string('First Name should be a string')
    .min(3, ' يجب ألا يقل طول الاسم الأول عن 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('الإسم الأول مطلوب'),
  lastName: yup
    .string('Last Name should be a string')
    .min(3, 'يجب أن لا يقل طول اسم العائلة عن 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('اسم العائلة مطلوب'),
});
export const inviteTeacherSchema = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .email('Please provide a valid email address')
    .required('Email address is required'),
  firstName: yup
    .string('First Name should be a string')
    .min(3, 'First Name should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('First Name is required'),
  lastName: yup
    .string('Last Name should be a string')
    .min(3, 'Last Name should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('Last Name is required'),
});

export const editTeacherSchemaArabic = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .email('الرجاء إدخال عنوان بريد إلكتروني صالح')
    .required('عنوان البريد الإلكتروني مطلوب'),
  firstName: yup
    .string('First Name should be a string')
    .min(3, ' يجب ألا يقل طول الاسم الأول عن 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('الإسم الأول مطلوب'),
  lastName: yup
    .string('Last Name should be a string')
    .min(3, 'يجب أن لا يقل طول اسم العائلة عن 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('اسم العائلة مطلوب'),
  phoneNumber: yup
    .string()
    .required('رقم الهاتف مطلوب')
    .matches(/^[0-9]+$/, 'يجب أن يتكون من أرقام فقط')
    .min(10, 'يجب أن يتكون رقم الهاتف من 10 أرقام')
    .max(10, 'يجب أن يتكون رقم الهاتف من 10 أرقام'),
  age: yup
    .string('Age should be a string')
    .matches(/^[1-9]+$/, 'يجب ألا يقل العمر عن 1')
    .min(1, 'يجب ألا يقل العمر عن 1')
    .required('العمر مطلوب'),
  gender: yup.string('Gender should be a string').required(' نوع الجنس مطلوب'),
  address: yup.string('Address should be a string').required('العنوان مطلوب'),
  salary: yup.string('Salary should be a string').required('الراتب مطلوب'),
  // joiningDate: yup
  //   .string('Joining Date should be a string')
  //   .required('Joining Date is required'),
});

export const editTeacherSchema = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .email('Please provide a valid email address')
    .required('Email address is required'),
  firstName: yup
    .string('First Name should be a string')
    .min(3, 'First Name should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('First Name is required'),
  lastName: yup
    .string('Last Name should be a string')
    .min(3, 'Last Name should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('Last Name is required'),
  phoneNumber: yup
    .string()
    .required('A phone number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'A phone number should have 10 digits')
    .max(10, 'A phone number should have 10 digits'),
  age: yup
    .string('Age should be a string')
    .matches(/^[1-9]+$/, 'Age should have a minimum length of 1')
    .min(1, 'Age should have a minimum length of 1')
    .required('Age is required'),
  gender: yup
    .string('Gender should be a string')
    .required('Gender is required'),
  address: yup
    .string('Address should be a string')
    .required('Address is required'),
  salary: yup
    .string('Salary should be a string')
    .required('Salary is required'),
  // joiningDate: yup
  //   .string('Joining Date should be a string')
  //   .required('Joining Date is required'),
});

export const addStudentSchema = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .email('Please provide a valid email address')
    .required('Email address is required'),
  firstName: yup
    .string('First Name should be a string')
    .min(3, 'First Name should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('First Name is required'),
  lastName: yup
    .string('Last Name should be a string')
    .min(3, 'Last Name should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('Last Name is required'),
  phoneNumber: yup
    .string()
    .required('A phone number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'A phone number should have 10 digits')
    .max(10, 'A phone number should have 10 digits'),
  age: yup
    .string('Age should be a string')
    .matches(/^[1-9]+$/, 'Age should have a minimum length of 1')
    .min(1, 'Age should have a minimum length of 1')
    .required('Age is required'),
  gender: yup
    .string('Gender should be a string')
    .required('Gender is required'),
  address: yup
    .string('Address should be a string')
    .required('Address is required'),
  grade: yup.string('Grade should be a string').required('Grade is required'),
  classType: yup
    .string('Class should be a string')
    .required('Class is required'),
  fatherName: yup
    .string('Father Name Date should be a string')
    .required('Father Name Date is required'),
});

export const editStudentSchema = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .email('Please provide a valid email address')
    .required('Email address is required'),
  firstName: yup
    .string('First Name should be a string')
    .min(3, 'First Name should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('First Name is required'),
  lastName: yup
    .string('Last Name should be a string')
    .min(3, 'Last Name should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('Last Name is required'),
  phoneNumber: yup
    .string()
    .required('A phone number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'A phone number should have 10 digits')
    .max(10, 'A phone number should have 10 digits'),
  age: yup
    .string('Age should be a string')
    .matches(/^[1-9]+$/, 'Age should have a minimum length of 1')
    .min(1, 'Age should have a minimum length of 1')
    .required('Age is required'),
  gender: yup
    .string('Gender should be a string')
    .required('Gender is required'),
  address: yup
    .string('Address should be a string')
    .required('Address is required'),
  grade: yup.string('Grade should be a string').required('Grade is required'),
  classType: yup
    .string('Class should be a string')
    .required('Class is required'),
  fatherName: yup
    .string('Father Name  should be a string')
    .required('Father Name  is required'),
});

export const editStudentSchemaArabic = yup.object().shape({
  email: yup
    .string('Email should be a string')
    .email('الرجاء إدخال عنوان بريد إلكتروني صالح')
    .required('عنوان البريد الإلكتروني مطلوب'),
  firstName: yup
    .string('First Name should be a string')
    .min(3, ' يجب ألا يقل طول الاسم الأول عن 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('الإسم الأول مطلوب'),
  lastName: yup
    .string('Last Name should be a string')
    .min(3, 'يجب أن لا يقل طول اسم العائلة عن 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('اسم العائلة مطلوب'),
  phoneNumber: yup
    .string()
    .required('رقم الهاتف مطلوب')
    .matches(/^[0-9]+$/, 'يجب أن يتكون من أرقام فقط')
    .min(10, 'يجب أن يتكون رقم الهاتف من 10 أرقام')
    .max(10, 'يجب أن يتكون رقم الهاتف من 10 أرقام'),
  age: yup
    .string('Age should be a string')
    .matches(/^[1-9]+$/, 'يجب ألا يقل العمر عن 1')
    .min(1, 'يجب ألا يقل العمر عن 1')
    .required('العمر مطلوب'),
  gender: yup.string('Gender should be a string').required(' نوع الجنس مطلوب'),
  address: yup.string('Address should be a string').required('العنوان مطلوب'),
  grade: yup.string('Grade should be a string').required('المرحلة مطلوب'),
  classType: yup.string('Class should be a string').required('الصف مطلوب'),
  fatherName: yup
    .string('Father Name  should be a string')
    .required('اسم الأب مطلوب'),
});

export const addClassSchema = yup.object().shape({
  name: yup.string('Class should be a string').required('Class is required'),
  teacherName: yup
    .string('Teacher Name should be a string')
    .required('Teacher Name is required'),
});

export const addGradeSchema = yup.object().shape({
  name: yup.string('Grade should be a string').required('Grade is required'),
});

export const eventSchema = yup.object().shape({
  eventTitle: yup
    .string('Event Title should be a string')
    // .min(3, 'Event Title should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('Event Title is required'),
  eventDescription: yup
    .string('Event Description should be a string')
    // .min(3, 'Event Description should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('Event Description is required'),
});

export const cardSchema = yup.object().shape({
  title: yup
    .string('Title should be a string')
    // .min(3, 'Event Title should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required(' Title is required'),
  description: yup
    .string('Description should be a string')
    // .min(3, 'Event Description should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required(' Description is required'),
});

export const listSchema = yup.object().shape({
  title: yup
    .string('Title should be a string')
    // .min(3, 'Event Title should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required(' Title is required'),
});

export const forgetPasswordSchema = yup.object().shape({
  email: yup
    .string('email should be a string')
    .email('please provide a valid email address')
    .required('email address is required'),
});
export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
});

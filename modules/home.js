//agregar usuario al array
class UserService {
  constructor() {
    this.users = [
      {
        name: "lisandro",
        lastName: "martinez",
        email: "lisandro@martinez.com",
        password: '14*DeSep'
      }
    ]
  }


  login(email, password, doOnLogin, doOnError) {
    const user = this.users.find(user => user.email === email && user.password === password)
    if (user) {
      doOnLogin(user)
    } else {
      doOnError()
    }
  }

  register(user, doOnSuccess, doOnError) {
    const alreadyExists = this.users.filter(user => user.email === email && user.password === password)
    if (alreadyExists.length !== 0)
      doOnError()
    else {
      this.users.push(user)
      doOnSuccess()
    }
  }
}

const userService = new UserService()
//-----

//para las validaciones
let emailDirty = false
let passwordDirty = false
let emailIngresoDirty = false

function debounce(func, timeout) {
  let timer
  return (...args) => {
    const next = () => func(...args);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(next, timeout > 0 ? timeout : 300);
  };
}


function getTerminos() {
  return document.querySelector('#terminos')

}

function validarTerminos() {
  validate(
    {
      id: 'terminos',
      rule: {
        name: 'required',
        test: (terminos) => !terminos.checked
      },
      onSuccess: () => {
        const error = getParent('terminos').lastChild
        if (error) {
          error.remove()
        }
      },
      onError: () => isRequired('terminos', getParent('terminos'))
    }
  )
  const terminos = getTerminos().checked

  if (terminos) {
  }
}

function enableConfirmarRegistracionOnValidForm() {
  const name = getName().value !== ''
  const isNameValid = name && getNameIsRequired() === null

  const lastName = getLastName().value !== ''
  const isLastNameValid = lastName && getApellidoIsRequired() === null

  const email = getEmail().value !== ''
  const isEmailValid = email && getEmailIsRequired() === null && (emailDirty === false && getEmailFormatIsInvalid() === null)

  const password = getPassword().value !== ''
  const isPasswordValid = password && getPasswordIsRequired() === null && (passwordDirty === false && getPasswordIsWeak() === null)

  const isTerminosValid = getTerminos().checked

  const isValid = isNameValid && isLastNameValid && isPasswordValid && isEmailValid && isTerminosValid
  getConfirmarRegistracion().disabled = false

}

const pattern = {
  charLength: function (password) {
    if (password.value.length >= 8) {
      return true;
    }
  },
  lowercase: function (password) {
    const regex = /^(?=.*[a-z]).+$/;
    return !!password.value.match(regex);

  },
  uppercase: function (password) {
    const regex = /^(?=.*[A-Z]).+$/;
    return !!password.value.match(regex);
  },
  special: function (password) {
    const regex = /^(?=.*[0-9_\W]).+$/;
    return !!password.value.match(regex);
  }
};

function getName() {
  return document.querySelector('#nombre');

}

function getLastName() {
  return document.querySelector('#apellido');
}

function getUserFromFields() {
  const name = getName().value
  const lastName = getLastName().value
  const email = getEmail().value
  const password = getPassword().value
  return {
    name,
    lastName,
    email,
    password
  }

}

function confirmarRegistracion() {
  const user = getUserFromFields()
  userService.register(user, () => {
    localStorage.setItem('user', JSON.stringify(user))
    enableAdminButtonsOnLoggedUser()
    cerrarRegistrarse()
  }, () => {
  })

}

function getEmail() {
  return document.querySelector('#email')
}

function getPassword() {
  return document.querySelector('#password')
}

function cerrarSesion() {
  localStorage.removeItem('user')
  enableAdminButtonsOnLoggedUser()
}

function getCerrarSesion() {
  return document.querySelector('#cerrar-sesion');
}

function getIngresar() {
  return document.querySelector("#ingresar");
}

function isUserLogged() {
  const user = localStorage.getItem('user')
  return user !== null
}

function enableAdminButtonsOnLoggedUser() {
  const isLoggedIn = isUserLogged()
  if (isLoggedIn) {
    getIngresar().style.display = 'none'
    getRegistrarse().style.display = 'none'
    getCerrarSesion().style.display = 'inline-flex'
  } else {
    getIngresar().style.display = 'inline-flex'
    getRegistrarse().style.display = 'inline-flex'
    getCerrarSesion().style.display = 'none'
  }
}


function getRegistrarse() {
  return document.querySelector("#registrarse");
}

function getConfirmarRegistracion() {
  return document.querySelector('#confirmar-registracion');
}

function getRegistrationModal() {
  return document.querySelector('#registracion-modal')
}

function getIngresarModal() {
  return document.querySelector('#ingresar-modal')
}

function ingresar() {
  const ingresar = getIngresarModal()
  getConfirmarIngreso().disabled = true
  ingresar.classList.add('is-active')
}

function registrarse() {
  const registration = getRegistrationModal()
  getConfirmarRegistracion().disabled = true
  registration.classList.add('is-active')
}

function cerrarRegistrarse() {
  getName().value = ''

  if (getNameIsRequired())
    getNameIsRequired().remove()

  if (getApellidoIsRequired()) {
    getApellidoIsRequired().remove()
  }
  getLastName().value = ''

  getEmail().value = ''
  if (getEmailIsRequired())
    getEmailIsRequired().remove()
  if (getEmailFormatIsInvalid())
    getEmailFormatIsInvalid().remove()

  getPassword().value = ''

  if (getPasswordIsRequired())
    getPasswordIsRequired().remove()
  if (getPasswordIsWeak())
    getPasswordIsWeak().remove()

  getTerminos().checked = false
  const registration = getRegistrationModal()
  registration.classList.remove('is-active')
}

function cerrarIngresar() {
  const ingresar = getIngresarModal()
  ingresar.classList.remove('is-active')
}


function createError() {
  const error = document.createElement("p")
  error.classList.add('validation--error')
  return error
}

function isRequired(id, field) {
  const error = createError()
  error.innerText = "el campo es obligatorio"
  error.id = `${id}--required`
  field.append(error)
}

function hasErrorOF(id, error) {
  return document.querySelector(`#${id}--${error}`)
}

function validate(validation) {
  const field = getFormField(validation.id)
  const hasNoError = hasErrorOF(validation.id, validation.rule.name)
  if (validation.rule.test(field)) {
    if (!hasNoError)
      validation.onError()
  } else {
    if (hasNoError) {
      validation.onSuccess()
    }
  }
}

function getNameIsRequired() {
  return document.querySelector(`#nombre--required`);
}

function validateName() {
  validate({
    id: 'nombre',
    rule: {
      test: (name) => name.value.trim() === '',
      name: 'required'
    },
    onError: () => isRequired('nombre', getParent('nombre')),
    onSuccess: () => getNameIsRequired().remove()
  })
}

function getParent(field) {
  return document.querySelector(`#${field}--parent`)
}

function getApellidoIsRequired() {
  return document.querySelector(`#apellido--required`);
}

function validateLastName(lastName, parent) {
  validate({
    id: 'apellido',
    rule: {
      test: (apellido) => apellido.value.trim() === '',
      name: 'required'
    },
    onError: () => isRequired('apellido', getParent('apellido')),
    onSuccess: () => getApellidoIsRequired().remove()
  })
}

function getFormField(field) {
  return document.querySelector(`#${field}`)
}

function isEmailFormatInvalid(email, parent) {
  const error = createError()
  error.id = `${email}--formatInvalid`
  error.innerText = "el formato es invalido"
  parent.append(error)
}

function isValidEmailFormat(email) {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return !email.value.match(re);
}


function getEmailIsRequired() {
  return document.querySelector(`#email--required`);
}

function getEmailIngresoIsRequired() {
  return document.querySelector(`#email--ingreso--required`);
}

function getEmailFormatIsInvalid() {
  return document.querySelector(`#email--formatInvalid`);
}

function getEmailIngresoFormatIsInvalid() {
  return document.querySelector(`#email--ingreso--formatInvalid`);
}


const validateEmailFormat = debounce(validate, 1000)

function validateEmail() {
  validate({
    id: 'email',
    rule: {
      test: (email) => email.value.trim() === '',
      name: 'required'
    },
    onError: () => {
      isRequired('email', getParent('email'))
      emailDirty = true
    },
    onSuccess: () => {
      getEmailIsRequired().remove()
      emailDirty = true
      enableConfirmarRegistracionOnValidForm()
    }
  })

  validateEmailFormat({
    id: 'email',
    rule: {
      test: (email) => isValidEmailFormat(email),
      name: 'formatInvalid'
    },
    onError: () => {
      emailDirty = true
      isEmailFormatInvalid('email', getParent('email'))
    },
    onSuccess: () => {
      emailDirty = false
      getEmailFormatIsInvalid().remove()
    }
  })
}

function isPasswordStrong(password) {
  const isInvalid = pattern.charLength(password) &&
    pattern.lowercase(password) &&
    pattern.uppercase(password)
  return !isInvalid
}

function getPasswordIsRequired() {
  return document.querySelector(`#password--required`);
}

function getPasswordIngresoIsRequired() {
  return document.querySelector(`#password--ingreso--required`);
}


function getPasswordIsWeak() {
  return document.querySelector(`#password--weak`);
}

function passwordIsWeak(parent) {
  const error = createError()
  error.innerText = "Minimum length of 8 characters\n" +
    "Contains a lowercase letter\n" +
    "Contains an uppercase letter\n" +
    "Contains a number or special character"
  error.id = `password--weak`
  parent.append(error)
}

const validatePasswordStrong = debounce(validate, 1000)

function validatePassword() {
  validate({
    id: 'password',
    rule: {
      test: (password) => password.value.trim() === '',
      name: 'required'
    },
    onError: () => {
      passwordDirty = true
      isRequired('password', getParent('password'))
    },
    onSuccess: () => {
      passwordDirty = true
      getPasswordIsRequired().remove()
    }
  })

  validatePasswordStrong({
    id: 'password',
    rule: {
      test: (password) => isPasswordStrong(password),
      name: 'weak'
    },
    onError: () => {
      passwordDirty = true
      passwordIsWeak(getParent('password'))
    },
    onSuccess: () => {
      passwordDirty = false
      getPasswordIsWeak().remove()
      enableConfirmarRegistracionOnValidForm()
    }
  })
}

function getEmailIngreso() {
  return document.querySelector('#email--ingreso');
}

function getPasswordIngreso() {
  return document.querySelector('#password--ingreso')
}

function confirmarIngreso() {
  const email = getEmailIngreso().value
  const password = getPasswordIngreso().value
  userService.login(email, password,
    (user) => {
      localStorage.setItem('user', JSON.stringify(user))
      enableAdminButtonsOnLoggedUser()
      cerrarIngresar()
    }, () => {
    })
}

function getConfirmarIngreso() {
  return document.querySelector('#confirmar-ingreso');
}

function enableConfirmarIngresoOnValidForm() {
  const email = getEmailIngreso().value !== ''
  const isEmailValid = email && getEmailIngresoIsRequired() === null && (emailIngresoDirty === false && getEmailIngresoFormatIsInvalid() === null)

  const password = getPasswordIngreso().value !== ''
  const isPasswordValid = password && getPasswordIngresoIsRequired() === null

  const isValid = isEmailValid && isPasswordValid
  getConfirmarIngreso().disabled = !isValid;
}


function validateEmailIngreso() {
  validate({
    id: 'email--ingreso',
    rule: {
      test: (email) => email.value.trim() === '',
      name: 'required'
    },
    onError: () => {
      isRequired('email--ingreso', getParent('email--ingreso'))
      emailIngresoDirty = true
    },
    onSuccess: () => {
      getEmailIngresoIsRequired().remove()
      emailIngresoDirty = true
      enableConfirmarIngresoOnValidForm()
    }
  })

  validateEmailFormat({
    id: 'email--ingreso',
    rule: {
      test: (email) => isValidEmailFormat(email),
      name: 'formatInvalid'
    },
    onError: () => {
      emailIngresoDirty = true
      isEmailFormatInvalid('email--ingreso', getParent('email--ingreso'))
    },
    onSuccess: () => {
      emailIngresoDirty = false
      getEmailIngresoFormatIsInvalid().remove()
    }
  })
}

function validatePasswordIngreso() {
  validate({
    id: 'password--ingreso',
    rule: {
      test: (password) => password.value.trim() === '',
      name: 'required'
    },
    onError: () => {
      passwordDirty = true
      isRequired('password--ingreso', getParent('password--ingreso'))
    },
    onSuccess: () => {
      passwordDirty = true
      getPasswordIngresoIsRequired().remove()
    }
  })
}

function getCheckIn() {
  return document.querySelector('#check-in')
}

function getCheckOut() {
  return document.querySelector('#check-out')
}

function setDatesMinToToday() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  getCheckIn().min = tomorrow.toISOString().split("T")[0];
  getCheckOut().min = tomorrow.toISOString().split("T")[0];
}

function isDateBeforeToday(dateField) {
  const date = new Date(dateField.value)

  return new Date(date.toDateString()) < new Date(new Date().toDateString());
}

function dateIsBeforeToday(child, text) {
  const field = getParent(child)
  const error = createError()
  error.innerText = `la fecha de ${text} debe estar en el futuro`
  error.id = `${child}--before`
  field.append(error)
}

function getDateIsBeforeToday(field) {
  return document.querySelector(`#${field}--before`)
}

function validateCheckIn() {
  validate(
    {
      id: 'check-in',
      rule: {
        test: (date) => isDateBeforeToday(date),
        name: 'before'
      },
      onError: () => dateIsBeforeToday('check-in', 'ingreso'),
      onSuccess: () => getDateIsBeforeToday('check-in').remove()
    }
  )
}

function validateCheckOut() {
  validate(
    {
      id: 'check-out',
      rule: {
        test: (date) => isDateBeforeToday(date),
        name: 'before'
      },
      onError: () => dateIsBeforeToday('check-out', 'egreso'),
      onSuccess: () => getDateIsBeforeToday('check-out').remove()
    }
  )
}

function getBuscarButton() {
  return document.querySelector('#buscar-btn')
}

function enableButtonIfTextPresent() {
  const input = getBuscarTexto().value
  console.log(input)
  if (input === '') {
    getBuscarButton().disabled = true
  } else {
    getBuscarButton().disabled = false
  }

}

function getBuscarTexto() {
  return document.querySelector('#buscar-text')
}

function goToBuscar() {
  location.href = 'buscar.html'
}

// let registroHandler  =  new RegistroHandler()
document.addEventListener("DOMContentLoaded", evt => {

  getCerrarSesion().addEventListener('click', cerrarSesion)
  enableAdminButtonsOnLoggedUser()

  //buscador
  if (!!getCheckIn()) {
    console.log(!!getCheckIn())
    setDatesMinToToday()
    getCheckIn().addEventListener('change', validateCheckIn)
    getCheckIn().addEventListener('blur', validateCheckIn)
    getCheckOut().addEventListener('change', validateCheckOut)
    getCheckOut().addEventListener('blur', validateCheckOut)
    enableButtonIfTextPresent()
    getBuscarTexto().addEventListener('keyup', enableButtonIfTextPresent)
    getBuscarTexto().addEventListener('change', enableButtonIfTextPresent)
    getBuscarButton().addEventListener('click', goToBuscar)
  }



  //ingreso
  getIngresar().addEventListener('click', ingresar)
  getConfirmarIngreso().addEventListener('click', confirmarIngreso)
  document.querySelector('#cerrar-ingresar').addEventListener('click', cerrarIngresar)
  document.querySelector('#cancelar-ingresar').addEventListener('click', cerrarIngresar)
  getEmailIngreso().addEventListener('keyup', validateEmailIngreso)
  getEmailIngreso().addEventListener('keyup', enableConfirmarIngresoOnValidForm)
  getPasswordIngreso().addEventListener('keyup', validatePasswordIngreso)
  getPasswordIngreso().addEventListener('keyup', enableConfirmarIngresoOnValidForm)

  //registrarse


  getRegistrarse().addEventListener('click', registrarse)
  getName().addEventListener('blur', validateName)
  getName().addEventListener('keyup', validateName)
  document.querySelector('#close-registrarse-header').addEventListener('click', cerrarRegistrarse)
  document.querySelector('#cancelar-registarse').addEventListener('click', cerrarRegistrarse)
  getConfirmarRegistracion().addEventListener('click', confirmarRegistracion)
  getLastName().addEventListener('blur', validateLastName)
  getLastName().addEventListener('keyup', validateLastName)
  getLastName().addEventListener('blur', enableConfirmarRegistracionOnValidForm)
  getLastName().addEventListener('keyup', enableConfirmarRegistracionOnValidForm)
  getEmail().addEventListener('blur', validateEmail)
  getEmail().addEventListener('keyup', validateEmail)
  getEmail().addEventListener('keypress', validateEmail)
  getEmail().addEventListener('blur', enableConfirmarRegistracionOnValidForm)
  getEmail().addEventListener('keyup', enableConfirmarRegistracionOnValidForm)
  getPassword().addEventListener('blur', validatePassword)
  getPassword().addEventListener('keyup', validatePassword)
  getPassword().addEventListener('keypress', validatePassword)
  getPassword().addEventListener('blur', enableConfirmarRegistracionOnValidForm)
  getPassword().addEventListener('keyup', enableConfirmarRegistracionOnValidForm)
  getTerminos().addEventListener('click', validarTerminos)
  getTerminos().addEventListener('click', enableConfirmarRegistracionOnValidForm)
})

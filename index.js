(function () {
  const myFormApp = document.getElementById('myForm')
  const submitButton = document.getElementById('submitButton')
  const resultContainer = document.getElementById('resultContainer')

  const formFields = {
    fio: document.querySelector('.myForm__input[name=fio]'),
    phone: document.querySelector('.myForm__input[name=phone]'),
    email: document.querySelector('.myForm__input[name=email]')
  }

  const validationRules = {
    fio: function (fio) {
      const gap = ' '
      const wordArray = fio.split(gap)
      const preparedArray = wordArray.filter((item) => {
        return item.length
      })

      if (preparedArray.length !== 3) {
        return false
      }

      const threeWordsRegex = /^$|^[a-zA-Za-яА-ЯёЁ]+ [a-zA-Za-яА-ЯёЁ]+ [a-zA-Za-яА-ЯёЁ]+?$/
      return threeWordsRegex.test(preparedArray.join(gap))
    },
    phone: function (phone) {
      const preparedPhone = phone.trim()
      const phoneRegex = /^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/i
      if (!phoneRegex.test(preparedPhone)) {
        return false
      }
      const sum = preparedPhone.match(/[0-9]/g).reduce((a, b) => +a + +b)
      return sum <= 30
    },

    email: function (email) {
      email = email.trim()
      const emailRegex = /^[a-zA-Z-0-9-а-яА-Я-ёЁ]{1,}@(ya.ru|yandex.ru|yandex.ua|yandex.by|yandex.kz|yandex.com)$/i
      return emailRegex.test(email)
    }
  }

  function validate () {
    const errorFields = Object.keys(validationRules).reduce(function (prev, name) {
      const fieldIsValid = validationRules[name](formFields[name].value)
      if (!fieldIsValid) {
        const currentErrorFields = [].concat(prev)
        currentErrorFields.push(name)
        return currentErrorFields
      }
      return prev
    }, [])
    return {
      isValid: !errorFields.length,
      errorFields: errorFields
    }
  }

  function onSubmit () {
    Object.keys(formFields).forEach(function (element) {
      const input = formFields[element]
      if (input.classList.contains('error')) {
        input.classList.remove('error')
      }
    })

    const testedFields = validate()

    if (testedFields.isValid) {
      return window.fetch(myFormApp.action).then(function (response) {
        console.log(response)
      })
    }

    testedFields.errorFields.forEach(function (element) {
      const input = formFields[element]
      if (!input.classList.contains('error')) {
        input.classList.add('error')
      }
    })
  }

  const myForm = {
    validate: validate,
    getData: function () {
      return {
        fio: formFields.fio.value,
        email: formFields.email.value,
        phone: formFields.phone.value
      }
    },
    setData: function (data) {
      if (typeof data === 'object') {
        Object.keys(data).forEach(function (fieldName) {
          formFields[fieldName].value = data[fieldName]
        })
      }
    },
    submit: onSubmit
  }
  submitButton.onclick = onSubmit
  window.myForm = myForm
})(window, document)

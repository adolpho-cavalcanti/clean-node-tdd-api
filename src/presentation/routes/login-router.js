const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('E-mail')
    }
    if (!password) {
      return HttpResponse.badRequest('Password')
    }
    this.authUseCase.auth(email, password)
    return HttpResponse.unauthorizedError()
  }
}

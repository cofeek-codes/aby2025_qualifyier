export class CookieManager {

  static getUserIdFromCookie() {
    console.log(document.cookie.split('; ').find(x => x.split('=')[0] == 'userId')?.split('=')[1] || null)
    return document.cookie.split('; ').find(x => x.split('=')[0] == 'userId')?.split('=')[1] || null
  }
  static setUserIdInCookie(id: number) {
    document.cookie = "userId=" + id
    console.log(document.cookie)
  }
  static clearCookie() {
    document.cookie = ''
  }

}

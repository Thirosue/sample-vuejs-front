import { Selector, Role, t } from 'testcafe' // first import testcafe selectors
import host from '../const/host'
import constant from '../const'

const admin = constant.admin
const loginUrl = host + '/login'

const id = Selector('#id')
const password = Selector('#password')

const adminUser = Role(loginUrl, async t => {
    await t
        .typeText(id, admin.id)
        .typeText(password, admin.password)
        .click('#form-submit')
}, { preserveUrl: true })

export default {
    adminUser,
}
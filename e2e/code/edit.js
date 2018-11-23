import { Selector } from 'testcafe'
import Role from '../role'
import host from '../const/host'

fixture`コード編集テスト`// declare the fixture

const adminUser = Role.adminUser

test('コード値を正常に更新できること', async t => {
    await t
        .useRole(adminUser)
        .navigateTo(host + '/code/1')
        .click('.is-grouped-right a')
        .typeText(Selector('#codeValue'), '編集')
        .click('#form-submit')
        .click('.modal .is-success')
})


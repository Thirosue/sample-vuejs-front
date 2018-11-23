import { Selector } from 'testcafe'
import Role from '../role'
import host from '../const/host'

fixture`コード一覧テスト`// declare the fixture

const adminUser = Role.adminUser

const list = Selector('#listview tbody tr')
const categorySelect = Selector('#category-key select')
const categoryOption = categorySelect.find('option')

test('条件なしで検索した場合、一覧が取得できること', async t => {
    await t
        .useRole(adminUser)
        .navigateTo(host + '/codeList')
        .click('#form-submit')
        .expect(list.count).gt(5)
})

test('性別で絞り込むと、一覧が適切に絞り込まれること', async t => {
    await t
        .useRole(adminUser)
        .navigateTo(host + '/codeList')
        .click(categorySelect)
        .click(categoryOption.withText('性別'))
        .click('#form-submit')
        .expect(list.count).eql(2)
})

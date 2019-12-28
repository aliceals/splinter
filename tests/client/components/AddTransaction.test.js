import React from 'react'
import { mount, shallow } from 'enzyme'



import { AddTransaction } from '../../../client/components/AddTransaction'

const debug = false

function debugLog(message) {
    if (debug) console.log(message)
}

const defaultProps = {
    groupMembers: [
        { groupMember_id: 16, group_id: 5, member_name: "Phil" },
        { groupMember_id: 14, group_id: 5, member_name: "Jenny" },
        { groupMember_id: 17, group_id: 6, member_name: "Not Phil" },
    ],
    activeGroup: 5,

}


test('App renders routes for authed user', () => {
    const wrapper = shallow(<AddTransaction {...defaultProps} />)
    debugLog(wrapper.debug())

    wrapper.instance().toggleTransaction()

    const actual = wrapper.state().showTransactionForm

    expect(actual).toBeTruthy()
})


test('handleCheck sets an error for selected payer', () => {
    const wrapper = shallow(<AddTransaction {...defaultProps} />)
    debugLog(wrapper.debug())

    wrapper.setState({ selectedPayer: [] })

    wrapper.instance().handleCheck()

    const actual = wrapper.state().errorPayer

    expect(actual).toBeTruthy()
})

test('handleCheck sets state.checked to false when unTicked', () => {
    const wrapper = shallow(<AddTransaction {...defaultProps} />)
    debugLog(wrapper.debug())

    wrapper.setState({ selectedPayer: [{ groupMember_id: 14, group_id: 5, member_name: "Jenny" }], checked: true })

    wrapper.instance().handleCheck()

    const actual = wrapper.state().checked

    expect(actual).toBeFalsy()
})

test('handleCheck sets state.checked to true when ticked', () => {
    const wrapper = shallow(<AddTransaction {...defaultProps} />)
    debugLog(wrapper.debug())

    wrapper.setState({ selectedPayer: [{ groupMember_id: 14, group_id: 5, member_name: "Jenny" }], checked: false })

    wrapper.instance().handleCheck()

    const actual = wrapper.state().checked

    expect(actual).toBeTruthy()
})

test('splitMembers.map returns the correct number of names', () => {
    const wrapper = shallow(<AddTransaction {...defaultProps} />)
    debugLog(wrapper.debug())
    console.log(defaultProps.groupMembers)
    const splitMembers = defaultProps.groupMembers.filter(member => !defaultProps.groupMembers.includes(member))

    wrapper.setState({ selectedPayer: [{ groupMember_id: 14, group_id: 5, member_name: "Jenny" }], checked: false })

    wrapper.instance().handleCheck()

    const actual = splitMembers.length

    expect(actual).toEqual(0)
})

test('submit sends error if there is 1 or less people in groupMembers', () => {
    const wrapper = shallow(<AddTransaction {...defaultProps} />)
    debugLog(wrapper.debug())
    wrapper.setState({ group_members: [{ groupMember_id: 14, group_id: 5, member_name: "Jenny" }], checked: false, errorPeopleAmount: false })

    wrapper.instance().submit({ preventDefault: () => { } })

    const actual = wrapper.state().errorPeopleAmount

    expect(actual).toBeTruthy()
}) 
import ManageColumns from "@/components/form/FormTable/ManageColumns"
import ScheduleTable from "@/features/schedule/components/ScheduleTable"
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Testing Schedule Search Component', () => {
  it('should be select option', async () => {
    render(
      <select multiple>
        <option value={'1'}>A</option>
        <option value={'2'}>B</option>
        <option value={'3'}>C</option>
      </select>
    )

    await userEvent.selectOptions(screen.getByRole('listbox'), ['1', 'C'])
    expect(screen.getByRole('option', { name: 'A' }).selected).toBe(true)
    expect(screen.getByRole('option', { name: 'B' }).selected).toBe(false)
    expect(screen.getByRole('option', { name: 'C' }).selected).toBe(true)
  })

  test('render', () => {
    render(<ScheduleTable />)
    const buttons = screen.queryByRole('button', {
      name: 'Excel Hi'
    })
    expect(buttons).not.toBeInTheDocument()
  })

  test('handler caller oneTime', async () => {
    userEvent.setup()
    const handleSelect = jest.fn()
    render(
      <ManageColumns columns={[]} onChangeCheck={handleSelect} />
    )

    const _button = screen.getByRole('button', { name: 'Hide All' })
    await userEvent.click(_button)
    expect(handleSelect).toHaveBeenCalled()
  })



  test('renders a list of rows', async () => {
    render(<ScheduleTable />)
    const rows = screen.getByRole('button', { name: 'Hide All' })
    expect(rows).toHaveLength(3)
  })
})


import React, { useRef, useState } from 'react';
import { ColumnType } from './TableProps';
import { getValue } from '@/utils/lodash';
import useClickOutside from '@/lib/hooks/useClickoutside';

interface Props<T> {
    item: any;
    column: ColumnType<T>;
    onRowSelected?: (row: any) => void;
    isCellEditable?: (params: any) => boolean;
    processRowUpdate?: (newRow: any, oldRow: any) => void;
    id: string;
    cellIdFocus: string;
    setCellIdForcus: React.Dispatch<React.SetStateAction<string>>;
    onLiveEdit?: (rowId: string, rowModel: T) => void;
    onChange?: (rowId: string, rowModel: T) => void;
    onKeyUpCell?: (rowId: string, rowModel: T, keyCode: string) => void;
}

function TableRowCell<T>({ item, column, processRowUpdate, onRowSelected, isCellEditable, id, cellIdFocus, setCellIdForcus,
    onLiveEdit,
    onKeyUpCell,
    onChange }: Props<T>) {
    const [isEditCell, setIsEditCell] = useState<boolean>(false)
    const ref = useRef<HTMLInputElement>(null)

    const handleClickOutside = () => {
        setIsEditCell(false)
        setCellIdForcus("");
        const newRow = {
            ...item,
            [column.key]: value
        }
        if (processRowUpdate) {
            processRowUpdate(newRow, item)
        }
        if (onChange) {
            onChange?.(item.id, newRow);
        }
    }

    useClickOutside(ref, handleClickOutside);

    const [value, setValue] = useState(getValue(item, column.key));
    let valueType: any;

    if (column.render) {
        valueType = column.render(column, item);
    } else if (column.valueGetter) {
        valueType = column.valueGetter(item);
    }

    const handleEditCell = () => {
        if (isCellEditable) {
            const res = isCellEditable({
                row: item,
                column,
                value: getValue(item, column.key),
                field: column.key
            })
            if (!res) {
                return
            }
        } else if (!column?.editable) {
            return
        }

        setIsEditCell(true)
        setTimeout(() => {
            ref.current?.focus()
        })
    }

    const handleOnRowSelected = () => {
        if (onRowSelected) {
            onRowSelected(item)
        }
    }

    return (
        <>
            {!isEditCell && id !== cellIdFocus ? (
                <td role="cell" className="py-4" onDoubleClick={handleEditCell} onClick={() => handleOnRowSelected()}> {valueType ? valueType : value}</td>
            ) : (
                <td className="py-4" role="cell">
                    <input
                        id={id}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                            if (isEditCell && item !== undefined && onLiveEdit) {
                                const tempItem: any = { ...item };
                                tempItem[column.key] = value;
                                onLiveEdit?.(item?.id, tempItem)
                            }
                        }}
                        onKeyUp={(e) => {
                            if (isEditCell && item !== undefined && onKeyUpCell) {
                                const tempItem: any = { ...item };
                                tempItem[column.key] = value;
                                onKeyUpCell?.(item?.id, tempItem, e.code)
                            }
                        }}
                        type='text'
                        ref={ref}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' />
                </td>
            )}
        </>
    )
}

export default TableRowCell;

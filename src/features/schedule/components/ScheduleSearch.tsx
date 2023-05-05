import ShowAutocomplete from '@/tests/autocomplete.spec';
import React, { useState } from 'react';
import { getListLane } from '@/apis/datatable.repository'
import { useEffect } from 'react'
import ShowDatePicker from '@/tests/datepicker.spec';
import CustomSelect from '@/components/form/FormSelect';

interface Lane {
    id: string;
    lane_code: string;
    lane_name: string;
    lane_service_type: string;
    pk_skd_type: any[];
}

const ScheduleSearch = () => {
    const [lanes, setLanes] = useState<Lane[]>([]);

    useEffect(() => {
        async function getBranchName() {
            const res = await getListLane()
            setLanes(res)
        }
        getBranchName()
    }, []);

    return (
        <div className="h-32 bg-green-400 w-full flex">
            <div className='w-1/4 px-1'>
                <ShowAutocomplete options={lanes} />
            </div>
            <div className="w-1/4 px-1">
                <ShowDatePicker />
            </div>
            <div className="w-1/4 px-1">
                <CustomSelect labelSelect='SKD' getOptionData = {(opt: Lane) => ({label: `${opt.lane_code} - ${opt.lane_name}`, value: opt.lane_code})} options={lanes} isMultiple={true}/>
            </div>
        </div>
    );
};

export default ScheduleSearch;

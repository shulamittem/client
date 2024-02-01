import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


export default function DaysTable() {
    const [days, setDays] = useState([{day:'aaa',fromHour:'aaa',toHour:'aaa'},{}]);

    const columns = [
        { field: 'toHour', header: 'עד שעה' },
        { field: 'fromHour', header: 'משעה' },       
         { field: 'day', header: 'יום' },
    ];

    // useEffect(() => {
    //     ProductService.getProductsMini().then((data) => setProducts(data));
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const isPositiveInteger = (val) => {
        let str = String(val);

        str = str.trim();

        if (!str) {
            return false;
        }

        str = str.replace(/^0+/, '') || '0';
        let n = Math.floor(Number(str));

        return n !== Infinity && String(n) === str && n >= 0;
    };

    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        switch (field) {
            case 'quantity':
            case 'price':
                if (isPositiveInteger(newValue)) rowData[field] = newValue;
                else event.preventDefault();
                break;

            default:
                if (newValue.trim().length > 0) rowData[field] = newValue;
                else event.preventDefault();
                break;
        }
    };

    const cellEditor = (options) => {
        if (options.field === 'price') return priceEditor(options);
        else return textEditor(options);
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const priceEditor = (options) => {
        return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />;
    };

    const priceBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rowData.price);
    };

    return (
        <div className="card p-fluid">
            <DataTable value={days} editMode="cell" tableStyle={{ minWidth: '50rem' }}>
                {columns.map(({ field, header }) => {
                    return <Column key={field} field={field} header={header} style={{ width: '30%' }} body={field === 'price' && priceBodyTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />;
                })}
            </DataTable>
        </div>
    );
}
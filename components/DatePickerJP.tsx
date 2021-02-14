import React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ja from 'date-fns/locale/ja';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { ToolbarComponentProps } from '@material-ui/pickers/Picker/Picker';
import ToolbarButton from '@material-ui/pickers/_shared/ToolbarButton';
import PickerToolbar from '@material-ui/pickers/_shared/PickerToolbar';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface Props {
  value: Date | null;
  onChange: (date: MaterialUiPickersDate) => void;
  label?: string;
  fullWidth?: boolean;
  future?: boolean;
}

const DatePickerJP = (props: Props): JSX.Element => {
  const labelFunc = (val: any) =>
    val === null ? '' : format(new Date(val), 'yyyy年MM月dd日');

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
      <DatePicker
        inputVariant="outlined"
        label={props.label || ''}
        value={props.value}
        onChange={props.onChange}
        clearLabel="クリア"
        okLabel="決定"
        cancelLabel="キャンセル"
        labelFunc={labelFunc}
        ToolbarComponent={ToolbarComponent}
        disableFuture={!props.future}
        autoOk
        clearable
        fullWidth={props.fullWidth}
      />
    </MuiPickersUtilsProvider>
  );
};

const ToolbarComponent = (props: ToolbarComponentProps): JSX.Element => {
  return (
    <PickerToolbar isLandscape={false} style={{ height: 50 }}>
      <ToolbarButton
        variant={'h6'}
        onClick={() => props.setOpenView('year')}
        selected={props.openView === 'year'}
        label={'年選択（' + props.date?.getFullYear() + '年）'}
      />
    </PickerToolbar>
  );
};

export const StaticDatePickerJP = (props: props): JSX.Element => {
  const labelFunc = (val: any) =>
    val === null ? '' : format(new Date(val), 'yyyy年MM月dd日');

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
      <DatePicker
        views={['date']}
        variant="static"
        inputVariant="outlined"
        label={props.label || ''}
        value={props.value}
        onChange={props.onChange}
        clearLabel="クリア"
        okLabel="決定"
        cancelLabel="キャンセル"
        labelFunc={labelFunc}
        ToolbarComponent={ToolbarComponent}
        autoOk
        clearable
        fullWidth={props.fullWidth}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerJP;

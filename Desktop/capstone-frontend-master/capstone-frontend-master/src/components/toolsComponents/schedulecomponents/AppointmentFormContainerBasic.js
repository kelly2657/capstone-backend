import * as React from 'react';
import moment from 'moment';
import {AppointmentForm} from '@devexpress/dx-react-scheduler-material-ui';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import LocationOn from '@mui/icons-material/LocationOn';
import Notes from '@mui/icons-material/Notes';
import Close from '@mui/icons-material/Close';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Create from '@mui/icons-material/Create';

import {classes, StyledDiv} from './style'


export default class AppointmentFormContainerBasic extends React.PureComponent {
    constructor(props) {
      super(props);
  
      this.state = {
        appointmentChanges: {},
      };
  
      this.getAppointmentData = () => {
        const { appointmentData } = this.props;
        return appointmentData;
      };
      this.getAppointmentChanges = () => {
        const { appointmentChanges } = this.state;
        return appointmentChanges;
      };
  
      this.changeAppointment = this.changeAppointment.bind(this);
      this.commitAppointment = this.commitAppointment.bind(this);
    }
  
    changeAppointment({ field, changes }) {
      const nextChanges = {
        ...this.getAppointmentChanges(),
        [field]: changes,
      };
      this.setState({
        appointmentChanges: nextChanges,
      });
    }
  
    commitAppointment(type) {
      const { commitChanges } = this.props;
      const appointment = {
        ...this.getAppointmentData(),
        ...this.getAppointmentChanges(),
      };
      if (type === 'deleted') {
        commitChanges({ [type]: appointment.id });
      } else if (type === 'changed') {
        commitChanges({ [type]: { [appointment.id]: appointment } });
      } else {
        commitChanges({ [type]: appointment });
      }
      this.setState({
        appointmentChanges: {},
      });
    }
  
    render() {
      const {
        visible,
        visibleChange,
        appointmentData,
        cancelAppointment,
        target,
        onHide,
      } = this.props;
      const { appointmentChanges } = this.state;
  
      const displayAppointmentData = {
        ...appointmentData,
        ...appointmentChanges,
      };
  
      const isNewAppointment = appointmentData.id === undefined;
      const applyChanges = isNewAppointment
        ? () => this.commitAppointment('added')
        : () => this.commitAppointment('changed');
  
      const textEditorProps = field => ({
        variant: 'outlined',
        onChange: ({ target: change }) => this.changeAppointment({
          field: [field], changes: change.value,
        }),
        value: displayAppointmentData[field] || '',
        label: field[0].toUpperCase() + field.slice(1),
        className: classes.textField,
      });
  
      const pickerEditorProps = field => ({
          value: displayAppointmentData[field]
            ? moment(displayAppointmentData[field]) // Wrap the value in a moment object
            : null,
          onChange: date =>
            this.changeAppointment({
              field: [field],
              changes: date ? moment(date).toDate() : null, // Convert moment object back to Date
            }),
          ampm: false,
          inputFormat: 'YYYY/MM/DD HH:mm',
          onError: () => null,
        });
      const startDatePickerProps = pickerEditorProps('startDate');
      const endDatePickerProps = pickerEditorProps('endDate');
      const cancelChanges = () => {
        this.setState({
          appointmentChanges: {},
        });
        visibleChange();
        cancelAppointment();
      };
  
      return (
        <AppointmentForm.Overlay
          visible={visible}
          target={target}
          fullSize
          onHide={onHide}
        >
          <StyledDiv>
            <div className={classes.header}>
              <IconButton className={classes.closeButton} onClick={cancelChanges} size="large">
                <Close color="action" />
              </IconButton>
            </div>
            <div className={classes.content}>
              <div className={classes.wrapper}>
                <Create className={classes.icon} color="action" />
                <TextField
                  {...textEditorProps('일정')}
                />
              </div>
              <div className={classes.wrapper}>
                <CalendarToday className={classes.icon} color="action" />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker
                    label="시작일"
                    renderInput={
                      props => <TextField className={classes.picker} {...props} />
                    }
                    {...startDatePickerProps}
                  />
                  <DateTimePicker
                    label="마감일"
                    renderInput={
                      props => <TextField className={classes.picker} {...props} />
                    }
                    {...endDatePickerProps}
                  />
                </LocalizationProvider>
              </div>
              <div className={classes.wrapper}>
                <LocationOn className={classes.icon} color="action" />
                <TextField
                  {...textEditorProps('장소')}
                />
              </div>
              <div className={classes.wrapper}>
                <Notes className={classes.icon} color="action" />
                <TextField
                  {...textEditorProps('메모 ... ')}
                  multiline
                  rows="6"
                />
              </div>
            </div>
            <div className={classes.buttonGroup}>
              {!isNewAppointment && (
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={() => {
                    visibleChange();
                    this.commitAppointment('deleted');
                  }}
                >
                  Delete
                </Button>
              )}
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  applyChanges();
                }}
              >
                {isNewAppointment ? 'Create' : 'Save'}
              </Button>
            </div>
          </StyledDiv>
        </AppointmentForm.Overlay>
      );
    }
  }
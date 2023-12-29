import { classes, StyledFab } from './style';
import AppointmentFormContainerBasic from './AppointmentFormContainerBasic';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connectProps } from '@devexpress/dx-react-core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export default class Schedule extends React.PureComponent {
  constructor(props) {
    super(props);
    //초기 상태 지정
    this.state = {
      data: [], //일정 없음
      currentDate: dayjs(), //dayjs로 오늘 날짜
      confirmationVisible: false, //삭제 대화상자
      editingFormVisible: false, //일정 수정 대화상자
      deletedAppointmentId: undefined, //삭제된 약속의 id
      editingAppointment: undefined, //편집중인 약속
      previousAppointment: undefined, //이전 선택 약속
      addedAppointment: {}, // 추가되는 약속
      isNewAppointment: false, // 새로운 약속이 추가되었는가
      //하루의 시작과 끝 시간
      startDayHour: 5,
      endDayHour: 24,
    };

    // 삭제 확인 대화상자 가시성, 일정 삭제 업데이트 토글, 일정 수정 화면 가시성
    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

    // 일정 관련 메서드(업데이트, 수정 등)
    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainerBasic, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment =
        data.filter(
          (appointment) => editingAppointment && appointment.id === editingAppointment.id,
        )[0] || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }

  componentDidUpdate() {
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter((appointment) => appointment.id !== deletedAppointmentId);

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment,
        );
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }

      return { data, addedAppointment: {} };
    });
  }

  render() {
    const { currentDate, data, confirmationVisible, editingFormVisible, startDayHour, endDayHour } =
      this.state;

    return (
      <div className="scheduler-container">
      <Paper>
        <Scheduler data={data} height={780} >
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
          />
          <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            //1시간 단위 표시
            cellDuration={60}
            crossScrollingEnabled
          />
          <MonthView
            scrollingEnabled/>
          <AllDayPanel />
          <EditRecurrenceMenu />
          <Appointments />
          <AppointmentTooltip
            // 수정, 닫기, 삭제 - 일정 클릭 시
            showOpenButton={true}
            showCloseButton={true}
            showDeleteButton={true}
          />
          <Toolbar />
          <ViewSwitcher />
          <AppointmentForm
            // 약속 겹쳐 보이기
            overlayComponent={this.appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          />
          <DragDropProvider />
        </Scheduler>

        <Dialog open={confirmationVisible} onClose={this.cancelDelete}>
          <DialogTitle>일정 삭제</DialogTitle>
          <DialogContent>
            <DialogContentText>선택한 일정을 삭제하시겠습니까 ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfirmationVisible} color="primary" variant="outlined">
              취소
            </Button>
            <Button onClick={this.commitDeletedAppointment} color="secondary" variant="outlined">
              삭제
            </Button>
          </DialogActions>
        </Dialog>

        <StyledFab
          color="secondary"
          className={classes.addButton}
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onEditingAppointmentChange(undefined);
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}>
          <AddIcon />
        </StyledFab>
      </Paper>
      </div>
    );
  }
}
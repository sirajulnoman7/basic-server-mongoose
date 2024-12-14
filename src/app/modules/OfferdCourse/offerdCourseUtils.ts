import { TSchedule } from './offerdCourseInterface';

export const hasTimeConflict = (
  assignSchedules: TSchedule[],
  newSchedules: TSchedule,
) => {
  for (const schedule of assignSchedules) {
    // 10:30 new start time
    // 12:30 existing end time
    // 12:30 new end time
    // 2:30 existing start time
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`); //date just calculating the time
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedules.startTime}`); //date just calculating the time
    const newEndTime = new Date(`1970-01-01T${newSchedules.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};

// course times are encoded as [startHour, startMinute, durationHour, durationMinute]
// check these over

const courseSchedule = {
    '8S': {
      class: {
        time: [7, 45, 0, 50],
        days: ['M', 'TU', 'TH', 'F'],
      },
      xHour: {
        time: [7, 45, 0, 50],
        days: ['W'],
      },
    },
    '8L': {
      class: {
        time: [7, 30, 1, 50],
        days: ['M', 'W', 'F'],
      },
      xHour: {
        time: [7, 45, 0, 50],
        days: ['TH'],
      },
    },
    '9S': {
      class: {
        time: [9, 5, 0, 50],
        days: ['M', 'TU', 'TH', 'F'],
      },
      xHour: {
        time: [9, 5, 0, 50],
        days: ['W'],
      },
    },
    '9L': {
      class: {
        time: [8, 50, 1, 5],
        days: ['M', 'W', 'F'],
      },
      xHour: {
        time: [9, 5, 0, 50],
        days: ['TH'],
      },
    },
    "10": {
      class: {
        time: [10, 10, 1, 5],
        days: ['M', 'W', 'F'],
      },
      xHour: {
        time: [12, 15, 0, 50],
        days: ['TH'],
      },
    },
    "11": {
      class: {
        time: [11, 30, 1, 5],
        days: ['M', 'W', 'F'],
      },
      xHour: {
        time: [12, 15, 0, 50],
        days: ['TU'],
      },
    },
    "12": {
      class: {
        time: [12, 50, 1, 5],
        days: ['M', 'W', 'F'],
      },
      xHour: {
        time: [13, 20, 0, 50],
        days: ['TU'],
      },
    },
    "2": {
      class: {
        time: [14, 10, 1, 5],
        days: ['M', 'W', 'F'],
      },
      xHour: {
        time: [13, 20, 0, 50],
        days: ['TH'],
      },
    },
    "10A": {
      class: {
        time: [10, 10, 1, 50],
        days: ['TU', 'TH'],
      },
      xHour: {
        time: [15, 30, 0, 50],
        days: ['F'],
      },
    },
    "2A": {
      class: {
        time: [14, 25, 1, 50],
        days: ['TU', 'TH'],
      },
      xHour: {
        time: [17, 30, 0, 50],
        days: ['W'],
      },
    },
    "3A": {
      class: {
        time: [15, 30, 1, 50],
        days: ['M', 'W'],
      },
      xHour: {
        time: [17, 30, 0, 50],
        days: ['M'],
      },
    },
    "3B": {
      class: {
        time: [16, 30, 1, 50],
        days: ['TU', 'TH'],
      },
      xHour: {
        time: [16, 35, 0, 50],
        days: ['F'],
      },
    },
    "6A": {
      class: {
        time: [18, 30, 1, 50],
        days: ['M', 'TH'],
      },
      xHour: {
        time: [18, 30, 0, 50],
        days: ['TU'],
      },
    },
    "6B": {
      class: {
        time: [18, 30, 3, 0],
        days: ['W'],
      },
      xHour: {
        time: [19, 30, 0, 50],
        days: ['TU'],
      },
    },
  }

export default courseSchedule;
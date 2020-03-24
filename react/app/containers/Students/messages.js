/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.StudentsPage';

export default defineMessages({
  studentHeader: {
    id: `${scope}.start_project.header`,
    defaultMessage: 'Start your next react project in seconds',
  },
  studentMessage: {
    id: `${scope}.start_project.message`,
    defaultMessage:
      'A highly scalable, offline-first foundation with the best DX and a focus on performance and best practices',
  },
  filterMessage: {
    id: `${scope}.tryme.message`,
    defaultMessage: 'Students in the class: ',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Students!',
  },
  noDataText: {
    id: `${scope}.noDataText`,
    defaultMessage: 'No Data!',
  },
});

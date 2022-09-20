import { createRouter, createWebHistory } from 'vue-router'
import MeetingRoomView from '../views/MeetingRoomView.vue'
import BookMeetingRoomView from '../views/BookMeetingRoomView.vue'
import BookMeetingRoomListView from '../views/BookMeetingRoomListView.vue'
const routes = [
  {
    path: '/',
    name: 'meeting-rooms',
    component: MeetingRoomView,
  },
  {
    path: '/book-meeting-room',
    name: 'book-meeting-room',
    component: BookMeetingRoomView,

  },
  {
    path: '/book-meeting-room-list',
    name: 'book-meeting-room-list',
    component: BookMeetingRoomListView,

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

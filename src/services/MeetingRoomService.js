import http from "../http-common";

class MeetingRoomService {
  getAll() {
    return http.get("/meeting_room");
  }

  get(id) {
    return http.get(`/meeting_room/${id}`);
  }

  create(data) {
    return http.post("/meeting_room", data);
  }

  update(id, data) {
    return http.put(`/meeting_room/${id}`, data);
  }

  delete(id) {
    return http.delete(`/meeting_room/${id}`);
  }

}

export default new MeetingRoomService();
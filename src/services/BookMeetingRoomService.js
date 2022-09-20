import http from "../http-common";

class BookMeetingRoomService {
  create(data) {
    return http.post("/meeting_room/book", data);
  }
  getAll(){
    return http.get("/meeting_room/book");
  }
  delete(id){
    return http.delete(`/meeting_room/book/${id}`);
  }
  update(id, data){
    return http.put(`/meeting_room/book/${id}`, data);
  }
}

export default new BookMeetingRoomService();